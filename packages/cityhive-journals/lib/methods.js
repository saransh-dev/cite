import Journals, { JournalComments } from './collection';

const isAdmin = (user) => user.isAdmin;

Journals.smartMethods({
  createName: "journals.create",
  editName: "journals.edit",
  deleteName: 'journals.remove',
  createCallback: function (user, document) {
    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isAdmin
});


if(Meteor.isServer){
   Meteor.methods({
      "checkValidTitle":function(value) {
          return Journals.find({title:{ $regex:value, $options: 'i'}}).count()
      },
      "journalComments.create":function(document) {
         document = _.extend(document, {
          createdAt: new Date(),
          userId: Meteor.userId()
        });
         JournalComments.insert(document);
      },
      'journalComments.delete': function(commentId) {
          JournalComments.remove({_id:commentId});
      },
      "journalComments.update": function(data) {
          JournalComments.update({_id:data.id},{$set:{content: data.content}});
      }
  });
}
