import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import NovaForm from "meteor/nova:forms";
import Users from 'meteor/nova:users';
import { withRouter } from 'react-router';

class UsersEdit extends Component {

  componentDidMount() {
    $('select[name="cityhive.membership"]').attr('disabled', 'disabled');
  }

  render() {
    const user = this.props.user;
    const currentUser = this.props.currentUser;
    const router = this.props.router;
    console.log(this);
    return (
        <Telescope.components.CanDo
            action="users.edit"
            document={user}
            displayNoPermissionMessage={true}
        >
          <div className="page users-edit-form section--grey section--padding">
            <h3 className="page-title users-edit-form-title"><FormattedMessage id="users.edit_account"/></h3>
            <NovaForm
                currentUser={currentUser}
                collection={Meteor.users}
                document={user}
                methodName="users.edit"
                errorCallback={(document, error)=> {
                    $(window).scrollTop(0);
                }}
              successCallback={(user)=>{
                  this.context.messages.flash(this.context.intl.formatMessage({id: "users.edit_success"}, {name: Users.getDisplayName(user)}), 'success')
                  router.push({pathname: '/user/profile/' + Meteor.userId() });
                }}
            />
          </div>
        </Telescope.components.CanDo>
    )
  }
}


UsersEdit.propTypes = {
  user: React.PropTypes.object.isRequired,
};

UsersEdit.contextTypes = {
  messages: React.PropTypes.object,
  intl: intlShape
};

UsersEdit.displayName = "UsersEdit";

module.exports = withRouter(UsersEdit);
export default withRouter(UsersEdit);
