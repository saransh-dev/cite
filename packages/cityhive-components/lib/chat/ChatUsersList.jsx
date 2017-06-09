import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import ChatUsersListComposer from './ChatUsersListComposer';
import ChatModal from './ChatModal';
import {Link} from 'react-router';

class ChatUsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controlledModalOpen : false,
            conversationId: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    userFullName(user) {

        let firstName = user.profile.firstName ? user.profile.firstName : '';
        let lastName = user.profile.lastName ? user.profile.lastName : '';

        return (
            firstName + ' ' + lastName
        )
    }

    followingUsers() {
        if (Meteor.userId()) {
            let following = this.props.following;

            if (!!following.length) {
                return (
                    <div className="chat-users-list">
                        <div className="chat-toggle" onClick={this.toggleChatList}></div>
                        <div className="heading"><img src="/img/icon-chat.png" />Live chat</div>
                            <div className="inner">
                                <div className="whos-online">Who's online right now</div>
                                {following.map(follower =>
                                    this.displayUser(follower)
                                )}
                            </div>
                    </div>
                )
            } else {
                return (
                    <div className="chat-users-list">
                        <div className="chat-toggle" onClick={this.toggleChatList}></div>
                        <div className="heading"><img src="/img/icon-chat.png" />Live chat</div>
                        <div className="inner">
                            <div className="whos-online">Who's online right now</div>
                            <div className="none">
                                <p>Looks like no one's in your Hive right now.</p>
                                <p>You can still send them a <Link to="/user/messages">message</Link> for later.</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    displayUser(follower) {
        if(follower.user() && follower.user().status && follower.user().status.online) {
            return (
                <div className="chat-user clearfix" key={follower._id} onClick={() => { this.openModal(follower.user()) }}>
                    <div className="image">
                        {follower.user().image ? <img className="img-circle" src={follower.user().image}/> : <img className="img-circle" src={Telescope.settings.get('defaultProfileImage')}/>}
                    </div>
                    <div className="name">
                        {this.userFullName(follower.user())}
                    </div>
                </div>
            )
        }
    }

    openModal(user) {
        var participants = [user._id];

        Meteor.user().findExistingConversationWithUsers(participants, (error, result) => {
            if(result){
                this.setState({
                    conversationId : result
                });
            } else {
                let conversation = new Conversation().save();
                conversation.addParticipant( Meteor.users.findOne(participants[0]) );
                this.setState({
                    conversationId : conversation._id
                });
            }
        });

        this.setState({
            controlledModalOpen : true
        });
    }

    closeModal () {
        this.setState({
            controlledModalOpen : false,
            conversationId : ''
        });
    }

    toggleChatList() {
        $('.chat-wrapper').toggleClass('active');
    }

    render() {

        return (
            <div className="chat-wrapper">
                {
                    this.props.ready ?
                        <div className="chat-wrapper-inner">
                            {this.followingUsers()}
                            <ChatModal
                                closeModal={ this.closeModal }
                                isOpen={ this.state.controlledModalOpen }
                                conversationId = {this.state.conversationId}
                                conversation={Meteor.conversations.findOne({_id: this.state.conversationId})} />
                        </div>
                        : <p>Loading</p>
                }
            </div>
        )
    }
}

ChatUsersList.displayName = "ChatUsersList";

module.exports = ChatUsersListComposer(ChatUsersList);
export default ChatUsersListComposer(ChatUsersList);