import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { ListContainer } from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';
import { Link } from 'react-router';

const UsersProfile = ({user}, {currentUser}) => {

  const twitterName = Users.getTwitterName(user);

  return (
    <Telescope.components.CanDo action="account.view" displayNoPermissionMessage={true}>
    <div className="page users-profile">
      <Telescope.components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} description={user.profile.bio} />
      <h2 className="page-title">{Users.getDisplayName(user)}</h2>
      <p>{user.profile.bio}</p>
      <ul>
        {twitterName ? <li><a href={"http://twitter.com/" + twitterName}>@{twitterName}</a></li> : null }
        {user.telescope.website ? <li><a href={user.telescope.website}>{user.telescope.website}</a></li> : null }
        <Telescope.components.CanDo document={user} action="users.edit">
          {/*TODO: create helper Users.getEditUrl(url) and replace static url below "/account/test/edit"*/}
          <li><Link to='/account/test/edit'><FormattedMessage id="users.edit_account"/></Link></li>
        </Telescope.components.CanDo>
      </ul>
    </div>
    </Telescope.components.CanDo>
  )
};

UsersProfile.propTypes = {
  user: React.PropTypes.object.isRequired,
};

UsersProfile.contextTypes = {
  currentUser: React.PropTypes.object
};

UsersProfile.displayName = "UsersProfile";

module.exports = UsersProfile;
export default UsersProfile;