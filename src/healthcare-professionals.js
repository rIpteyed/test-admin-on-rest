import React from 'react';
import {
  Filter,
  ImageField,
  TextInput,
  ReferenceInput,
  SelectInput,
  List,
  Datagrid,
  EmailField,
  TextField,
  EditButton,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  DataGrid,
  DateField
} from 'admin-on-rest';

const required = value => value ? undefined : 'Required';

const HealthCareProfessionalFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Filter by Last Name" source="lastName" alwaysOn/>
    <TextInput label="Filter by First Name" source="firstName"/>
    <TextInput label="Filter by Username" source="username"/>
    <TextInput label="Filter by City" source="city"/>
    <TextInput label="Filter by Status" source="userStatus"/>
  </Filter>
);

const ProfilePhotoField = ({record = {}}) => <img width="50px" height="50px"
                                                  src={"https://api-qa.imyourdoc.com/profilepic.php?user_name=" + record.username}/>;
ProfilePhotoField.defaultProps = {label: 'Name'};

export const HPCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="firstName"/>
      <TextInput source="lastName"/>
      <TextInput source="username"/>
      <TextInput source="city"/>
    </SimpleForm>
  </Create>
);

export const HPEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput label="uid" source="uid"/>
      <TextInput source="firstName" validate={required}/>
      <TextInput source="lastName" validate={required}/>
      <TextInput source="firstName" validate={required}/>
      <TextInput source="username" validate={required}/>
      <TextInput source="city" validate={required}/>
      <DisabledInput label="userStatus" source="userStatus"/>
    </SimpleForm>
  </Edit>
);

export const HPList = (props) => (
  <List title="HealthCare Professionals" {...props} filters={<HealthCareProfessionalFilter />}
        sort={{field: 'lastName', order: 'asc'}}>
    <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}}>
      <ProfilePhotoField source="username"/>
      <TextField source="uid"/>
      <TextField source="firstName"/>
      <TextField source="lastName"/>
      <TextField source="username"/>
      <TextField source="city"/>
      <TextField source="userStatus"/>
      <EditButton />
    </Datagrid>
  </List>
);