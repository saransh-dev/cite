import React, {Component} from 'react';
import { Link } from 'react-router';
import Users from 'meteor/nova:users';

class ProfileInfo extends Component {

    toggleSidebarMenu() {
        $('.sidebar-slide-out, .btn-toggle-sidebar').toggleClass('active');
        $('body').toggleClass('slide-out-menu-active');
    }

    joinedDate() {
        return moment(Meteor.user().createdAt).format("Do MMM YYYY");
    }

    getMembershipStatus() {
        let membership = Meteor.user().membership;
        if(!membership || membership == 'free') return 'Free';
        if(membership == 'corporate') return 'Corporate';
        if(membership == 'recruiter') return 'Recruiter';
    }    

    render() {

        return (
            <div className="profile-info mobile-block">
                <div className="clearfix">
                    <div className="image">
                        {Meteor.user().profile.image ? <img className="img-circle" src={Meteor.user().profile.image}/> : ''}
                    </div>
                    <div className="info">
                        <h3 className="txt-col--light txt-weight--light username">{Users.getDisplayName(Meteor.user())}</h3>
                        <h5 className="txt-col--light full-name">{Meteor.user().profile.firstName} {Meteor.user().profile.lastName}</h5>
                        <p className="txt-col--light">
                                <small>Membership status: {this.getMembershipStatus()}</small>&nbsp;|&nbsp;
                                <small>Joined: <strong>{this.joinedDate()}</strong></small>
                        </p>
                    </div>

                    <div className="buttons">
                        <Link className="btn btn-ghost btn-view-profile" to={`/user/profile/${Meteor.userId()}`} ><i className="fa fa-file-text-o"></i> View profile</Link>
                        <Link className="btn btn-ghost btn-edit-profile" to={`/user/profile/edit/${Meteor.userId()}`} ><i className="fa fa-pencil"></i> Edit profile</Link>
                    </div>

                </div>
                <div className="btn-toggle-sidebar" onClick={this.toggleSidebarMenu}>
                    <span>
                        <i/>
                        <i/>
                    </span>
                </div>
            </div>
        )
    }

}

ProfileInfo.displayName = "ProfileInfo";

module.exports = ProfileInfo;
export default ProfileInfo;
