import React, { PropTypes, Component } from 'react';
import NovaForm from "meteor/nova:forms";
import {browserHistory} from 'react-router';
import {Messages} from 'meteor/nova:core';
import AdminUsersEditSingleComposer from './AdminUsersEditSingleComposer';

class AdminUsersEditSingle extends Component {

  render() {

    let userId = this.props.routeParams._id;
    let user = Meteor.users.findOne({_id: userId});

    return (
        <div className="admin-users-edit-single">
          <div className="breadcrumbs">
            <span>Edit User</span>
          </div>
            {
                this.props.ready ?
                    <div className="user-directory section--grey section--padding clearfix">
                        <NovaForm
                            currentUser={Meteor.user()}
                            collection={Meteor.users}
                            document={user}
                            methodName="users.edit"
                            successCallback={(user)=>{
                                Messages.clearSeen();
                                Messages.flash('User Updated', 'success');
                                browserHistory.push('/admin/users/edit');
                            }}
                        />
                    </div>
                    : <p>Loading...</p>
            }
        </div>
    )
  }

}

AdminUsersEditSingle.displayName = "AdminUsersEditSingle";

module.exports = AdminUsersEditSingleComposer(AdminUsersEditSingle);

export default AdminUsersEditSingleComposer(AdminUsersEditSingle);
