import {Status , StatusComments, Like} from './collection';

const isAdmin = (user) => user.isAdmin;

/*Status.smartMethods({
  createName: "status.create",
  editName: "status.edit",
  deleteName: 'status.remove',
  createCallback: function (user, document) {
    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isAdmin
});*/

StatusComments.smartMethods({
  createName: "statusComments.create",
  editName: "statusComments.edit",
  deleteName: 'statusComments.remove',
  createCallback: function (user, document) {
    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isAdmin
});
/*
Like.smartMethods({
  createName: "Like.create",
  editName: "Like.edit",
  deleteName: 'Like.remove',
  createCallback: function (user, document) {
    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isAdmin
});*/
