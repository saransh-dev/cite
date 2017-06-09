import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

class CityHiveSignIn extends Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {
        let usernameOrEmail = this.refs.usernameOrEmail.value;
        let password = this.refs.password.value;

        Messages.clearSeen();

        Meteor.loginWithPassword(usernameOrEmail, password, function (error) {
            if(error) {
                let errorType = 'error';
                if(error.error == 'verify.email') {
                    errorType = 'info';
                }
                Messages.clearSeen();
                Messages.flash(error.reason, errorType);
            } else {
                browserHistory.push('/user/dashboard');
            }
        });

        e.preventDefault();
    }

    render() {

        return (
            <div className="city-hive-sign-in">

                <p className="form-title">Sign in to your account</p>

                <form ref="signUp" onSubmit={this.formSubmit}>

                    <div className="form-item">
                        <input ref="usernameOrEmail" type="text" placeholder="Username or Email" required />
                    </div>

                    <div className="form-item">
                        <input ref="password" type="password" placeholder="Password" required />
                    </div>

                    <div className="form-item">
                        <p className="note">Forgotten your password? <Link to="/forgotten-password">Click here to reset</Link></p>
                    </div>

                    <div className="form-item">
                        <input type="submit" value="Sign in"/>
                    </div>

                    <div className="form-item">
                        <p className="switch-to-sign-in">Don't have an account? <Link to="/sign-up">Sign up here</Link></p>
                    </div>

                </form>

            </div>
        )
    }

}

export default CityHiveSignIn;