import Pages from './collection';

const isAdmin = (user) => user.isAdmin;

Pages.smartMethods({
  createName: "pages.create",
  editName: "pages.edit",
  deleteName: 'pages.remove',
  createCallback: function (user, document) {

    if(Pages.findOne({slug: document.slug})) {
      throw new Meteor.Error('page.slug.exists', 'Page slug must be unique, the "' + document.slug + '" slug is already in use.');
    }

    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isAdmin
});
