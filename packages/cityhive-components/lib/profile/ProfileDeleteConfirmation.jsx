import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {intlShape} from 'react-intl';
import { FormattedMessage } from 'react-intl';
import {browserHistory} from 'react-router';

class ProfileDeleteConfirmation extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let token = this.props.params.token;

        Meteor.call('cityhive.user.delete', token, function (error, result) {
            if(error) {
                Messages.flash(error.reason, 'error');
            } else {
                Messages.flash('Your account is deleted', 'success');
                browserHistory.push('/');
            }
        });

    }

    render() {
        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div>
                <div className="breadcrumbs">
                    <i className="fa fa-user-times"/><span>Delete Account Confirmation</span>
                </div>
                    <div className="profile-delete-account-confirmation section--padding section--grey clearfix">
                        <p>Account delete in progress...</p>
                    </div>
                </div>
            </Telescope.components.Profile>
        )
    }
}

ProfileDeleteConfirmation.displayName = "ProfileDeleteConfirmation";

module.exports = ProfileDeleteConfirmation;
export default ProfileDeleteConfirmation;