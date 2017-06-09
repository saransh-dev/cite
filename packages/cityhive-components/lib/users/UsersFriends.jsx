import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import {FormattedMessage, FormattedRelative} from 'react-intl';

class UsersFriends extends Component {

    unfriend(user) {
        user.unfriend();
    }

    render() {

        const friend = this.props.friend;
        const user = this.props.user;

        return (
           <div className="row">
               <div className="col-sm-6">
                   {user.username}
               </div>
               <div className="col-sm-6">
                   <span className="btn btn-primary" onClick={() => this.unfriend(user)}>Unfriend</span>
               </div>
           </div>
        )
    }
}


module.exports = UsersFriends;
export default UsersFriends;