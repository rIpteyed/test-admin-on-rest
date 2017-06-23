// in src/IMYD-REST-Client.js
import _ from 'underscore';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils,
} from 'admin-on-rest';

const API_URL = 'https://s-qa.imyourdoc.com/imyd-admin-api/api/v1';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
  let url = '';
  const {queryParameters} = fetchUtils;
  const options = {};
  switch (type) {
    case GET_LIST: {

      console.log('params', params);

      const filterPair = _.pairs(params.filter);
      const filterField = '';
      const filterValue = '';
      if(filterPair.length > 0) {
        filterField = filterPair[0][0];
        filterValue = filterPair[0][1];
      }
      const {page, perPage} = params.pagination;
      const {field, order} = params.sort;
      const query = {
        page: page - 1,
        size: perPage,
        sort: field + ',' + order.toLowerCase(),
        filter: filterField+ ',' + filterValue,
        uid: 7629
      };

      console.log('jr', query);

      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_ONE:
      url = `${API_URL}/${resource}/${params.id}`;
      break;
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({id: params.ids}),
      };

      console.log('jr', query);

      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const {page, perPage} = params.pagination;
      const {field, order} = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
        filter: JSON.stringify({...params.filter, [params.target]: params.id}),
      };

      console.log(query);

      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case UPDATE:
      url = `${API_URL}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${API_URL}/${resource}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${API_URL}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
  return {url, options};
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
  const {headers, json} = response;
  let data;

  console.log('chrtr', json);

  if (!json.content) {
    // add ids if they don't exist
    data = json;
  } else {
    data = json.content;
  }

  let i = 0;
  data.forEach((item) => {
    if (_.isUndefined(item.id)) {
      item['id'] = ++i; // temporary - need indexes on these items
    }
  });

  switch (type) {
    case GET_LIST:
      console.log('data', data)
      return {
        data: data, //json.map(x => x),
        total: data.length //parseInt(headers.get('content-range').split('/').pop(), 10),
      };
    case CREATE:
      return {data: {...params.data, id: json.id}};
    default:
      return {data: json};
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
  const {fetchJson} = fetchUtils;
  const {url, options} = convertRESTRequestToHTTP(type, resource, params);

  // IS
  // https://s-qa.imyourdoc.com/imyd-webchat-api/api/v1/communication/threads?sort=["id","DESC"]&range=[0,9]&filter={}

  // Needs to be
  // https://s-qa.imyourdoc.com/imyd-admin-api/api/v1/healthcareprofessionals?page=0&size=10&uid=7976&filter=lastName,long&filter=firstName,juan&sort=lastName,asc

  console.log('main', url, options);

  if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }
  const token = localStorage.getItem('token');
  // options.headers.set('Authorization', `Bearer ${token}`);
  options.headers.set('x-auth-token', token);
  // options.headers.set('Origin', 'http://localhost:3000');
  options.headers.set('X-Total-Count', '30');
  options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');

  return fetchJson(url, options)
    .then(response => {

      console.log('fetchResponse:', response);

      const resToRest = convertHTTPResponseToREST(response, type, resource, params);
      return resToRest;
    });
};

// const API_URL = 'https://s-qa.imyourdoc.com/imyd-webchat-api/api/v1';
// const httpClient = (options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     const token = localStorage.getItem('token');
//     // options.headers.set('Authorization', `Bearer ${token}`);
//     options.headers.set('x-auth-token', token);
//     // options.headers.set('Origin', 'http://localhost:3000');
//     options.headers.set('X-Total-Count', '30');
//     options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');
//     return fetchUtils.fetchJson(API_URL, options);
// }