import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import {FormattedMessage, FormattedRelative} from 'react-intl';

class UsersFriends extends Component {

    unfollow(user) {
        user.unfollow();
        // const request = this.props.request;
        // request.cancel();
        // console.log(user._id)
        // console.log(Meteor.requests.find().fetch())
        // let request = Meteor.requests.findOne({userId: user._id})
        // request.cancel();
    }

    render() {

        const follower = this.props.follower;
        const user = this.props.follower.user();

        return (
           <div className="row">
               <div className="col-sm-6">
                   {user.profile.firstName + ' ' + user.profile.lastName}
               </div>
               <div className="col-sm-6">
                   <span className="btn btn-primary" onClick={() => this.unfollow(user)}>Unfollow</span>
               </div>
           </div>
        )
    }
}


module.exports = UsersFriends;
export default UsersFriends;