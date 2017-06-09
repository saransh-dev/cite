import { composeWithTracker } from 'react-komposer';
import Pages from 'meteor/cityhive:pages';

function composer(props, onData) {

    const pageSubscription = Meteor.subscribe('cityhive.admin.pageById', props.routeParams._id);

    if (pageSubscription.ready()) {

        const data = {
            page: Pages.findOne({_id: props.routeParams._id})
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
