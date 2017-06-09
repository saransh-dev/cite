import React, {Component} from 'react';
import { FormattedMessage } from 'react-intl';
import {browserHistory} from 'react-router';

class SignIn extends Component {

    onClick() {
        $('.main-menu').removeClass('active');
        browserHistory.push('/sign-in');
    }

    render() {
        return (
            <div className="signin" onClick={this.onClick}>
                <p><i className="fa fa-user"></i> <FormattedMessage id="signin"/></p>
            </div>
        )
    }
}

SignIn.displayName = "SignIn";

module.exports = SignIn;

export default SignIn;
