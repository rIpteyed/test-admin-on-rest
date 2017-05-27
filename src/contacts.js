// in src/contacts.js
import React from 'react';
import { Filter, TextInput, ReferenceInput, SelectInput, List, Datagrid, EmailField, TextField, EditButton } from 'admin-on-rest';

const ContactFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Contact" source="username" reference="contacts" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const ContactList = (props) => (
    <List title="All users" {...props} filters={<ContactFilter />}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <EditButton />
        </Datagrid>
    </List>
);