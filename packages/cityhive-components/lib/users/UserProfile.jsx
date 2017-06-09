import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import UserProfileContainer from './UserProfileContainer';
import VisibilityFullProfile from '../profile/data/VisibilityFullProfile';
import { Link } from 'react-router';

class UserProfile extends Component {


      componentDidMount() {
        $('body').addClass('dashboard-section');
      }



    displayUserProfileInformation(user) {
        if (!user.cityhive.privacyVisibility) return <VisibilityFullProfile user={user} following={this.props.follows} followers={this.props.followers} />;
        if (user.cityhive.privacyVisibility == 'show-full-profile') return <VisibilityFullProfile user={user} following={this.props.follows} followers={this.props.followers} />;
        if (user.cityhive.privacyVisibility == 'show-full-profile-only-to-following') return <VisibilityFullProfile user={user} following={this.props.follows} followers={this.props.followers} />;
    }

    showContent(user) {
        return (
            <div>
                {this.displayUserProfileInformation(user)}
            </div>
        )
    }

    showProfileEdit(){
        const user = this.props.user;
        const loggedInUser = Meteor.user();
            if(user._id === loggedInUser._id) {
                return (
                <h5 className="page-title-dashboard">Your public profile / <Link to={`/user/profile/edit/${Meteor.userId()}`} >Edit profile</Link></h5>
                )
            }
    }

    render() {

        const user = this.props.user;

        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div className="user-profile clearfix">
                    {
                        this.props.ready ?
                                <div>
                                    {
                                        user ?
                                            <div>
                                                {this.showProfileEdit()}
                                                {this.showContent(user)}
                                            </div>
                                            : <p>User not found</p>
                                    }
                                </div>
                            : <p>Loading</p>
                    }
                </div>
            </Telescope.components.Profile>

        );
    }

}

UserProfile.displayName = "UserProfile";
module.exports = UserProfileContainer(UserProfile);
export default UserProfileContainer(UserProfile);