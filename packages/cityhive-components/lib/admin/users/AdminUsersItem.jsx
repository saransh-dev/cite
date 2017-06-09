import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {Messages} from 'meteor/nova:core';
import {browserHistory} from 'react-router';

class AdminUsersItem extends Component {

    constructor() {
        super();
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser() {
        const user = this.props.user;
        const deletePageConfirm = "Delete user: " + user.profile.firstName + ' ' + user.profile.lastName + " ?";

        if (window.confirm(deletePageConfirm)) {
            Meteor.call('cityhive.user.delete.by.admin', user._id, function (error, result) {
                if(error) {
                    Messages.flash(error.reason, 'error');
                } else {
                    Messages.flash('User Deleted', 'success');
                    browserHistory.push('/admin/users/edit');
                }
            });
        }
    }

  render() {

    const user = this.props.user;

    return (
        <tr>
          <td>
            <p>{user._id}</p>
          </td>
          <td key={user._id}>
            <p>{user.profile.firstName} {user.profile.lastName}</p>
          </td>
          <td className="membership">
            {user.cityhive.membership ? user.cityhive.membership : user.cityhive.membership}
          </td>
          <td className="edit">
              <Link to={`/admin/users/edit/${user._id}`}>Edit User</Link>
          </td>
          <td className="delete">
            <p onClick={this.deleteUser}>Delete User</p>
          </td>
        </tr>
    )
  }

}

export default AdminUsersItem;

