import Telescope from 'meteor/nova:lib';
import React from 'react';
import { DocumentContainer } from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

const ViewProfile = (props, context) => {
  return (
    <DocumentContainer
      collection={Users}
      publication="users.single"
      selector={{'telescope.slug': props.params.slug}}
      terms={{'telescope.slug': props.params.slug}}
      component={Telescope.components.UsersProfile}
      documentPropName="user"
    />
  );
};

ViewProfile.displayName = "ViewProfile";

module.exports = ViewProfile;