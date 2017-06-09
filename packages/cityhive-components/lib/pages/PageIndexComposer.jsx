import {composeWithTracker} from 'react-komposer';
import Pages from 'meteor/cityhive:pages';

function composer(props, onData) {

    const pagesSubscription = Meteor.subscribe('cityhive.pageBySlug', props.params.splat);

    if (pagesSubscription.ready()) {

        const data = {
            page: Pages.findOne({slug: props.params.splat}),
        };

        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);