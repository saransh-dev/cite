import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const timelineSubscrition = Meteor.subscribe('timelinePosts');
    const followingSubscrition = Meteor.subscribe('following');
    const followersSubscrition = Meteor.subscribe('followers');

    if (timelineSubscrition.ready() && followingSubscrition.ready() && followersSubscrition.ready()) {

        const data = {
            posts : Meteor.posts.find().fetch(),
            status : Meteor.statuses.find().fetch(),
            users : Meteor.users.find().fetch(),
            follows : Meteor.follows.find().fetch(),
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);