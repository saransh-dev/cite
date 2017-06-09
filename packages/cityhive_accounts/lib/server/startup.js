import Telescope from 'meteor/nova:lib';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import {browserHistory} from 'react-router';
import {Messages} from 'meteor/nova:core';
import NovaEmail from 'meteor/nova:email';

Meteor.startup(function() {

  Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
  });

  Accounts.emailTemplates.siteName = "CityHive";

  Accounts.emailTemplates.verifyEmail.from = function () {
    return "[CityHive] Verify Email <no-reply@cityhive.co.uk>";
  };
  Accounts.emailTemplates.verifyEmail.subject = function() {
    return '[CityHive] Verify Email';
  };
  Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    // return html string

    let generic = NovaEmail.getTemplate('verifyAccount')({
        subject: 'Verify your account',
        title: 'Verify your account',
        content: '<p>To verify your account email, simply visit the link below:</p>',
        url : url
    });

    return NovaEmail.buildTemplate(generic);
  };

  Accounts.emailTemplates.resetPassword.from = function () {
    return "[CityHive] Password Reset <no-reply@cityhive.co.uk>";
  };
  Accounts.emailTemplates.resetPassword.subject = function() {
    return '[CityHive] Reset Password';
  };
  Accounts.emailTemplates.resetPassword.html = function (user, url) {
    // return html string

    let generic = NovaEmail.getTemplate('resetPassword')({
      subject: 'Reset Password',
      title: 'Reset Password',
      content: '<p>To reset your password, simply click the link below:</p>',
      url : url
    });

    return NovaEmail.buildTemplate(generic);
  };


  Accounts.ui.config({
    onSignedOutHook: () => browserHistory.push('/'),
  });

  // Reset password url
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };

  // Verify email url
  Accounts.urls.verifyEmail = function(token){
    return Meteor.absoluteUrl("verify-email/" + token);
  };

  // Prevent login if email is not verified
  var loginAttemptVerifier = function (parameters) {
    if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
      // return true if verified email, false otherwise.
      var found = _.find(
        parameters.user.emails,
        function (thisEmail) {
          return thisEmail.verified
        }
      );

      if (!found) {
        throw new Meteor.Error('verify.email', 'Please verify your email account first.');
      }
      return found && parameters.allowed;
    } else {
      //console.log("User has no registered emails.");
      return false;
    }
  };
  Accounts.validateLoginAttempt(loginAttemptVerifier);

  // Create admin user if it does not exists
  if(! Meteor.users.findOne({username: Telescope.settings.get('admin').username})) {

    Accounts.createUser({
      username: Telescope.settings.get('admin').username,
      email: Telescope.settings.get('admin').email,
      password: Telescope.settings.get('admin').password,
      profile: {
        title: Telescope.settings.get('admin').title,
        firstName: Telescope.settings.get('admin').firstName,
        lastName: Telescope.settings.get('admin').lastName
      }
    });

  }

  // Create user Bev if it does not exists
  if(! Meteor.users.findOne({username: Telescope.settings.get('bev').username})) {

    Accounts.createUser({
      username: Telescope.settings.get('bev').username,
      email: Telescope.settings.get('bev').email,
      password: Telescope.settings.get('bev').password,
      profile: {
        title: Telescope.settings.get('bev').title,
        firstName: Telescope.settings.get('bev').firstName,
        lastName: Telescope.settings.get('bev').lastName
      }
    });

  }

});
