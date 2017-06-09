import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import {FormattedMessage, FormattedRelative} from 'react-intl';

class UsersReceivedRequests extends Component {

    deny(user) {
        user.denyFriendshipRequest();
    }

    accept(user) {
        user.acceptFriendshipRequest();
    }

    render() {

        const request = this.props.request;
        const user = request.requester();

        return (
           <div className="row">
               <div className="col-sm-6">
                   {user.username}
               </div>
               <div className="col-sm-6">
                   <span className="btn btn-primary" onClick={() => this.accept(user)}>Accept Request</span>
                   <span className="btn btn-primary" onClick={() => this.deny(user)}>Deny Request</span>
               </div>
           </div>
        )
    }
}


module.exports = UsersReceivedRequests;
export default UsersReceivedRequests;