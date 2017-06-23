import React from 'react';
import { Filter, TextInput, ReferenceInput, SelectInput, List, Datagrid, EmailField, TextField, EditButton } from 'admin-on-rest';

const HealthCareProfessionalFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Filter by First Name" source="firstName" />
        <TextInput label="Filter by Last Name" source="lastName" alwaysOn/>
    </Filter>
);

export const HPList = (props) => (
    <List title="HealthCare Professionals" {...props} filters={<HealthCareProfessionalFilter />} sort={{ field: 'lastName', order: 'asc' }}>
        <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
            <TextField source="uid" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="username" />
            <TextField source="city" />
            <TextField source="userStatus" />
          <EditButton />
        </Datagrid>
    </List>
);