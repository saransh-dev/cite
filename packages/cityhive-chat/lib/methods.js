User.prototype.findExistingChatConversationWithUsers = function(users, callback) {
  Meteor.call("findExistingChatConversationWithUsers", users, callback);
};
