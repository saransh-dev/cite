import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const subscription = Meteor.subscribe('allConversation');

    const data = {
        currentUser: Meteor.user(),
        conversations: Meteor.conversations.find().fetch()
    };

    if (subscription.ready()) {
        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
