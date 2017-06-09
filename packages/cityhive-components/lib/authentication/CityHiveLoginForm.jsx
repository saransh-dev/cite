import React from 'react';
import {Accounts, STATES} from 'meteor/std:accounts-ui';

class CityHiveLoginForm extends Accounts.ui.LoginForm {
    fields() {
        const { formState } = this.state;
        if (formState == STATES.SIGN_UP) {
            return {
                firstName: {
                    id: 'firstName',
                    hint: 'First Name',
                    label: 'firstName',
                    onChange: this.handleChange.bind(this, 'firstName')
                },
                lastName: {
                    id: 'lastName',
                    hint: 'Last Name',
                    label: 'lastName',
                    onChange: this.handleChange.bind(this, 'lastName')
                },
                ...super.fields()
            };
        }
        return super.fields();
    }

    signUp(options = {}) {
        const { firstName = null, lastName = null } = this.state;
        if (firstName !== null && lastName !== null) {
            options.profile = Object.assign(options.profile || {}, {
                firstName: firstName,
                lastName: lastName
            });
        }
        super.signUp(options);
    }
}

export default CityHiveLoginForm;