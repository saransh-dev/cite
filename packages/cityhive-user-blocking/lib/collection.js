const Blocks = new Mongo.Collection('cityhive-blocks');

const isLoggedIn = user => !!user;
const isOwner = (user, document) => user._id === document.userId;

const schema = new SimpleSchema({
  userId: {
    type: String,
    regEx:SimpleSchema.RegEx.Id,
    publish: true,
    control: "text",
    insertableIf: isLoggedIn,
    editableIf: isOwner
  },
  blockedUserId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    index: 1,
    publish: true,
    control: "text",
    insertableIf: isLoggedIn,
    editableIf: isOwner
  },
  date: {
    type: Date,
    autoValue: function() {
      if(this.isInsert){
        return new Date();
      }
    },
    index: -1,
    denyUpdate:true
  }
});

Blocks.attachSchema(schema);

export default Blocks;
