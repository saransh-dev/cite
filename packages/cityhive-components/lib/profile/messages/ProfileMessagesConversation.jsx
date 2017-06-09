import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import ProfileMessagesConversationComposer from './ProfileMessagesConversationComposer';
import ProfileAutosuggest from './ProfileAutosuggest';

class ProfileMessagesConversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayInbox: false
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.topFormSubmit = this.topFormSubmit.bind(this);
        this.toggleInbox = this.toggleInbox.bind(this);
    }

    getMessageClasses(user) {
        let classes = 'conversation-message';
        if(user) {
            if(user._id == Meteor.userId()) {
                classes = classes + ' user-recipient';
            } else {
                classes = classes + ' user-sender';
            }
        }
        classes = classes + ' clearfix';
        return classes;
    }

    displayConversation() {
        const conversation = this.props.conversation;
        const self = this;
        if(conversation) {
            let messages = [];
            conversation.messages(null, null, 'date', -1).forEach(function(message){
                messages.push(
                    <div key={message._id} className={self.getMessageClasses(message.user())}>
                    <div className="row">
                        <div className="col-sm-12">
                            {message.user().profile.image ? <img className="img-circle" src={message.user().profile.image}/> : <img className="img-circle" src={Telescope.settings.get('defaultProfileImage')} />}
                             <p className="author"><strong>{message.user().profile.firstName + ' ' + message.user().profile.lastName}</strong></p>
                            <div className="conversation-message-date"><small>{moment(message.date).format('MMMM Do YYYY, h:mm:ss a')}</small></div>                           
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="conversation-message-content">{message.body}</div>
                        </div>
                    </div>
                    </div>)
            });
            if(conversation.messages().count()) {
                return (
                    <div className="message-wrapper clearfix">
                        {messages}
                    </div>
                )
            }
        }
    }

    displaySendMessageForm() {

        if(this.props.routeParams._id) {
            return (
                <form className="clearfix bottom-message-send" onSubmit={this.formSubmit.bind(this)}>
                    <textarea ref="content" placeholder="Write your message" />
                    <br/>
                    <input type="submit" className="btn btn-orange pull-right" value="Send"/>
                </form>
            )
        }
    }

    formSubmit(e) {
        e.preventDefault();
        let content = this.refs.content.value;
        const conversation = this.props.conversation;
        conversation.sendMessage(content);
        this.refs.content.value = '';

        conversation.participants().forEach(function(participant){
            if(!participant.isObserving()) {
                Meteor.call('cityhive.email.newMessage', participant.user()._id);
            }
        });

    }

    displayTopSendMessageForm() {

        if(this.props.routeParams._id) {
            return (
                <form className="clearfix top-message-send" onSubmit={this.topFormSubmit.bind(this)}>
                    <textarea ref="contentTop" placeholder="Write your message" />
                    <br/>
                    <input type="submit" className="btn btn-orange pull-right" value="Send"/>
                </form>
            )
        }
    }

    topFormSubmit(e) {
        e.preventDefault();
        let content = this.refs.contentTop.value;
        const conversation = this.props.conversation;
        conversation.sendMessage(content);
        this.refs.contentTop.value = '';

        conversation.participants().forEach(function(participant){
            //console.log(participant);
            if(!participant.isObserving()) {
                Meteor.call('cityhive.email.newMessage', participant.user()._id);
            }
        });
    }

    toggleInbox() {
        if(this.state.displayInbox == true) {
            this.setState({
                displayInbox: false
            })
        } else {
            this.setState({
                displayInbox: true
            })
        }
    }

    displayInboxToggle() {
        if(this.state.displayInbox == true) {
            return <p className="open-inbox pull-right" onClick={this.toggleInbox}>Close my inbox<span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_close"></i></span></p>
        } else {
            return <p className="open-inbox pull-right" onClick={this.toggleInbox}>Open my inbox<span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_INBOX"></i></span></p>
        }
    }

    getMessagesElementClass() {
        return this.state.displayInbox ? 'col-sm-8' : 'col-sm-12';
    }

    render() {

        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                {
                    this.props.ready ?
                        (
                                <div>
                                    <div className="breadcrumbs">
                                        <i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages"></i> <span>Messages</span>
                                    </div>
                                    <div className="section-messages section--grey section--padding">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {this.displayInboxToggle()}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <p className="autosuggest-label">New Message</p>
                                                <ProfileAutosuggest conversationId={this.props.routeParams._id} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {this.displayTopSendMessageForm()}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4 inbox">
                                                {this.state.displayInbox && <Telescope.components.ProfileMessagesInbox /> }
                                            </div>
                                            <div className={this.getMessagesElementClass()}>
                                                {this.displaySendMessageForm()}
                                                <div className="clearfix">
                                                    {this.displayConversation()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                        : <p>Loading</p>
                }
            </Telescope.components.Profile>
        )
    }
}

ProfileMessagesConversation.displayName = "ProfileMessagesConversation";

module.exports = ProfileMessagesConversationComposer(ProfileMessagesConversation);
export default ProfileMessagesConversationComposer(ProfileMessagesConversation);