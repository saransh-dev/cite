import Users from 'meteor/nova:users'

const Journals = new Mongo.Collection('journals');

const isAdmin = function (user) {
  return user.isAdmin;
};

const moduleSchema = new SimpleSchema({
  moduleType: {
    type: String,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  value:{
    type:[String],
    insertableIf: isAdmin,
    editableIf: isAdmin
  }
});

const schema = new SimpleSchema({
  title: {
    type: String,
    publish: true,
    control: "text",
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  author: {
    type: String,
    publish: true,
    control: "text",
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  category: {
    type: String,
    publish: true,
    control: "select",
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  featuredImage: {
    type: String,
    publish: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  featuredJournal: {
    type: Boolean,
    publish: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  createdAt: {
    type: Date,
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
  },
  slug: {
    type: String,
    publish: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  modules: {
    type: [moduleSchema],
    publish: true,
     insertableIf: isAdmin,
    editableIf: isAdmin
  },
  commentsVisibility: {
    type: Boolean,
    publish: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  }
});

Journals.attachSchema(schema);

const JournalComments = new Mongo.Collection('journalComments');

const schema2 = new SimpleSchema({
  createdAt: {
    type: Date,
    publish: true,
  },
  journalId: {
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

JournalComments.attachSchema(schema2);

export default Journals;
export {JournalComments};
