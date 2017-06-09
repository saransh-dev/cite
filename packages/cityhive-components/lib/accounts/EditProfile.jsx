import Telescope from 'meteor/nova:lib';
import React from 'react';
import { DocumentContainer } from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

const EditProfile = (props, context) => {
  const terms = props.params._id ? {_id: props.params._id} : context.currentUser ? {_id: context.currentUser._id } : undefined;
  return (
      <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
          <DocumentContainer
            collection={Users}
            publication="users.single"
            selector={terms}
            terms={terms}
            documentPropName="user"
            component={Telescope.components.UsersEdit}
          />
    </Telescope.components.Profile>
  )
};

EditProfile.contextTypes = {
  currentUser: React.PropTypes.object
}

EditProfile.displayName = "EditProfile";

module.exports = EditProfile;