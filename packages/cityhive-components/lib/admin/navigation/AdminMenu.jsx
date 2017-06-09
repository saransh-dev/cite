import React, {Component} from 'react';
import { Link } from 'react-router';
import Users from 'meteor/nova:users';
import { FormattedMessage } from 'react-intl';

class AdminMenu extends Component {

  component() {

    if( Users.isAdmin() ) {
      return (
        <ul className="admin-menu">
            <li>
                <Link to="/admin/dashboard" activeClassName="active">
                    <FormattedMessage id="admin.dashboard"/>
                </Link>
            </li>
            <li>
                <Link to="/admin/users/edit" activeClassName="active">
                    <FormattedMessage id="admin.users.edit"/>
                </Link>
            </li>
            <li>
              <Link to="/admin/pages/create" activeClassName="active">
                  <FormattedMessage id="admin.pages.create"/>
              </Link>
            </li>
            <li>
              <Link to="/admin/pages" activeClassName="active">
                  <FormattedMessage id="admin.pages.edit"/>
              </Link>
            </li>
            <li>
              <Link to="/admin/articles/create" activeClassName="active">
                  <FormattedMessage id="admin.articles.create"/>
              </Link>
            </li>
            <li>
              <Link to="/admin/articles" activeClassName="active">
                  <FormattedMessage id="admin.articles.edit"/>
              </Link>
            </li>
             <li>
              <Link to="/admin/journals/create" activeClassName="active">
                  <FormattedMessage id="admin.journals.create"/>
              </Link>
            </li>
            <li>
              <Link to="/admin/journals" activeClassName="active">
                  <FormattedMessage id="admin.journals.edit"/>
              </Link>
            </li>
            <li>
                <Link to="/admin/options/create" activeClassName="active">
                    <FormattedMessage id="admin.options.create"/>
                </Link>
            </li>
            <li>
                <Link to="/admin/options" activeClassName="active">
                    <FormattedMessage id="admin.options.edit"/>
                </Link>
            </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li>
              <Link to="/admin/profile/update" activeClassName="active">
                  Edit Profile
              </Link>
          </li>
        </ul>
      )
    }

  }

  render() {
    return this.component();
  }


}

AdminMenu.displayName = "AdminMenu";

module.exports = AdminMenu;
export default AdminMenu;