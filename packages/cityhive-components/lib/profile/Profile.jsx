import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';

class Profile extends Component {

      toggleSidebarMenu() {
        $('.sidebar-slide-out').toggleClass('active');
    }

  render() {
    return (
      <Telescope.components.CanDo action='profile.view' displayNoPermissionMessage={true}>
        <div className="profile">
            <div className="sidebar-slide-out profile-sidebar-menu">
                <Telescope.components.ProfileSidebar />
            </div>
            <div className="profile-main-section clearfix">
                <div className="page-content">
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
      </Telescope.components.CanDo>
    )
  }
}

Profile.displayName = "Profile";

module.exports = Profile;
export default Profile;