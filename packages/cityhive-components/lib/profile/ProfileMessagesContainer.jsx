import Options from "meteor/cityhive:admin-options";
import { createContainer } from 'meteor/react-meteor-data';
import ProfileMessages from './messages/ProfileMessages.jsx';

const ProfileMessagesContainer = createContainer(({ params }) => {
    Meteor.subscribe('messagesFor', 'KzJE8K6MskqB3ssHR');

    return {
        messagesFor: Meteor.messages.find()
    };
}, ProfileMessages);

ProfileMessagesContainer.displayName = "ProfileMessagesContainer";

module.exports = ProfileMessagesContainer;
export default ProfileMessagesContainer;