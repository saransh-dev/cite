import React from 'react';
import {Accounts, STATES} from 'meteor/std:accounts-ui';
import { FormattedMessage } from 'react-intl';
import {browserHistory} from 'react-router';
import CityHiveSignIn from './CityHiveSignIn';

export const SignIn = () => {

    return (
        <div className="sign-in">
            <h5><FormattedMessage id="sign_in.sign_to_account"/></h5>
            <CityHiveSignIn />
        </div>
    );
};

SignIn.displayName = "SignIn";
module.exports = SignIn;
