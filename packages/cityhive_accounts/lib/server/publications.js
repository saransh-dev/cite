import Telescope from 'meteor/nova:lib';
import Blocks from 'meteor/cityhive:user-blocking';
import Pages from 'meteor/cityhive:pages';

Meteor.publish('cityhive.pageBySlug', function (slug) {
  return Pages.find({slug: slug}, {fields: {slug: 1}});
});

Meteor.publish('cityhive.admin.pageById', function (id) {
  if (!this.userId) {
    return this.ready();
  }

  let user = Meteor.users.findOne(this.userId);

  if(!user || !user.isAdmin) {
    return this.ready();
  }

  return Pages.find({_id: id});
});

Meteor.publish('admin.users.edit.list', function () {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let user = Meteor.users.findOne(this.userId);

    if(!user || !user.isAdmin) {
      return this.ready();
    }

    let fields = {
      'emails': 1,
      'profile.title': 1,
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.image': 1,
      'profile.firm': 1,
      "profile.jobFunction": 1,
      "profile.jobTitle": 1,
      'cityhive.membership' : 1,
    };

    const users = Meteor.users.find(
      {},
      {fields: fields}
    );

    return [users];
  });
});

Meteor.publish('admin.users.edit.single', function (userId) {
    if (!this.userId) {
      return this.ready();
    }

    let user = Meteor.users.findOne(this.userId);

    if(!user || !user.isAdmin) {
      return this.ready();
    }

    const users = Meteor.users.find(
      {_id: userId}
    );

    return [users];
});

Meteor.publish('profileStatus', function (userId) {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    check(userId, String);

    let status = Meteor.statuses.find({userId: userId}, {sort: {'createdAt': -1}, limit: 1});

    return [status];

  })

});

Meteor.publish('timelinePosts', function () {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    const followUsers = Meteor.follows.find({userId: this.userId, followId:{$ne:this.userId}}, {fields: {followId: 1}}).fetch();
    const followerUsers = Meteor.follows.find({userId:{$ne:this.userId}, followId: this.userId}, {fields: {userId: 1}}).fetch();

    let followUsersIds = [];
    if(followUsers.length) {
      followUsers.forEach((user) => {
        followUsersIds.push(user.followId);
      })
    }

    let followerUsersIds = [];
    if(followerUsers.length) {
      followerUsers.forEach((user) => {
        followerUsersIds.push(user.userId);
      })
    }

    allUserIds = followUsersIds.concat(followerUsersIds);
    uniqUserIds = _.uniq(allUserIds);

    let uniQuserIdsWithCurrentUser = uniqUserIds.slice();
    uniQuserIdsWithCurrentUser.push(this.userId);

    let blockedUsersIds = getBlockedUsersIds(this.userId, {hideBlocked : true});

    let posts;
    if(blockedUsersIds.length) {
       posts = Meteor.posts.find({userId: this.userId, posterId: {$nin: blockedUsersIds}}, {sort:  {"date" : -1}});
    } else {
      posts = Meteor.posts.find({userId: this.userId}, {sort:  {"date" : -1}});
    }


    let postsFetched = posts.fetch();
    let postIds = [];
    if(postsFetched.length) {
      postsFetched.forEach((post) => {
        obj = JSON.parse(post.body);
        postIds.push(obj.id)
      })
    }

    let userIds = [];
    if(postsFetched.length) {
      postsFetched.forEach((post) => {
        userIds.push(post.posterId);
        obj = JSON.parse(post.body);
        if(obj.type == 'Follow') {
          userIds.push(obj.followed._id);
        }
      })
    }

    let uniqueUsers = _.uniq(userIds.concat(uniqUserIds));

    let status = Meteor.statuses.find({userId: {$in: uniQuserIdsWithCurrentUser}});

    let likes = Meteor.likes.find({linkedObjectId: {$in: postIds}});
    let comments = Meteor.comments.find({linkedObjectId: {$in: postIds}});
    //let follows = Meteor.follows.find({});

    let fields = {
      'profile.firstName' : 1,
      'profile.lastName' : 1,
      'profile.image': 1
    };
    let users =  Meteor.users.find({_id: {$in: uniqueUsers}}, {fields: fields});

    return [posts, status, likes, comments, users];
  });
});

