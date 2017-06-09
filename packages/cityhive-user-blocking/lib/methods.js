import Blocks from './collection.js';

Meteor.methods({
  'cityhive.user.block'(userId) {

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(userId, String);

    if(Blocks.findOne({userId: Meteor.userId(), blockedUserId: userId})) {
      throw new Meteor.Error('already.blocked', 'User is already blocked');
    }

    Blocks.insert({
      userId: Meteor.userId(),
      blockedUserId: userId,
      date: new Date()
    });

  },
  'cityhive.user.unblock'(userId) {

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(userId, String);

    if(! Blocks.findOne({userId: Meteor.userId(), blockedUserId: userId})) {
      throw new Meteor.Error('not.blocked', 'Unable to unblock user. User is not blocked.');
    }

    Blocks.remove({
      userId: Meteor.userId(),
      blockedUserId: userId,
    });

  },
  'cityhive.user.isBlocked'(userId) {

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(userId, String);

    return !!Blocks.findOne({userId: Meteor.userId(), blockedUserId: userId});

  }
});
