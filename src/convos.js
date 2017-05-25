// in src/convos.js
import React from 'react';
import _ from 'underscore';
import { Filter, TextInput, ReferenceInput, SelectInput, List, Datagrid, EmailField, TextField, FunctionField } from 'admin-on-rest';

// const UserFilter = (props) => (
//     <Filter {...props}>
//         <TextInput label="Search" source="q" alwaysOn />
//         <ReferenceInput label="Contact" source="username" reference="contacts" allowEmpty>
//             <SelectInput optionText="name" />
//         </ReferenceInput>
//     </Filter>
// );

export const ConvoList = (props) => (
    <List title="My conversations" {...props}>
        <Datagrid>
            <TextField source="id" />
            <FunctionField label="Conversation Members" source="name" render={record => `${_.pluck(record.users, 'username').join(',')}`} />
            <TextField source="unreadCount" />
            <TextField source="type" />
        </Datagrid>
    </List>
);