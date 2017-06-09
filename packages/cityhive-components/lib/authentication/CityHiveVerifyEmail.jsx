import React, {Component} from 'react';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import { Accounts } from 'meteor/accounts-base';
import {browserHistory} from 'react-router';

class CityHiveVerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verifyEmailStatus: 'In progress',
        }
    }

    componentDidMount() {
        let token = this.props.params.token;
        let self = this;

        Accounts.verifyEmail(token, function (error) {
            if(error) {
                //Messages.flash(error.reason, 'error');
                self.setState({
                    verifyEmailStatus: error.reason
                })
            } else {
                Messages.flash('Your email is verified', 'success');
                browserHistory.push('/user/dashboard');
            }
        });

    }

    verifyEmailStatus() {
        return <span>{this.state.verifyEmailStatus}</span>;
    }

    getButtonClass() {
        let btnClass = 'verify-email-status btn';
        if(this.state.verifyEmailStatus == 'In progress') btnClass += ' btn-info';
        if(this.state.verifyEmailStatus == 'Verify email link expired') btnClass += ' btn-danger';
        return btnClass;
    }

    render() {

        return (
            <div className="city-hive-verify-email">

                <p>Verifying your email: <span className={this.getButtonClass()}>{this.verifyEmailStatus()}</span></p>
                <img src="/img/logo-footer.png"/>

            </div>
        )
    }

}

CityHiveVerifyEmail.displayName = "CityHiveVerifyEmail";

module.exports = CityHiveVerifyEmail;

export default CityHiveVerifyEmail