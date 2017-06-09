import Users from 'meteor/nova:users'

const Articles = new Mongo.Collection('articles');

const isAdmin = function (user) {
  return user.isAdmin;
};

const schema = new SimpleSchema({
  title: {
    type: String,
    publish: true,
    control: "text",
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  createdAt: {
    type: Date,
    publish: true,
  },
  content: {
    type: String,
    publish: true,
    control: "textarea",
    insertableIf: isAdmin,
    editableIf: isAdmin
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

Articles.attachSchema(schema);

export default Articles;
