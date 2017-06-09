import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import ProfileSidebarComposer from "./ProfileSidebarComposer";
import Users from 'meteor/nova:users';

class ProfileSidebar extends Component {

    componentDidMount() {

        $('.profile-sidebar a').on('click', function () {
            $('header.header .profile .image').removeClass('active');
        });

    }

    toggleChatList() {
        $('.chat-wrapper').toggleClass('active');
    }

    unreadMessages() {
        let i = 0;
        const conversations = this.props.conversations;
        conversations.forEach(function (conversation) {
            if(conversation.lastMessage() && conversation.isUnread()) {
                i++;
            }
        });

        if(i) {
            return (
                <span key="new-message"><Link to='/user/messages'>{i}</Link></span>
            )
        }
    }

    joinedDate() {
        return moment(Meteor.user().createdAt).format("Do MMM YYYY");
    }

    getMembershipStatus() {
        let membership = Meteor.user().cityhive.membership;
        if(!membership || membership == 'free') return 'Basic';
        if(membership == 'corporate') return 'Corporate';
        if(membership == 'recruiter') return 'Recruiter';
    }

    logout(e) {
        e.preventDefault();
        Meteor.logout();
        browserHistory.push('/');
    }

    render() {
        return (
            <div>
            {
                this.props.ready ?
                <div className="profile-sidebar">
                    <div className="profile-sidebar-top">
                        <div className="row">
                            <div className="col-sm-3 no-padding-right profile-sidebar-avatar">
                                {Meteor.user().profile.image ? <img className="img-circle" src={Meteor.user().profile.image}/> : <img className="img-circle" src={Telescope.settings.get('defaultProfileImage')}/> }
                            </div>
                            <div className="col-sm-9 profile-sidebar-top--txt">
                                <h5 className="txt-col--light no-margin-top txt-weight--light">{Users.getDisplayName(Meteor.user())}</h5>
                                <h6 className="txt-col--light no-margin-top">{Meteor.user().profile.firstName} {Meteor.user().profile.lastName}</h6>
                                <small>Membership status: {this.getMembershipStatus()}</small>
                                <small>Joined: <strong>{this.joinedDate()}</strong></small>
                            </div>
                        </div>
                        <hr/>
                        <div className="profile-sidebar-top--footer clearfix">
                                    <Link activeClassName="active" className="btn btn-ghost btn-full" to={`/user/profile/${Meteor.userId()}`} ><i className="iconmoon-cityhive-iconmoon-font-v2-ol-24"></i> <span>View profile</span></Link>
                                    <Link activeClassName="active" className="btn btn-ghost btn-full" to={`/user/profile/edit/${Meteor.userId()}`} ><i className="iconmoon-cityhive-iconmoon-font-v2-ol_edit-profile"></i> <span>Edit profile</span></Link>
                                    <a href="#" className="btn btn-ghost btn-full btn-signout" onClick={this.logout}><i className="iconmoon-cityhive-iconmoon-font-v2-ol_sign-out"></i> <span>Sign Out</span></a>
                        </div>
                    </div>
                    <div className="profile-sidebar--bottom">
                        <ul className="ul-menu--with-icons ul-menu--light">
                            <li><Link activeClassName="active" to="/user/dashboard" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_home"></i></span> <span className="text">Home</span></Link></li>
                            <li><Link activeClassName="active" to="/users/directory" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages-copy"></i></span> <span className="text">User Directory</span></Link></li>                            
                            <li><Link activeClassName="active" to="/user/following" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_network"></i></span> <span className="text">My network</span></Link></li>
                            <li className="link-messages"><Link activeClassName="active" to="/user/messages" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages"></i></span>  <span className="text">Messages</span></Link><span className="unread-messages">{this.unreadMessages()}</span></li>
                            <li className="link-false" onClick={this.toggleChatList}><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_live-chat"></i></span> <span className="text">Live Chat</span></li>
                            <li><Link activeClassName="active" to="/user/change-password" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_profile"></i></span> <span className="text">Change Password</span></Link></li>
                            <li><Link activeClassName="active" to="/user/privacy-settings" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_privacy"></i></span> <span className="text">Privacy Settings</span></Link></li>
                            <li className="link-disabled"><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_events"></i></span> <span className="text">Events</span></li>
                            <li className="link-disabled"><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_jobs"></i></span> <span className="text">Job board</span></li>
                            <li className="link-false link-delete-account"><Link activeClassName="active" to="/user/delete" ><span><i className=" iconmoon-cityhive-iconmoon-font-v2-ol_delete-account"></i></span> <span className="text">Delete Account</span></Link></li>
                        </ul>
                    </div>
                </div>
                : '<p>Loading</p>'
            }
            </div>
        )
    }
}

ProfileSidebar.displayName = "ProfileSidebar";

module.exports = ProfileSidebarComposer(ProfileSidebar);
export default ProfileSidebarComposer(ProfileSidebar);