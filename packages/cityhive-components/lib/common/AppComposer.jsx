import Telescope from 'meteor/nova:lib';
import {Messages} from 'meteor/nova:core';
import { composeWithTracker } from 'react-komposer';
import Events from "meteor/nova:events";
import Options from "meteor/cityhive:admin-options";

function composer(props, onData) {

    const subscriptions = Telescope.subscriptions.map((sub) => Meteor.subscribe(sub.name, sub.arguments));

    let path = props.location.pathname;

    let isProfileSection = (path.split('/')[1] == 'user' || path.split('/')[1] == 'users' || path.split('/')[1] == 'admin');

    if(path == '/') {
        path = 'homepage';
    } else {
        if(path.split('/')[2] == 'messages') {
            path = 'messages';
        } else if(path.split('/')[1] == 'verify-email') {
            path = 'verify-email';
        } else {
            path = path.split('/').pop();
        }
    }

    const data = {
        currentUser: Meteor.user(),
        actions: {call: Meteor.call},
        events: Events,
        messages: Messages,
        options: Options,
        currentPage: path,
        isProfileSection: isProfileSection
    };

    if (!subscriptions.length || _.every(subscriptions, handle => handle.ready())) {
        data.ready = true;
        onData(null, data);
    } else {
        onData(null, {ready: false});
    }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
