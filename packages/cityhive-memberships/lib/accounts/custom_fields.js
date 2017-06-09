import Telescope from 'meteor/nova:lib';
import Users from 'meteor/nova:users';
import PublicationUtils from 'meteor/utilities:smart-publications';
import Membership from './controls/Membership';

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

// add new fields

Users.addField(
  [
    {
      fieldName: 'cityhive.membership',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: {
          name: "membership",
          label: "Membership",
          order: 4
        },
        autoform: {
          options: [
            {
              label: 'Basic',
              value: 'free'
            },
            {
              label: 'Corporate',
              value: 'corporate'
            },
            {
              label: 'Recruiter',
              value: 'recruiter'
            }
          ]
        },
      }
    },
  ]
);

PublicationUtils.addToFields(Users.publishedFields.list, [
  'cityhive.membership',
]);