Meteor.publish('chat.online.users', function () {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let fields = {
      'profile.title': 1,
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.image': 1,
      'profile.firm': 1,
      "profile.jobFunction": 1,
      "profile.jobTitle": 1,
      'status.online': true
    };

    let userIds = [];
    const followUsers = Meteor.follows.find({userId: this.userId, followId:{$ne:this.userId}}, {fields: {followId: 1}}).fetch();
    const followerUsers = Meteor.follows.find({userId:{$ne:this.userId}, followId: this.userId}, {fields: {userId: 1}}).fetch();

    let followUsersIds = [];
    if(followUsers.length) {
      followUsers.forEach((user) => {
        followUsersIds.push(user.followId);
      })
    }

    let followerUsersIds = [];
    if(followerUsers.length) {
      followerUsers.forEach((user) => {
        followerUsersIds.push(user.userId);
      })
    }

    let includeUsersIds =_.intersection(followUsersIds, followerUsersIds)
    let blockedUsersIds = getBlockedUsersIds(this.userId, {hideBlocked : true});

    if(includeUsersIds.length) {
      includeUsersIds.forEach((userId) => {
        if(blockedUsersIds.indexOf(userId) === -1) {
          userIds.push(userId);
        }
      });
    }

    const users = Meteor.users.find(
      {_id: {$in : userIds}, username: {$ne: Telescope.settings.get('admin').username}},
      {fields: fields}
    );

    return [users];
  });
});

Meteor.publish('cityhive.inbox.users', function () {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let fields = {
      'profile.title': 1,
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.image': 1,
    };

    let userIds = [];
    const followUsers = Meteor.follows.find({userId: this.userId, followId:{$ne:this.userId}}, {fields: {followId: 1}}).fetch();
    const followerUsers = Meteor.follows.find({userId:{$ne:this.userId}, followId: this.userId}, {fields: {userId: 1}}).fetch();

    let followUsersIds = [];
    if(followUsers.length) {
      followUsers.forEach((user) => {
        followUsersIds.push(user.followId);
      })
    }

    let followerUsersIds = [];
    if(followerUsers.length) {
      followerUsers.forEach((user) => {
        followerUsersIds.push(user.userId);
      })
    }

    let includeUsersIds =_.intersection(followUsersIds, followerUsersIds)
    let blockedUsersIds = getBlockedUsersIds(this.userId, {hideBlocked : true});

    if(includeUsersIds.length) {
      includeUsersIds.forEach((userId) => {
        if(blockedUsersIds.indexOf(userId) === -1) {
          userIds.push(userId);
        }
      });
    }

    const users = Meteor.users.find(
      {_id: {$in : userIds}, username: {$ne: Telescope.settings.get('admin').username}},
      {fields: fields}
    );

    return [users];
  });
});

Meteor.publish('cityhive.following.users', function () {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let fields = {
      'profile.title': 1,
      'profile.firstName': 1,
      'profile.lastName': 1,
      'profile.image': 1,
    };

    let userIds = [];
    const followUsers = Meteor.follows.find({userId: this.userId}, {fields: {followId: 1}}).fetch();
    let blockedUsersIds = getBlockedUsersIds(this.userId, {hideBlocked : true});

    if(followUsers.length) {
      followUsers.forEach((user) => {
        if(blockedUsersIds.indexOf(user.followId) === -1) {
          userIds.push(user.followId);
        }
      });
    }

    const users = Meteor.users.find(
      {_id: {$in : userIds}, username: {$ne: Telescope.settings.get('admin').username}},
      {fields: fields}
    );

    return [users];
  });
});

Meteor.publish('cityhive.users.directory', function (options) {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    options = options || {};

    if(typeof options.hideBlocked === 'undefined') {
      options.hideBlocked = true;
    }

    check(options.hideBlocked, Boolean);

    let fields = {
      username: 1,
      "profile.firstName": 1,
      "profile.lastName": 1,
      "profile.profession": 1,
      "profile.image": 1,
      'profile.bio': 1,
      'profile.department': 1,
      'profile.firm': 1,
      createdAt: 1,
      'cityhive.membership': 1
    };

    let blockedUsersIds = getBlockedUsersIds(this.userId, options.hideBlocked);

    const users = Meteor.users.find({
      _id : {$nin : blockedUsersIds},
      'emails.verified' : true,
      username: {$ne: Telescope.settings.get('admin').username}},
      {fields: fields});


    return [users];

  });
});

