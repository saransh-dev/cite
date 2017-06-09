import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import {FormattedMessage, FormattedRelative} from 'react-intl';
import Users from 'meteor/nova:users';

class UsersProfileListItem extends Component {

    requestFriend(user) {
        user.requestFriendship();
        // let request = Meteor.requests.findOne({userId: user._id, requesterId: Meteor.userId()});
        // request.accept();
    }

    render() {

        const user = this.props.user;

        let articleClass = "users-profile-list-item";

        return (
            <tr>
                <td>{user.username}</td>
                <td><span className="btn btn-primary" onClick={() => this.requestFriend(user)}>Add Friend</span></td>
            </tr>
        )
    }
}

UsersProfileListItem.propTypes = {
    user: React.PropTypes.object.isRequired
};


module.exports = UsersProfileListItem;
export default UsersProfileListItem;