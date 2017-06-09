import { Email } from 'meteor/email'
import NovaEmail from 'meteor/nova:email';

Meteor.methods({
  'cityhive.email.newFollower'(userId) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if(user = Meteor.users.findOne(userId)) {

      if(user.cityhive.privacyNotifications != 'none' ) {

        let name = Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;

        /*
        Email.send({
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: 'User ' + name + ' started following you',
          text: 'User ' + name + ' started following you'
        });
        */

        var generic = NovaEmail.getTemplate('generic')({
          subject: '[CityHive] User ' + name + ' started following you',
          title: 'New Follower',
          content: 'User ' + name + ' started following you'
        });


        let email = {
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: '[CityHive] User ' + name + ' started following you',
          html: NovaEmail.buildTemplate(generic)
        };

        //NovaEmail.send(user.emails[0].address, 'User ' + name + ' started following you', NovaEmail.buildTemplate(generic));

        Email.send(email);

      }

    }

  },
  'cityhive.email.newMessage'(userId) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if(user = Meteor.users.findOne(userId)) {

      if(user.cityhive.privacyNotifications != 'none' ) {

        let name = Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;

        /*
        Email.send({
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: 'New message from ' + name,
          text: 'You have received new message from user ' + name
        });
        */

        var generic = NovaEmail.getTemplate('generic')({
          subject: '[CityHive] New message from ' + name,
          title: 'New Message',
          content: 'You have received new message from user ' + name
        });

        let email = {
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: '[CityHive] New message from ' + name,
          html: NovaEmail.buildTemplate(generic)
        };

        Email.send(email);

      }

    }

  },
  'cityhive.email.newStatusLike'(userId, type) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if(user = Meteor.users.findOne(userId)) {

      if(user.cityhive.privacyNotifications != 'none' ) {

        let name = Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;

        /*
        Email.send({
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: name + ' liked your status',
          text: 'User ' + name + ' liked your status'
        });
        */

        var generic = NovaEmail.getTemplate('generic')({
          subject: '[CityHive] ' + name + ' liked your status',
          title: 'New Like',
          content: 'User ' + name + ' liked your status'
        });

        let email = {
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: '[CityHive] ' + name + ' liked your status',
          html: NovaEmail.buildTemplate(generic)
        };

        Email.send(email);

      }

    }

  },
  'cityhive.email.newStatusComment'(userId, type) {

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if(user = Meteor.users.findOne(userId)) {

      if(user.cityhive.privacyNotifications != 'none' ) {

        let name = Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;

        /*
        Email.send({
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: name + ' commented on your status',
          text: 'User ' + name + ' commented on your status'
        });
        */

        var generic = NovaEmail.getTemplate('generic')({
          subject: '[CityHive] ' + name + ' commented on your status',
          title: 'New Comment',
          content: 'User ' + name + ' commented on your status'
        });

        let email = {
          to: user.emails[0].address,
          from: Telescope.settings.get('defaultEmail'),
          subject: '[CityHive] ' + name + ' commented on your status',
          html: NovaEmail.buildTemplate(generic)
        };

        Email.send(email);

      }

    }

  }
});
