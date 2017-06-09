import {Status , StatusComments/*, Like*/} from '../collection.js';

//Status.smartPublish("status.list");
//Status.smartPublish("status.single");



StatusComments.smartPublish("statusComments.list");
StatusComments.smartPublish("statusComments.single");


//Like.smartPublish("Like.list");
//Like.smartPublish("Like.single");

  // Meteor.publish('TimelinePosts', function tasksPublication() {
  //   return Meteor.posts.find();
  // });


// followers = Meteor.follows.find({userId: {$ne: this.userId}, followId: this.userId}).fetch();
// following = Meteor.follows.find({userId: this.userId, followId: {$ne: this.userId}}).fetch();
// follower = followers.concat(following);

// Meteor.publish('status', function tasksPublication() {
//   return Meteor.statuses.find({});
// });
// Meteor.publish('myStatus', function tasksPublication() {
//   return Meteor.statuses.find({userId: this.userId});
// });
//
// Meteor.publish('likes', function tasksPublication() {
//   return Meteor.likes.find({});
// });
// //
// Meteor.publish('comments', function tasksPublication() {
//   return Meteor.comments.find({});
// });
//
// Meteor.publish('users', function tasksPublication() {
//   let fields = {
//     'profile.firstName' : 1,
//     'profile.lastName' : 1,
//   };
//   return Meteor.users.find({}, {fields: fields});
// });
