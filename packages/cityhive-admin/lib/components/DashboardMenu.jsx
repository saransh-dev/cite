import React, {Component} from 'react';
import { Link } from 'react-router';
import Users from 'meteor/nova:users'

class DashboardMenu extends Component {

  component() {

    if( Users.isAdmin() ) {
      return (
        <ul>
          <Link to="/admin/pages/create" activeClassName="active">Create Page</Link>
          <Link to="/admin/pages/list" activeClassName="active">Edit Pages</Link>
          <Link to="/admin/articles/create" activeClassName="active">Create Article</Link>
          <Link to="/admin/articles/list" activeClassName="active">Edit Articles</Link>
          <Link to="/admin/journals/create" activeClassName="active">Create Journal</Link>
          <Link to="/admin/journals/list" activeClassName="active">Edit Journals</Link>
          <Link to="/admin/profile/update" activeClassName="active">Edit Profile</Link>
        </ul>
      )
    } else {
      return (
        <ul>
          <Link to="/admin/profile/update" activeClassName="active">Edit Profile</Link>
        </ul>
      )
    }

  }

  render() {
    return this.component();
  }


}

module.exports = DashboardMenu;
export default DashboardMenu;