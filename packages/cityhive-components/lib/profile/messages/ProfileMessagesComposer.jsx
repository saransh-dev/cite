import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const usersSubscription = Meteor.subscribe('cityhive.inbox.users');
    const allConversationsSubscription = Meteor.subscribe('allConversation');

    if (usersSubscription.ready() && allConversationsSubscription.ready()) {

        const data = {
            conversations: Meteor.conversations.find().fetch(),
            participants: Meteor.participants.find().fetch(),
            users: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch()
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
