import { LikeableModel, Likes } from 'meteor/socialize:likeable';
import { CommentableModel } from 'meteor/socialize:commentable';
import { Post } from 'meteor/socialize:feed';
import Users from 'meteor/nova:users'

const Status = BaseModel.extendAndSetupCollection('statuses');

const isLoggedIn = user => !!user;
const isOwner = (user, document) => user._id === document.userId;
const isAdmin = (user) => user.isAdmin;

Status.appendSchema({
  createdAt: {
    type: Date,
    publish: true,
  },
  content: {
    type: String,
    publish: true,
    control: "textarea",
    insertableIf: Users.isAdmin,
    editableIf: Users.isAdmin
  },
  visible: {
    type: String,
    publish: true,
    control: "textarea",
    insertableIf: Users.isAdmin,
    editableIf: Users.isAdmin
  },
  userId: {
    type: String,
    publish: true,
    join: {
      collection: () => Meteor.users,
      joinAs: "user",
      fields: ["_id", "username"]
    }
  }
});

//Status.attachSchema(schema);



Meteor.methods({
  'status.insert'(data) {

    success = Meteor.statuses.insert({
      content: data.content,
      visible: data.visible,
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    if (success) {
      Meteor.user().feed().addPost(JSON.stringify({id: success, type: 'ChangeStatus', content: data.content}));
      if (data.visible != 3) {
        followers = Meteor.user().followersAsUsers().map(user => {
          user.feed().addPost(JSON.stringify({id: success, type: 'ChangeStatus', content: data.content}));
        })
      }
    }
  },
  'status.like'(data) {

    let status = Meteor.statuses.findOne({_id: data, 'like.userId': Meteor.userId()});

    if (status) {
      status = Meteor.statuses.findOne({_id: data});
      status.like.splice([getLikeArrayNumber(status.like)],1)
      Meteor.statuses.update({_id: data}, {$set: {'like': status.like}})
      return;
    }

    status = Meteor.statuses.findOne({_id: data});
    if (!status.like)
      status.like = [];
    status.like.push({userId: Meteor.userId()})
    Meteor.statuses.update({_id: data}, {$set: {'like': status.like}})
  },
});

/*function getLikeArrayNumber (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].userId == Meteor.userId())
      return i;
  };
}*/

const StatusComments = new Mongo.Collection('statusComments');
const schema2 = new SimpleSchema({
  createdAt: {
    type: Date,
    publish: true,
  },
  statusId: {
    type: String,
    publish: true,
  },
  content: {
    type: String,
    publish: true,
    control: "textarea",
    insertableIf: Users.isAdmin,
    editableIf: Users.isAdmin
  },
  username: {
    type: String,
    publish: true,
  },
  userId: {
    type: String,
    publish: true,
    join: {
      collection: () => Meteor.users,
      joinAs: "user",
      fields: ["_id", "username"]
    }
  }
});
StatusComments.attachSchema(schema2);



Meteor.methods({
  'statusComments.insert'(data) {
    StatusComments.insert({
      createdAt: new Date(),
      statusId: data.statusId,
      content: data.content,
      username: Meteor.user().username,
      userId: Meteor.userId()
    });
  }
});
/*
const Like = new Mongo.Collection('like');
const schema3 = new SimpleSchema({
  createdAt: {
    type: Date,
    publish: true,
  },
  parentType: {
    type: String,
    publish: true,
  },
  parentId: {
    type: String,
    publish: true,
  },
  userId: {
    type: String,
    publish: true,
    join: {
      collection: () => Meteor.users,
      joinAs: "user",
      fields: ["_id", "username"]
    }
  }
});
Like.attachSchema(schema3);



Meteor.methods({
  'likeMeteor.statuses.insert'(data) {



    let status = Like.findOne({parentType: data.type,parentId: data.id, userId: Meteor.userId()});

    if (status) {
      Like.remove({parentType: data.type,parentId: data.id, userId: Meteor.userId()});
      return;
    }


    // console.log(data)
    Like.insert({
      createdAt: new Date(),
      parentType: data.type,
      parentId: data.id,
      userId: Meteor.userId()
    });
  }
});
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('like', function tasksPublication() {
    return Like.find();
  });
}*/

LikeableModel.makeLikeable(Status, "status");
LikeableModel.makeLikeable(Follow, "follow");
CommentableModel.makeCommentable(Status, "status");
CommentableModel.makeCommentable(Follow, "follow");
export {StatusComments, Status/*, Like*/};
