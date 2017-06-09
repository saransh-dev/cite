import Telescope from 'meteor/nova:lib';
import {Accounts} from 'meteor/accounts-base'
import {Random} from 'meteor/random';
import { Email } from 'meteor/email'
import Blocks from 'meteor/cityhive:user-blocking';
import NovaEmail from 'meteor/nova:email';


Meteor.methods({
  'cityhive.user.create'(fields) {

    let allowedFields = [
      'title',
      'firstName',
      'lastName',
      'email',
      'profession',
      'jobTitle',
      'jobFunction',
      'firm',
      'department',
      'yearStarted',
      'password',
      'rePassword'
    ];

    allowedFields.forEach((field) => {
      if (!fields[field]) throw new Meteor.Error('empty.field', 'Please fill in all required fields');
      check(fields[field], String);
    });

    if (fields.firstName.length > 35) {
      throw new Meteor.Error('firstName.max.len', 'First name too long');
    }

    if (fields.firstName.length < 2) {
      throw new Meteor.Error('firstName.min.len', 'First name too short');
    }

    if (fields.lastName.length > 35) {
      throw new Meteor.Error('lastName.max.len', 'Last name too long');
    }

    if (fields.lastName.length < 2) {
      throw new Meteor.Error('lastName.min.len', 'Last name too short');
    }

    if (fields.password.length < 7) {
      throw new Meteor.Error('pass.min.len', 'Password must be minimum 7 characters');
    }

    if (fields.password !== fields.rePassword) {
      throw new Meteor.Error('pass.match.failed', 'Passwords do not match');
    }

    let userId = Accounts.createUser({
      email: fields.email,
      password: fields.password,
      profile: {
        title: fields.title,
        firstName: fields.firstName,
        lastName: fields.lastName,
        profession: fields.profession,
        jobFunction: fields.jobFunction,
        jobTitle: fields.jobTitle,
        firm: fields.firm,
        department: fields.department,
        yearStarted: fields.yearStarted,
      }
    });

    if (userId) {

      // Send verification email
      Accounts.sendVerificationEmail(userId);

      return userId;
    }
  },
  'cityhive.user.change.password'(newPassword, rePassword) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized');
    }

    check(newPassword, String);
    check(rePassword, String);

    if (newPassword.length < 7) {
      throw new Meteor.Error('pass.min.len', 'Password must be minimum 7 characters');
    }

    if (newPassword !== rePassword) {
      throw new Meteor.Error('pass.match.failed', 'Passwords do not match');
    }

    Accounts.setPassword(Meteor.userId(), newPassword, {logout: false})

  },
  'cityhive.user.delete.token'() {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized');
    }

    let email = '';

    if (Meteor.user().emails && Meteor.user().emails.length) {
      email = Meteor.user().emails[0].address;
    } else {
      throw new Meteor.Error('no.email', 'Error. Please try later.');
    }

    let tokenDocument = {
      token: Random.secret(),
      address: email,
      when: new Date(),
      expires: {minutes: 1440}
    };

    Meteor.users.update(
      {_id: Meteor.userId()},
      {$push: {'services.email.verificationTokens': tokenDocument}}
    );

    /*
    Email.send({
      to: Meteor.user().emails[0].address,
      from: Telescope.settings.get('defaultEmail'),
      subject: 'Delete your City Hive account',
      text: "To delete your account please visit this link:  \n\n"
        + Meteor.absoluteUrl() + 'user/delete-confirmation/' + tokenDocument.token
    });
    */

    var generic = NovaEmail.getTemplate('deleteAccount')({
      subject: '[CityHive] Delete your account',
      title: 'Delete Account',
      content: '<p>To delete your account please visit this link:</p>',
      url: Meteor.absoluteUrl() + 'user/delete-confirmation/' + tokenDocument.token
    });


    let emailObject = {
      to: Meteor.user().emails[0].address,
      from: Telescope.settings.get('defaultEmail'),
      subject: '[CityHive] Delete your account',
      html: NovaEmail.buildTemplate(generic)
    };

    Email.send(emailObject);

  },
  'cityhive.user.delete'(token) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized');
    }

    check(token, String);

    let user = Meteor.users.findOne({
      'services.email.verificationTokens.token': token
    });

    if(!user) throw new Meteor.Error('user.delete.failed', 'Account delete failed. User not found.');

    let tokenDocument = _.find(user.services.email.verificationTokens, function(tokenObj){
      return tokenObj.token === token;
    });

    if(!tokenDocument || !tokenDocument.expires) throw new Meteor.Error('user.delete.failed', 'Token not found.');

    let interval = Object.keys(tokenDocument.expires)[0];
    let quantity = tokenDocument.expires[interval];

    let tokenExpires = moment(tokenDocument.when).add(quantity, interval);
    let now = moment();

    if (now.isBefore(tokenExpires)) {

      let userId = Meteor.userId();

      // delete all user related references in collections

      Blocks.remove({userId: userId});
      Blocks.remove({blockedUserId: userId});
      Meteor.conversations.remove({_participants: userId});
      Meteor.participants.remove({userId: userId});
      Meteor.messages.remove({userId: userId});
      Meteor.posts.remove({userId: userId});
      Meteor.posts.remove({posterId: userId});
      Meteor.posts.remove({body: {$regex: ".*" + userId + ".*"}});
      Meteor.comments.remove({userId: userId});
      Meteor.likes.remove({userId: userId});
      Meteor.follows.remove({userId: userId});
      Meteor.follows.remove({followId: userId});
      Meteor.statuses.remove({userId: userId});

      Meteor.users.remove(Meteor.userId());

    } else {
      throw new Meteor.Error('user.delete.failed', 'Token expired.');
    }

  },
  'cityhive.user.delete.by.admin'(userId) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Not authorized');
    }

    let currentUser = Meteor.users.findOne(this.userId);
    if(!currentUser.isAdmin) {
      throw new Meteor.Error('not-authorized', 'Not authorized');
    }

    check(userId, String);

    let user = Meteor.users.findOne(userId);

    if(!user) throw new Meteor.Error('user.delete.failed', 'Account delete failed. User not found.');

    // delete all user related references in collections

    Blocks.remove({userId: userId});
    Blocks.remove({blockedUserId: userId});
    Meteor.conversations.remove({_participants: userId});
    Meteor.participants.remove({userId: userId});
    Meteor.messages.remove({userId: userId});
    Meteor.posts.remove({userId: userId});
    Meteor.posts.remove({posterId: userId});
    Meteor.posts.remove({body: {$regex: ".*" + userId + ".*"}});
    Meteor.comments.remove({userId: userId});
    Meteor.likes.remove({userId: userId});
    Meteor.follows.remove({userId: userId});
    Meteor.follows.remove({followId: userId});
    Meteor.statuses.remove({userId: userId});

    Meteor.users.remove(userId);

  }
});
