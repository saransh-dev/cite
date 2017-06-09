import Users from 'meteor/nova:users';

const Options = new Mongo.Collection('options');

const isAdmin = user => {
  return Users.isAdmin(Meteor.user());
};

const schema = new SimpleSchema({
  optionName: {
    type: String,
    publish: true,
    control: "text",
    insertableIf: isAdmin,
    editableIf: isAdmin
  },
  optionValue: {
    type: String,
    publish: true,
    control: "text",
    insertableIf: isAdmin,
    editableIf: isAdmin
  },

});

Options.attachSchema(schema);

export default Options;
