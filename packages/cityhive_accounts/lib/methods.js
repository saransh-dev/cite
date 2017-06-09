import Telescope from 'meteor/nova:lib';
import Users from 'meteor/nova:users';

Meteor.methods({
  'cityhive.privacy.edit'(visibility, notifications) {

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(visibility, String);
    check(notifications, String);

    let data = {
      'cityhive.privacyVisibility' : visibility,
      'cityhive.privacyNotifications' : notifications
    };

    Users.update(this.userId, {$set: data});

  },
  'cityhive.users.count'() {

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Meteor.users.find().count();

  }
});
