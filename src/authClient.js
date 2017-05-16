
// Examples of configuration for our webchat app //

// const prod = window.NODE_ENV === 'production';
// const host = prod ? 's.imyourdoc.com' : 's-qa.imyourdoc.com';
// export default {
//     domain: 'imyourdoc.com',
//     socketUrl: `https://${host}/imyd-webchat-web`,
//     apiUrl: `https://${host}/imyd-webchat-api`,
//     authUrl: `https://${host}/imyd-auth-stateless-web`,
//     imageUrl: prod ? 'https://api-qa.imyourdoc.com' : 'https://api-qa.imyourdoc.com',
//     sessionTimeout: prod ? 25 : 12, // a little bit less than what it is set on the server for session
//     tokenTimeout: prod ? 230 : 100 // a little bit less than what it is set on the server for the token
// }


// in src/authClient.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        // https://s-qa.imyourdoc.com/imyd-auth-stateless-web/tokens/imUser/new
        const request = new Request('https://s-qa.imyourdoc.com/imyd-auth-stateless-web/tokens/imUser/new', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'  }),
        })
        return fetch(request)
            .then((response) => {
                console.log(response)
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.text();
            })
            .then((token) => {
                console.log(token);
                localStorage.setItem('token', token);
                // localStorage.setItem('username', username);
                return Promise.resolve();
            });
    }
    //     // called hen the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403  || status === 404) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
}