import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const usersSub = Meteor.subscribe('chat.online.users');
    const followersSubscription = Meteor.subscribe('followers');
    const followingSubscription = Meteor.subscribe('following');
    const allConversationsSubscription = Meteor.subscribe('allConversation');

    if (usersSub.ready() && followersSubscription.ready() && followingSubscription.ready() && allConversationsSubscription.ready()) {

        let fields = {
            'profile.firstName': 1,
            'profile.lastName': 1,
            'profile.image': 1,
            'status.online': 1
        };

        const data = {
            users: Meteor.users.find().fetch(),
            following: Meteor.follows.find({userId: Meteor.userId(), followId: {$ne: Meteor.userId()}}).fetch(),
            followers: Meteor.follows.find({userId: {$ne: Meteor.userId()}, followId: Meteor.userId()}).fetch(),
            conversations: Meteor.conversations.find({_participants: Meteor.userId()}).fetch()
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);