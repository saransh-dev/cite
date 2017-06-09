import Users from 'meteor/nova:users'

const Pages = new Mongo.Collection('pages');

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
  slug: {
    type: String,
    publish: true,
    control: "text",
    unique: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  menuInclude: {
    type: String,
    publish: true,
    insertableIf: isAdmin,
    editableIf: isAdmin,
    defaultValue: 'true',
    control: "select",
    autoform: {
      group: 'admin',
      options: function () {
        return [
          {
            value: true,
            label: 'Yes'
          },
          {
            value: false,
            label: 'No'
          }
        ];
      }
    },
  },
  menuWeight: {
    type: Number,
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
  "customField.field_1": {
    type: String,
    publish: true,
    control: "textarea",
    optional: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  "customField.field_2": {
    type: String,
    publish: true,
    control: "textarea",
    optional: true,
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  "customField.field_3": {
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
  },

});

Pages.attachSchema(schema);

export default Pages;
