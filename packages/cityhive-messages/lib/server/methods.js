Meteor.methods({
  "findExistingMessageConversationWithUsers": function(users) {
    check(users, [String]);

    users.push(Meteor.userId());

    var conversation = Conversation.collection.findOne({isChat: false, _participants:{$size:users.length, $all:users}});

    return conversation && conversation._id;
  }
});
