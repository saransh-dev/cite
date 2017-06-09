import React from 'react';
import { FormattedMessage } from 'react-intl';

const SignUpBar = () => {
    return (
        <div className="sign-up-bar">
            <p><FormattedMessage id="signup.bar"/></p>
            <span className="members-count">677 Members</span>
        </div>
    )
};

SignUpBar.displayName = "SignUpBar";

module.exports = SignUpBar;
export default SignUpBar;