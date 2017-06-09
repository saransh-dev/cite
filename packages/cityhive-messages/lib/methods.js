User.prototype.findExistingMessageConversationWithUsers = function(users, callback) {
  Meteor.call("findExistingMessageConversationWithUsers", users, callback);
};
