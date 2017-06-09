import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

    const usersSubscription = Meteor.subscribe('admin.users.edit.single', props.routeParams._id);

    if (usersSubscription.ready()) {

        const data = {
            users: Meteor.users.find({_id: props.routeParams._id}).fetch()
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
