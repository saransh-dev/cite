import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import AdminUsersItem from './AdminUsersItem';
import { FormattedMessage } from 'react-intl';

const AdminUsersList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

  if (!!results.length) {
    return (
      <div className="admin-users-list">
        <table className="table table-striped pages-list">
          <thead>
          <tr>
            <th>User ID</th>
            <th>User Full Name</th>
            <th>User Membership</th>
            <th>Edit User</th>
            <th>Delete User</th>
          </tr>
          </thead>
          <tbody>
          {results.map(user => <AdminUsersItem user={user} currentUser={currentUser} key={user._id}/>)}
          </tbody>
        </table>
        {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : 'loading') : ''}
      </div>
    )
  } else if (!ready) {
    return (
        <div className="admin-users-list">
          <p>Loading</p>
        </div>
    )
  } else {
    return (
        <div className="admin-users-list">
          <p>No items found.</p>
        </div>
    )
  }

};

export default AdminUsersList;
