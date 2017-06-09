import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';
import UsersDirectoryListItemComopser from "./UsersDirectoryListItemComopser";
import Blocks from 'meteor/cityhive:user-blocking';

class UsersDirectoryListItem extends Component {

    displayBlockButton() {
        const user = this.props.user;
        if(user.username != Telescope.settings.get('bev').username) {// do not allow un-follow of the user 'bev'
            return this.blockButtonElement(user);
        }
    }

    isBlocked(userId) {
        return !!Blocks.findOne({userId: Meteor.userId(), blockedUserId: userId});
    }

    blockButtonElement(user) {

        if( this.isBlocked(user._id) ) {
            return (
                <a className="btn btn-xs btn-white" onClick={() => {this.unblockUser(user)}}>
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_block active"/> <span>Unblock</span>
                </a>
            )
        } else {
            return (
                <a className="btn btn-xs btn-white" onClick={() => {this.blockUser(user)}}>
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_block" title="Block this user"/> <span>Block</span>
                </a>
            )
        }
    }

    blockUser(user) {
        let blockUserId = user._id;

        Meteor.call('cityhive.user.block', blockUserId);

    }

    unblockUser(user) {
        let unblockUserId = user._id;

        Meteor.call('cityhive.user.unblock', unblockUserId);

    }

    displayMessageButton() {
        const user = this.props.user;
        if(Meteor.follows.findOne({userId: user._id, followId: Meteor.userId()}) && Meteor.follows.findOne({userId: Meteor.userId(), followId: user._id})) {
            if(!this.isBlocked(user._id)) {
                return this.messageButtonElement(user);
            }
        }
    }

    messageButtonElement(user) {
        return (
            <a className="btn btn-xs btn-white" onClick={() => {this.sendMessage(user)}}>
                <i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages" title="Message this user"/> <span>Message</span>
            </a>
        )
    }

    sendMessage(user) {
        let participants = [user._id];
        Meteor.user().findExistingConversationWithUsers(participants, function (error, result) {
            if (result) {
                //console.log('conversation found');
                browserHistory.push('/user/messages/' + result);
            } else {
                //console.log('no conversations found. starting new.');
                var conversation = new Conversation().save();
                conversation.addParticipant(Meteor.users.findOne({_id: user._id}));
                browserHistory.push('/user/messages/' + conversation._id);
            }
        })
    }

    displayFollowButtons() {
        const user = this.props.user;

        if(user.username != Telescope.settings.get('bev').username) {// do not allow un-follow of the user 'bev'
            if (user.isFollowed()) {
                return <a className="btn btn-xs btn-white unfollow active" title="Unfollow this user" onClick={() => {this.userUnfollow(user)}}><i className="iconmoon-cityhive-iconmoon-font-v2-ol_follow"/> <span>Unfollow</span></a>
            } else {
                return <a className="btn btn-xs btn-white" title="Follow this user" onClick={() => {this.userFollow(user)}}><i className="iconmoon-cityhive-iconmoon-font-v2-ol_follow"/> <span>Follow</span></a>
            }
        }
    }

    userFollow(user) {
        user.follow();
        this.setState({follow: true});
        Meteor.call('cityhive.email.newFollower', user._id);
        Meteor.call('feed.follow', user, Meteor.userId());
    }

    userUnfollow(user) {
        user.unfollow();
    }

    userFullName(user) {
        return user.profile.firstName + ' ' + user.profile.lastName;
    }

    joinedDate(user) {
        return moment(user.createdAt).format("Do MMM YYYY");
    }

    getFirmAndJobtitle(user) {
        let firm = user.profile.firm;
        let jobTitle = user.profile.jobTitle;

        if(firm && jobTitle) {
            return <p>{firm}<br />{jobTitle}</p>
        }
        else if(firm && !jobTitle){
            return <p>{firm}</p>
        }
        else if(!firm && jobTitle) {
            return <p>{jobTitle}</p>
        }
    }      

    getMembershipStatus(user) {
        let membership = (user.cityhive && user.cityhive.membership);
        if(!membership || membership == 'free') return 'Basic Member';
        if(membership == 'corporate') return 'Corporate Member';
        if(membership == 'recruiter') return 'Recruiter';
    }    

    render() {
        const user = this.props.user;
        return (
            <div className="col-sm-4">
                <div className="contact-box center-version">
                    <Link to={`/user/profile/${user._id}`}>
                    <div className="row">
                        <div className="col-sm-4 no-padding-right">
                            {user.profile.image ? <img alt="image" className="img-circle" src={user.profile.image} /> : <img alt="image" className="img-circle" src={Telescope.settings.get('defaultProfileImage')} /> }                            
                        </div>
                        <div className="col-sm-8">
                            <h3 className="m-b-xs">{this.userFullName(user)}</h3>
                            {this.getFirmAndJobtitle(user)}
                        </div>
                    </div>
                        <p>
                            <small>
                            <span>{this.getMembershipStatus(user)}</span> | 
                            <span className="since"> Joined: <strong>{this.joinedDate(user)}</strong></span>
                            </small>  
                        </p>
                    </Link>
                    <div className="contact-box-footer">
                        <div className="m-t-xs btn-group">
                            {this.displayMessageButton()}
                            {this.displayFollowButtons()}
                            {this.displayBlockButton()}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

UsersDirectoryListItem.propTypes = {
    user: React.PropTypes.object.isRequired
};

UsersDirectoryListItem.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = UsersDirectoryListItemComopser(UsersDirectoryListItem);
export default UsersDirectoryListItemComopser(UsersDirectoryListItem);