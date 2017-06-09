import { composeWithTracker } from 'react-komposer';

function composer(props, onData) {

  let userId =  props.statusForUser ? props.statusForUser : Meteor.userId();
  const statusSubscription = Meteor.subscribe('profileStatus', userId);

  if (statusSubscription.ready()) {

    const data = {
      status: Meteor.statuses.findOne({userId: userId}, {sort: {'createdAt': -1}}),
    };

    data.ready = true;
    onData(null, data);
  } else {
    onData(null, {ready: false});
  }
}

module.exports = composeWithTracker(composer);
export default composeWithTracker(composer);
