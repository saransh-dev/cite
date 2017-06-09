import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import ProfileMessagesComposer from './ProfileMessagesComposer';
import Users from 'meteor/nova:users';
import {browserHistory} from 'react-router';

class ProfileMessagesInbox extends Component {

    listOfUsers() {
        let result = [];
        const users = this.props.users;
        let lastMessage = this.lastMessage;
        const openConversation = this.openConversation;

        let newUsersArray = [];

        users.forEach((user) => {
            user.lastMessageDate = this.lastMessageDate(user);
            newUsersArray.push(user);
        });

        let direction= -1;
        newUsersArray.sort(function (a, b) {
            if (!a.lastMessageDate) return 1;
            if (!b.lastMessageDate) return -1;
            return direction*((+a.lastMessageDate)-(+b.lastMessageDate));
        });

        newUsersArray.forEach(function (user) {
            result.push(
                <div key={user._id} onClick={() => {openConversation(user)}} className="conversation">
                <div className="row">
                    <div className="col-sm-3">
                        {user.profile.image ? <img className="img-circle" src={user.profile.image}/> : <img className="img-circle" src={Telescope.settings.get('defaultProfileImage')}/>}
                    </div>
                    <div className="col-sm-9">
                        <h5>{user.profile.firstName + ' ' + user.profile.lastName}</h5>
                        {lastMessage(user)}
                    </div>
                </div>
                </div>
            )
        });

        return result;
    }

    lastMessageDate(user) {
        let users = [Meteor.userId(), user._id]
        let conversation = Meteor.conversations.findOne({_participants:{$size:users.length, $all:users}});
        if (conversation) {
            let content = '';
            let lastMessage = conversation.lastMessage();
            if (lastMessage) {
                return lastMessage.date;
            } else {
                return '';
            }
        }
    }

    lastMessage(user) {
        let users = [Meteor.userId(), user._id]
        let conversation = Meteor.conversations.findOne({_participants:{$size:users.length, $all:users}});
        if (conversation) {
            let content = '';
            let lastMessage = conversation.lastMessage();
            if(lastMessage) {
                if(lastMessage.body.length > 20) {
                    content = lastMessage.body.substring(0,20);
                    content = content + '...';
                } else {
                    content = lastMessage.body;
                }
                return (
                    <div key={lastMessage._id} className={`${conversation.isUnread() ? 'last-message-item not-read' : 'last-message-item read'} ${lastMessage.userId == Meteor.userId() ? 'replied' : 'not-replied'}`}>
                        <span className="message">{content}</span>
                        <br/>
                        <span className="last-message-date">{moment(lastMessage.date).fromNow()}</span>
                    </div>)
            }
        }
    }

    openConversation(user) {

        var participants = [user._id];

        Meteor.user().findExistingConversationWithUsers(participants, (error, result) => {
            if(result){
                browserHistory.push('/user/messages/' + result);
                // this.setState({conversationId: result});
            } else {
                let conversation = new Conversation().save();
                conversation.addParticipant( Meteor.users.findOne(participants[0]) );
                browserHistory.push('/user/messages/' + conversation._id);
                // this.setState({conversationId: conversation._id});
            }
        })

    }

    render() {
        return (
            <div className="profile-messages-inbox">
                {
                    this.props.ready ?
                        this.listOfUsers()
                        : <p>Loading</p>
                }
            </div>
        );
    }
}

ProfileMessagesInbox.displayName = "ProfileMessagesInbox";

module.exports = ProfileMessagesComposer(ProfileMessagesInbox);
export default ProfileMessagesComposer(ProfileMessagesInbox);