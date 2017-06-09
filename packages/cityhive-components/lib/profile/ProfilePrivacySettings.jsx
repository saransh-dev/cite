import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {intlShape} from 'react-intl';
import { FormattedMessage } from 'react-intl';

class ProfilePrivacySettings extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {

        e.preventDefault();

        let visibility = this.refs.visibility.value;
        let notifications = this.refs.notifications.value;

        Meteor.call('cityhive.privacy.edit', visibility, notifications, function (error, result) {
            if(error) {
                Messages.flash(error.reason, 'error');
            } else {
                Messages.flash('Privacy Settings updated', 'success');
            }
        });

    }

    getVisibilityValue() {
        let visibility = 'show-full-profile';
        if (Meteor.user().cityhive.privacyVisibility) {
            visibility = Meteor.user().cityhive.privacyVisibility;
        }
        return visibility;
    }

    getNotificationsValue() {
        let notifications = 'send-notifications';
        if (Meteor.user().cityhive.privacyNotifications) {
            notifications = Meteor.user().cityhive.privacyNotifications;
        }
        return notifications;
    }

    render() {
        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div>
                <div className="breadcrumbs">
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_privacy"></i> <span>Privacy Settings</span>
                </div>
                    <div className="profile-privacy-settings section--padding section--grey clearfix">
                        <form onSubmit={this.formSubmit}>
                            <fieldset>
                                <div className="form-group row">
                                    <label htmlFor="visibility" className="col-sm-3">Visibility</label>
                                    <div className="col-sm-9">
                                            <select ref="visibility" className="form-control" name="visibility" id="visibility" defaultValue={this.getVisibilityValue()}>
                                                <option value="show-full-profile">Show full profile</option>
                                                <option value="show-full-profile-only-to-following">Show my basic info to everyone and full profile to those I follow</option>
                                            </select>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div className="form-group row">
                                    <label htmlFor="notifications" className="col-sm-3">Notifications</label>
                                    <div className="col-sm-9">
                                    <select ref="notifications" className="form-control" name="notifications" id="notifications" defaultValue ={this.getNotificationsValue()}>
                                        <option value="none">Do not email me</option>
                                        <option value="send-notifications">Send Notifications</option>
                                    </select>
                                    </div>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-orange pull-right">Submit</button>
                        </form>
                    </div>
                </div>
            </Telescope.components.Profile>
        )
    }
}

ProfilePrivacySettings.displayName = "ProfilePrivacySettings";

module.exports = ProfilePrivacySettings;
export default ProfilePrivacySettings;