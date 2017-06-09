import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {intlShape} from 'react-intl';
import { FormattedMessage } from 'react-intl';
import {browserHistory} from 'react-router';

class ProfileDelete extends Component {

    constructor(props) {
        super(props);
    }

    deleteAccount() {

        Meteor.call('cityhive.user.delete.token', function (error, result) {
            if(error) {
                Messages.flash(error.reason, 'error');
            } else {
                Messages.flash('Email with instructions on how to delete your account is sent.', 'success');
                browserHistory.push('/user/dashboard');
            }
        });

    }

    render() {
        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div>
                <div className="breadcrumbs">
                    <i className="fa fa-user-times"/><span>Delete Account</span>
                </div>
                    <div className="profile-delete-account section--padding section--grey clearfix">
                        <p>Clicking the button below will delete your account. Email confirmation is needed.</p>
                        <button className="btn btn-link btn-rounded" onClick={this.deleteAccount}><i className="fa fa-user-times"/> Delete Account</button>
                    </div>
                </div>
            </Telescope.components.Profile>
        )
    }
}

ProfileDelete.displayName = "ProfileDelete";

module.exports = ProfileDelete;
export default ProfileDelete;