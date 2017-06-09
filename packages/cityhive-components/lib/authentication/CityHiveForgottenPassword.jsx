import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";

class CityHiveForgottenPassword extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {
        let self = this;
        let email = this.refs.email.value;

        Messages.clearSeen();

        Accounts.forgotPassword({email: email}, function (error, res) {
            //console.log(error);
            if(error) {
                Messages.flash(error.reason, 'error');
            } else {
                Messages.flash('Email sent. Please check your email for reset password link.', 'success');
            }
        });

        e.preventDefault();
    }

    render() {

        return (
            <div className="city-hive-forgotten-password">

                <p className="form-title">Enter your email to reset your password</p>

                <form ref="signUp" onSubmit={this.formSubmit}>

                    <div className="form-item">
                        <input ref="email" type="email" placeholder="Email" required />
                    </div>

                    <div className="form-item">
                        <input type="submit" value="Reset"/>
                    </div>

                </form>

            </div>
        )
    }

}

CityHiveForgottenPassword.displayName = "CityHiveForgottenPassword";

module.exports = CityHiveForgottenPassword;

export default CityHiveForgottenPassword