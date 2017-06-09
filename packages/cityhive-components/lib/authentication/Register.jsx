import React from 'react';
import {Accounts, STATES} from 'meteor/std:accounts-ui';
import CityHiveSignUp from './CityHiveSignUp';

export const Register = () => {
  return (
      <div className="container txt-col--light">
        <div className="limited-width-small">
          <div className="sign-in">
            <h2 className="page-title">Register</h2>
            <CityHiveSignUp />
          </div>
        </div>
      </div>
  );
};

Register.displayName = "Register";
module.exports = Register;