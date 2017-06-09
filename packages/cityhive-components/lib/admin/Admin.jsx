import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';

class Admin extends Component {
  render() {
    return (
      <Telescope.components.CanDo action='admin.view' displayNoPermissionMessage={true}>
          <div className="row admin profile">
              <div className="sidebar-slide-out profile-sidebar-menu">
                  <Telescope.components.AdminMenu/>
              </div>
              <div className="profile-main-section clearfix">
                  <div className="page-content">
                      {this.props.children}
                  </div>
              </div>
          </div>
      </Telescope.components.CanDo>
    )
  }
}

Admin.displayName = "Admin";

module.exports = Admin;
export default Admin;