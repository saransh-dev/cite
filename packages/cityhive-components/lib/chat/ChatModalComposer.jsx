import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const viewingConversationSubscription = Meteor.subscribe('viewingConversation', props.conversationId);

    if (viewingConversationSubscription.ready()) {

        const data = {
            //users: Meteor.users.find({}, {fields: fields}).fetch(),
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);