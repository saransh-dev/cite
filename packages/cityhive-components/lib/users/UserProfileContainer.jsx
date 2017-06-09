import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const usersSingleSubscription = Meteor.subscribe('cityhive.users.single', {_id: props.params._id});
    const followersSubscription = Meteor.subscribe('followers', {userId: props.params._id});
    const followingSubscription = Meteor.subscribe('following', {userId: props.params._id});

    if (usersSingleSubscription.ready() && followersSubscription.ready() && followingSubscription.ready()) {

        const data = {
            user: Meteor.users.findOne({_id: props.params._id}),
            followers: Meteor.follows.find({userId: {$ne: props.params._id}, followId: props.params._id}).fetch(),
            follows: Meteor.follows.find({userId: props.params._id, followId: {$ne: props.params._id}}).fetch()
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);