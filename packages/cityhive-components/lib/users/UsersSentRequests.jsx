import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import {FormattedMessage, FormattedRelative} from 'react-intl';

class UsersSentRequests extends Component {

    cancel(user) {
        const request = this.props.request;
        request.cancel();
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
                   <span className="btn btn-primary" onClick={() => this.cancel(user)}>Canel Request</span>
               </div>
           </div>
        )
    }
}

module.exports = UsersSentRequests;
export default UsersSentRequests;