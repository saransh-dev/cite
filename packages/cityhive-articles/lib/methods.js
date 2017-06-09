import Articles from './collection';

const isAdmin = (user) => user.isAdmin;

Articles.smartMethods({
  createName: "articles.create",
  editName: "articles.edit",
  deleteName: 'articles.remove',
  createCallback: function (user, document) {
    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isAdmin
});
