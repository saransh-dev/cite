import { composeWithTracker } from 'react-komposer';
import Blocks from 'meteor/cityhive:user-blocking';

function composer(props, onData) {

    const followersSubscription = Meteor.subscribe('followers');
    const followingSubscription = Meteor.subscribe('following');
    const blocksSubscription = Meteor.subscribe('blockedUsers');

    const data = {
        user: props.user,
        currentUser: props.currentUser,
        key: props.user._id,
        followers: Meteor.follows.find({userId: {$ne: Meteor.userId()}, followId: Meteor.userId()}).fetch(),
        follows: Meteor.follows.find({userId: Meteor.userId(), followId: {$ne: Meteor.userId()}}).fetch(),
        blocked: Blocks.find({userId: Meteor.userId()}).fetch()
    };

    if (followersSubscription.ready() && followingSubscription.ready() && blocksSubscription.ready) {

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
