import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';
import {browserHistory} from 'react-router';

class SignUp extends Component {

    onClick() {
        $('.main-menu').removeClass('active');
        browserHistory.push('/sign-up');
    }

    render() {
        return (
            <div className="signup" onClick={this.onClick}>
                <p>
                    <FormattedMessage id="signup"/>
                    <span className="join-free"><FormattedMessage id="signup.join_free"/></span>
                </p>
            </div>
        )
    }

}

SignUp.displayName = "SignUp";

module.exports = SignUp;

export default SignUp;
