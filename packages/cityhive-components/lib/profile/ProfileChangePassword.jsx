import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {intlShape} from 'react-intl';
import { FormattedMessage } from 'react-intl';

class ProfileChangePassword extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {

        e.preventDefault();

        let newPassword = this.refs.newPassword.value;
        let rePassword= this.refs.rePassword.value;

        Meteor.call('cityhive.user.change.password', newPassword, rePassword, function (error, result) {
            if(error) {
                Messages.flash(error.reason, 'error');
            } else {
                Messages.flash('You have successfully changed your password', 'success');
            }
        });

    }

    render() {
        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div>
                <div className="breadcrumbs">
                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_profile"/> <span>Change Password</span>
                </div>
                    <div className="profile-change-password section--padding section--grey clearfix">
                        <form onSubmit={this.formSubmit}>
                            <fieldset>
                                <div className="form-group row">
                                    <label htmlFor="visibility" className="col-sm-3">New Password</label>
                                    <div className="col-sm-9">
                                        <input ref="newPassword" className="form-control" type="password" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="visibility" className="col-sm-3">Retype Password</label>
                                    <div className="col-sm-9">
                                        <input ref="rePassword" className="form-control" type="password" />
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

ProfileChangePassword.displayName = "ProfileChangePassword";

module.exports = ProfileChangePassword;
export default ProfileChangePassword;