import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import { Accounts } from 'meteor/accounts-base';
import {browserHistory} from 'react-router';


class CityHiveResetPassword extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {
        e.preventDefault();

        let self = this;
        let newPassword = this.refs.password.value;
        let token = this.props.params.token;

        Messages.clearSeen();

        if(newPassword.length < 7) {
            Messages.flash('Password must be minimum 7 characters', 'error');
            return false;
        }

        Accounts.resetPassword(token, newPassword, function (error) {
            if(error) {
                Messages.flash(error.reason, 'error');
            } else {
                Messages.flash('You have successfully reset your password', 'success');
                browserHistory.push('/user/dashboard');
            }
        });

    }

    render() {

        return (
            <div className="city-hive-reset-password">

                <p className="form-title">Enter your new password</p>

                <form ref="signUp" onSubmit={this.formSubmit}>

                    <div className="form-item">
                        <input ref="password" type="password" placeholder="Enter your new password" required />
                    </div>

                    <div className="form-item">
                        <input type="submit" value="Sign up"/>
                    </div>

                </form>

            </div>
        )
    }

}

CityHiveResetPassword.displayName = "CityHiveResetPassword";

module.exports = CityHiveResetPassword;

export default CityHiveResetPassword