Meteor.publish('cityhive.users.single', function (options) {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let users = [];

    check(options, Object);
    let profileId = options._id;
    check(profileId, String);

    let blockedUsersIds = getBlockedUsersIds(this.userId, true);
    if(blockedUsersIds.indexOf(profileId) != -1) {
      return this.ready();
    }

    let user = Meteor.users.findOne(profileId);

    let fullProfileFields = {
      "profile.title": 1,
      "cityhive.privacyVisibility": 1,
      "cityhive.privacyNotifications": 1,
      username: 1,
      "profile.firstName": 1,
      "profile.lastName": 1,
      "profile.bio": 1,
      "profile.jobFunction": 1,
      "profile.jobTitle": 1,
      "profile.education": 1,
      "profile.image": 1,
      "profile.professionalQualifications": 1,
      "profile.membership": 1,
      "profile.personalEmail": 1,
      "profile.mobileNumber": 1,
      "profile.department": 1,
      "profile.languages": 1,
      'profile.email': 1,
      'profile.firm': 1,
    };

    let basicProfileFields = {
      "profile.title": 1,
      "cityhive.privacyVisibility": 1,
      "cityhive.privacyNotifications": 1,
      username: 1,
      "profile.firstName": 1,
      "profile.lastName": 1,
      "profile.bio": 1,
      "profile.image": 1,
      'profile.email': 1,
      'profile.firm': 1,
      "profile.jobFunction": 1,
      "profile.jobTitle": 1,
      "profile.department": 1,

    };

    if (!user.cityhive.hasOwnProperty("privacyVisibility")) {
      users = Meteor.users.find(
        {_id: profileId},
        {fields: fullProfileFields}
      );
    }

    if (user.cityhive.privacyVisibility == 'show-full-profile') {
      users = Meteor.users.find(
        {_id: profileId},
        {fields: fullProfileFields}
      );
    }

    if (user.cityhive.privacyVisibility == 'show-full-profile-only-to-following') {
      if (Meteor.follows.findOne({userId: profileId, followId: this.userId})) {
        users = Meteor.users.find(
          {_id: profileId},
          {fields: fullProfileFields}
        );
      } else {
        users = Meteor.users.find(
          {_id: profileId},
          {fields: basicProfileFields}
        );
      }
    }

    return [users];
  });
});

Meteor.publish("following", function (options) {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let userId = this.userId;

    if (options && options.userId) {
      check(options.userId, String);
      userId = options.userId;
    }

    let blockedUsersIds = getBlockedUsersIds(this.userId);
    blockedUsersIds.push(userId);

    const following = Meteor.follows.find(
      {userId: userId, followId: {$nin: blockedUsersIds}}
    );

    return [following];
  });
});

Meteor.publish("followers", function (options) {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    let userId = this.userId;

    if (options && options.userId) {
      check(options.userId, String);
      userId = options.userId;
    }

    let blockedUsersIds = getBlockedUsersIds(this.userId);
    blockedUsersIds.push(userId);

    const followers = Meteor.follows.find(
      {userId: {$nin: blockedUsersIds}, followId: userId}
    );

    return [followers];
  });
});

Meteor.publish('allConversation', function (options) {
  const conversations = Meteor.conversations.find({_participants: this.userId});

  const conversationsArray = Meteor.conversations.find({_participants: this.userId}).fetch();

  let conversationIds = [];
  if(conversationsArray.length) {
    conversationsArray.forEach((conversation) => {
      conversationIds.push(conversation._id);
    })
  }

  const participants = Meteor.participants.find({conversationId: {$in: conversationIds}});
  const messages = Meteor.messages.find({conversationId: {$in: conversationIds}});

  return [conversations, participants, messages]
});

Meteor.publish('blockedUsers', function () {
  this.autorun(function (computation) {
    if (!this.userId) {
      return this.ready();
    }

    const blocked = Blocks.find({userId: this.userId})

    return [blocked];
  });
});

function getBlockedUsersIds(thisUserId, hideBlocked = false) {

  // Remove users that current users have blocked
  let blockedUsers = Blocks.find({userId: thisUserId}, {fields: {blockedUserId: 1}}).fetch();
  // Remove users who blocked current user
  let blockedByUsers = Blocks.find({blockedUserId: thisUserId}, {fields: {userId: 1}}).fetch();

  let blockedUsersIds = [];

  if(hideBlocked) {
    if(blockedUsers && blockedUsers.length) {
      blockedUsers.forEach((user) => {
        blockedUsersIds.push(user.blockedUserId);
      });
    }
  }

  if(blockedByUsers && blockedByUsers.length) {
    blockedByUsers.forEach((user) => {
      if (blockedUsersIds.indexOf(user.userId) === -1) {
        blockedUsersIds.push(user.userId);
      }
    });
  }

  return blockedUsersIds;

}
