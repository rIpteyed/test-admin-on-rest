// in src/App.js
import React from 'react';
// import { fetchUtils, simpleRestClient, Admin, Resource } from 'admin-on-rest';
import { fetchUtils, Admin, Resource } from 'admin-on-rest';
import restClient from './IMYD-REST-Client';

// import { PostList, PostEdit, PostCreate } from './posts';
import { ContactList } from './contacts';
import { ConvoList } from './convos';

import ContactIcon from 'material-ui/svg-icons/social/group';
import ConvoIcon from 'material-ui/svg-icons/social/people-outline';

import Dashboard from './Dashboard'

import authClient from './authClient'

// const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     const token = localStorage.getItem('token');
//     // options.headers.set('Authorization', `Bearer ${token}`);
//     options.headers.set('x-auth-token', token);
//     // options.headers.set('Origin', 'http://localhost:3000');
//     options.headers.set('X-Total-Count', '30');
//     options.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');
//     return fetchUtils.fetchJson(url, options);
// }
// const restClient = simpleRestClient('https://s-qa.imyourdoc.com/imyd-webchat-api/api/v1', httpClient);

// <Admin authClient={authClient} dashboard={Dashboard} restClient={simpleRestClient('https://s-qa.imyourdoc.com')}>

const App = () => (
    <Admin authClient={authClient} dashboard={Dashboard} restClient={restClient}>
        {/*<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} remove={Delete} icon={PostIcon}/>*/}
        <Resource name="contacts" list={ContactList} icon={ContactIcon}/>
        <Resource name="/communication/threads" options={{label: "Conversations"}} list={ConvoList} icon={ConvoIcon}/>
    </Admin>
);

export default App;