import './components.js';

Meteor.methods({
  'feed.follow'(followed, userId) {
  	followsId = Meteor.follows.findOne({userId: userId, followId: followed._id})._id

  	Meteor.user().feed().addPost(JSON.stringify({id: followsId, type: 'Follow', followed}));

    let followedUser = Meteor.users.findOne({_id: followed._id});
    if(Meteor.follows.findOne({userId: userId, followId: followed._id}) && !Meteor.follows.findOne({userId: followed._id, followId: userId})) {
      console.log(followedUser);
      followedUser.feed().addPost(JSON.stringify({id: followsId, type: 'Follow', followed}));
    }

    Meteor.user().followersAsUsers().map(user => {
      		user.feed().addPost(JSON.stringify({id: followsId, type: 'Follow', followed}));
    })
  }
});
