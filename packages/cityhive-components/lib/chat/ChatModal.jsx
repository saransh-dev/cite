import Telescope from 'meteor/nova:lib';
import React from 'react';
import {Modal, ModalComponent} from 'meteor/patrickml:react-modal';
import ChatModalComposer from './ChatModalComposer';

class ChatModal extends ModalComponent {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    displayChatHeader() {
        return (
            <div className="chatModalHeader">
                <h5><i className="fa fa-comment-o"></i> Live Chat</h5>
            </div>
        )
    }

    displayConversation() {
        const conversation = this.props.conversation;
        if (conversation) {
            let messages = [];
            conversation.messages(null, null, 'date', -1).forEach(function (message) {
                messages.push(
                    <div key={message._id} className="conversation-message">
                        <div className="row">
                            <div className="col-sm-2 no-padding-right">
                                {message.user().profile.image ? <img className="img-circle" src={message.user().profile.image}/> :
                                    <img className="img-circle" src={Telescope.settings.get('defaultProfileImage')}/>}
                            </div>
                            <div className="col-sm-10">
                                <h6 className="author">{message.user().profile.firstName + ' ' + message.user().profile.lastName} wrote:</h6>
                                <div className="conversation-message-content">{message.body}</div>
                                <div className="conversation-message-date txt-col--grey-light">
                                    <small>{moment(message.date).format('MMMM Do YYYY, h:mm:ss a')}</small>
                                </div>
                            </div>
                        </div>
                    </div>)
            });
            if (conversation.messages().count()) {
                // conversation.updateReadState(true);
            }
            return messages;
        }
    }

    displaySendMessageForm() {

        return (
            <form onSubmit={this.formSubmit.bind(this)}>
                <div className="chatMessageInput">
                    <div className="clearfix">
                        <input type="text" ref="content" placeholder="Type your message..."/>
                        <input type="submit" className="btn btn-orange pull-right" value="Send"/>
                    </div>
                </div>
            </form>
        )
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

    render() {
        return (
            <div className="chat-modal-wrapper">
                {
                    this.props.ready ?
                        <Modal isOpen={ this.props.isOpen } close={ this.props.closeModal }>
                            {this.displayChatHeader()}
                            {this.displayConversation()}
                            {this.displaySendMessageForm()}
                            <button onClick={ this.props.closeModal }><i className="fa fa-times"></i></button>
                        </Modal>
                        : <p>Loading</p>
                }
            </div>
        );
    }

}


ChatModal.displayName = "ChatModal";

module.exports = ChatModalComposer(ChatModal);
export default ChatModalComposer(ChatModal);