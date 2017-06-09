import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class ProfileMessages extends Component {

    componentDidMount() {
        setTimeout(function () {
            jQuery('.messages .profile-messages-inbox > .conversation:first-child').trigger('click');
        }, 150);
    }

    render() {

        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div>
                <div className="breadcrumbs">
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages"></i> <span>Messages</span>
                </div>
                    <div className="section-messages section--grey section--padding">
                        <div className="row">
                            <div className="col-sm-4 inbox">
                                <Telescope.components.ProfileMessagesInbox />
                            </div>
                            <div className="col-sm-8">
                                {/*{this.displayConversation()}*/}
                                {/*{this.displaySendMessageForm()}*/}
                            </div>
                        </div>
                    </div>
                </div>
            </Telescope.components.Profile>
        );

    }

}

ProfileMessages.displayName = "ProfileMessages";

module.exports = ProfileMessages;
export default ProfileMessages;