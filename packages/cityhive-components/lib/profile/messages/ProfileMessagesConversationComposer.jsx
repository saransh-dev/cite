import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const usersSubscription = Meteor.subscribe('cityhive.inbox.users');
    const viewingConversationSubscription = Meteor.subscribe('viewingConversation', props.routeParams._id);

    if (usersSubscription.ready && viewingConversationSubscription.ready()) {

        const data = {
            conversation : Meteor.conversations.findOne({_id: props.routeParams._id}),
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);