import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import ProfileDashboardComposer from './ProfileDashboardComposer';
import {Link} from 'react-router';
import ProfileBetaTesters from './ProfileBetaTesters';

class ProfileDashboard extends Component {


    render() {
        FollowingCount = this.props.ready ? this.props.following.length : 0;
        FollowersCount = this.props.ready ? this.props.followers.length : 0;
        BlockedCount = this.props.ready ? this.props.blocked.length : 0;

        return (
            <Telescope.components.Profile>{/* TODO: Use HOC instead of wrapper component for better performance */}
                <div className="profile-dashboard">
                    <div className="breadcrumbs">
                        <i className="iconmoon-cityhive-iconmoon-font-v2-ol_home"></i> <span>Home</span>
                    </div>
                    <div className='profile-dashboard-box row'>
                        <div className='profile-dashboard-box-left col-sm-5'>
                            <ProfileBetaTesters/>
                            {/*<label className='profile-label'>Your current status...</label>*/}
                            <Telescope.components.Status/>
                            {/*<label className='profile-label'>What's on your mind?
                                <span>Let the hive know.</span></label>*/}
                            <Telescope.components.StatusTextBox/>
                            <label className='profile-label'>Who's in your hive</label>
                            <div className='profile-your-hive'>
                                <div className='profile-your-following-hive'>
                                    <img src='/img/network-following.png'/>
                                    <div className='counter'>{FollowingCount}</div>
                                    <div className='text'>Following</div>
                                </div>
                                <div className='profile-your-followers-hive'>
                                    <img src='/img/network-followers.png'/>
                                    <div className='counter'>{FollowersCount}</div>
                                    <div className='text'>Followers</div>
                                </div>
                                <div className='profile-your-blocked-hive'>
                                    <img src='/img/network-blocked.png'/>
                                    <div className='counter'>{BlockedCount}</div>
                                    <div className='text'>Blocked</div>
                                </div>
                                <div className="followers-link">
                                    <Link to="/user/following">Go to your network <i
                                        className="fa fa-chevron-right"></i></Link>
                                </div>
                            </div>
                        </div>
                        <Telescope.components.ProfileTimeline/>
                    </div>
                </div>
            </Telescope.components.Profile>
        );
    }
}

ProfileDashboard.displayName = "ProfileDashboard";

// module.exports = ProfileFollowingComposer(ProfileDashboard);
// export default ProfileFollowingComposer(ProfileDashboard);

module.exports = ProfileDashboardComposer(ProfileDashboard);
export default ProfileDashboardComposer(ProfileDashboard);
