import Telescope from 'meteor/nova:lib';
import React from 'react';
import { DocumentContainer } from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';
import DashboardMenu from '../DashboardMenu';

const ProfileUpdate = (props, context) => {
  const terms = props.params.slug ? {"telescope.slug": props.params.slug} : context.currentUser ? {_id: context.currentUser._id } : undefined;
  return (
    <Telescope.components.CanDo action="users.edit.own" displayNoPermissionMessage={true}>
      <div>
        <DashboardMenu/>
        <DocumentContainer
          collection={Users}
          publication="users.single"
          selector={terms}
          terms={terms}
          documentPropName="user"
          component={Telescope.components.UsersEdit}
        />
      </div>
    </Telescope.components.CanDo>
  )
};

ProfileUpdate.contextTypes = {
  currentUser: React.PropTypes.object
};

export default ProfileUpdate;