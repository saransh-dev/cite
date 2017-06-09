import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {ListContainer} from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';
import ProfileFollowingComposer from './ProfileFollowingComposer';
import { Link } from 'react-router';

class ProfileFollowing extends Component {

    constructor() {
        super();
        this.state = {
            display: 'following',
        };
    }

    setDisplay(display) {
        this.setState({
            display: display
        });
    }

    tabDisplay() {
        if(this.state.display == 'following') {
            return (
                <div className="network-following profile-dashboard section--grey section--padding section--margin-bottom">
                    {this.followingUsers()}
                </div>
            )
        }
        if(this.state.display == 'followers') {
            return (
                <div className="network-followers profile-dashboard section--grey section--padding">
                    {this.followers()}
                </div>
            )
        }
        if(this.state.display == 'blocked') {
            return (
                <div className="network-blocked profile-dashboard section--grey section--padding">
                    {this.blocked()}
                </div>
            )
        }
    }

    getFollowingElementClasses() {
        let classes = 'profile-your-following-hive';
        if(this.state.display == 'following')  classes = classes + ' active';
        return classes;
    }

    getFollowersElementClasses() {
        let classes = 'profile-your-followers-hive';
        if(this.state.display == 'followers')  classes = classes + ' active';
        return classes;
    }

    getBlockedElementClasses() {
        let classes = 'profile-your-blocked-hive';
        if(this.state.display == 'blocked')  classes = classes + ' active';
        return classes;
    }

    followingUsers() {
        if(Meteor.userId()) {
            let following = this.props.following;

            if(!!following.length) {
                return (
                    <div className="wrapper wrapper-content">
                        <div className="row">
                            {following.map(follower => follower.user() && <Telescope.components.UsersDirectoryListItem user={follower.user()} currentUser={Meteor.user()} key={follower._id}/>)}
                        </div>
                    </div>
                )
            }

        }

    }

    followers() {
        if(Meteor.userId()) {
            let followers = this.props.followers;

            if(!!followers.length) {
                return (
                    <div className="wrapper wrapper-content">
                        <div className="row">
                            {followers.map(follower => {
                                let user = Meteor.users.findOne(follower.userId);
                                if(user) {
                                    return (<Telescope.components.UsersDirectoryListItem user={user} currentUser={Meteor.user()} key={follower._id}/>);
                                }
                            })}
                        </div>
                    </div>
                )
            }
        }

    }

    blocked() {
        if(Meteor.userId()) {
            let blockedUsers = this.props.blocked;

            if(!!blockedUsers.length) {
                return (
                    <div className="wrapper wrapper-content">
                        <div className="row">
                            {blockedUsers.map(blockedUser => {
                                let user = Meteor.users.findOne(blockedUser.blockedUserId);
                                if(user) {
                                    return (<Telescope.components.UsersDirectoryListItem user={user} currentUser={Meteor.user()} key={user._id}/>);
                                }
                            })}
                        </div>
                    </div>
                )
            }
        }
    }

    render() {

        FollowingCount = this.props.ready ? this.props.following.length : 0;
        FollowersCount = this.props.ready ? this.props.followers.length : 0;
        BlockedCount = this.props.ready ? this.props.blocked.length : 0;

        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                {
                    this.props.ready ?
                        (
                            <div>
                                <div className="breadcrumbs">
                                    <i className="iconmoon-cityhive-iconmoon-font-v2-ol_network"></i> <span>My Network</span>
                                </div>
                                <p className="txt-right network-directory-link">Build your hive and find new people <Link activeClassName="active" to="/users/directory" ><span><i className="iconmoon-cityhive-iconmoon-font-v2-ol_messages-copy"></i></span></Link></p>
                                <div className='profile-your-hive network-follow-tabs'>
                                    <div className={this.getFollowingElementClasses()} onClick={() => {this.setDisplay('following')}}>
                                        <img src='/img/network-following.png' className="tab-normal-img"/>
                                        <img src='/img/network-following-selected.png' className="tab-active-img"/>
                                        <div className='counter'>{FollowingCount}</div>
                                        <div className='text'>Following</div>
                                    </div>
                                    <div className={this.getFollowersElementClasses()} onClick={() => {this.setDisplay('followers')}}>
                                        <img src='/img/network-followers.png' className="tab-normal-img"/>
                                        <img src='/img/network-followers-selected.png' className="tab-active-img"/>
                                        <div className='counter'>{FollowersCount}</div>
                                        <div className='text'>Followers</div>
                                    </div>
                                    <div className={this.getBlockedElementClasses()} onClick={() => {this.setDisplay('blocked')}}>
                                        <img src='/img/network-blocked.png' className="tab-normal-img"/>
                                        <img src='/img/network-blocked-selected.png' className="tab-active-img"/>
                                        <div className='counter'>{BlockedCount}</div>
                                        <div className='text'>Blocked</div>
                                    </div>
                                </div>

                                {this.tabDisplay()}

                            </div>
                        )
                        : <p>Loading</p>
                }
            </Telescope.components.Profile>
        );
    }
}

ProfileFollowing.displayName = "ProfileFollowing";

module.exports = ProfileFollowingComposer(ProfileFollowing);

export default ProfileFollowingComposer(ProfileFollowing);