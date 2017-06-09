import Telescope from 'meteor/nova:lib';

Telescope.callbacks.add("onCreateUser", setupUser);

function setupUser(user) {
  user.cityhive = {
    privacyVisibility : 'show-full-profile',
    privacyNotifications : 'send-notifications'
  };

  if(user.username == Telescope.settings.get('bev').username || user.username == Telescope.settings.get('admin').username) { // verify emails for bev and admin users
    user.emails[0].verified = true;
    user.isAdmin = true;
  } else { // auto follow user 'bev'
    if(Meteor.users.findOne({username: Telescope.settings.get('bev').username})) {
      let bevUserId = Meteor.users.findOne({username: Telescope.settings.get('bev').username})._id;
      Meteor.follows.insert({userId: user._id, followId: bevUserId, date: new Date()});
      Meteor.follows.insert({userId: bevUserId, followId: user._id, date: new Date()});
    }
  }

  return user;
}

Telescope.callbacks.add("UsersEdit", editUser);

function editUser(modifier, user) {
  if(!Meteor.user().isAdmin) {
    if(modifier.$set['cityhive.membership']) {
      delete modifier.$set['cityhive.membership'];
    }
  }

  return modifier;
}
