import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import HeaderComposer from "./HeaderComposer";
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

class Header extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        this.state = {
            width: '',
            height: ''
        }
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        if(typeof window !== "undefined") {
            window.addEventListener("resize", this.updateDimensions);
        }
    }

    componentWillUnmount() {
        if(typeof window !== "undefined") {
            window.removeEventListener("resize", this.updateDimensions);
        }
    }

    updateDimensions() {
        if(typeof window !== "undefined") {
            this.setState({width: $(window).width(), height: $(window).height()});
        }
    }


    toggleProfileMenu(e) {
        let width = this.state.width;
        if(width < 1201 && $('#react-app > .user-dashboard-section').length) {
            $('.sidebar-slide-out').toggleClass('active');
            $('header.header .profile .image').toggleClass('active');
            $('body').toggleClass('active-dashboard-menu');
            e.preventDefault()
        }        
    }

    toggleMainMenu() {
        let $mainMenu = $('.main-menu, .main-menu-trigger');
        $mainMenu.toggleClass('active');
        $('.main-menu').find('a').on('click', function () {
            $mainMenu.removeClass('active');
        });

        $(document).mouseup(function (e)
        {
            var container = $mainMenu;

            if (!container.is(e.target)
                && container.has(e.target).length === 0)
            {
                container.removeClass('active');
            }
        });
    }

    /*
    toggleProfileMenu() {
        let $profile = $('.header .profile');
        $profile.toggleClass('active');
        $profile.find('a').on('click', function () {
            $profile.removeClass('active');
        });

        $(document).mouseup(function (e)
        {
            var container = $profile;

            if (!container.is(e.target)
                && container.has(e.target).length === 0)
            {
                container.removeClass('active');
            }
        });
    }
    */

    headerNotifications() {
        let i = 0;
        const conversations = this.props.conversations;
        conversations.forEach(function (conversation) {
            if(conversation.lastMessage() && conversation.isUnread()) {
                i++;
            }
        });

        if(i) {
            return (
                <div key="new-message"><Link to='/user/messages' activeClassName='active'>{i} new {i > 1 ? 'messages' : 'message'}.</Link></div>
            )
        }
    }

    logout(e) {
        e.preventDefault();
        Meteor.logout();
        browserHistory.push('/');
    }

    signInLink() {
        if(Meteor.userId()) {
            return (
                <div className="sign-out">
                    <a href="#" onClick={this.logout}>Sign Out</a>
                </div>
            )
        } else {
            return (
                <div className="sign-in">
                    <Link activeClassName="active" to="/sign-in">Sign In</Link>
                </div>
            )
        }
    }

    profileLink(){
        if(Meteor.userId()) {
            return (
              <div className="profile">
              <Link activeClassName="active" to="/user/dashboard" onClick={this.toggleProfileMenu}><label>Account</label></Link>
                  <Link activeClassName="active" to="/user/dashboard" onClick={this.toggleProfileMenu}>
                <div className="image">
                        {
                            Meteor.userId() ?
                                <img src={this.userImageSrc(Meteor.user())} alt="Profile" className="img-circle" />
                                : <img src="/img/profile-desktop.png" alt="Profile" className="profile-icon" />
                        }
                </div>
                  </Link>
                </div>
            )
        }
    }

    viewDashboardLink() {
        if(Meteor.userId()) {
            return (
                <div className="view-dashboard">
                    <Link to="/user/dashboard">Dashboard</Link>
                </div>
                );
        }
    }

    signUpLink() {
        if(!Meteor.userId()) {
            return (
                <div className="sign-up">
                    <Link activeClassName="active" to="/sign-up">Sign Up</Link>
                </div>
            )
        }
    }

    userImageSrc(user) {
        let imageSrc = '';
        if(user && user.profile) {
            imageSrc = user.profile.image ? user.profile.image : Telescope.settings.get('defaultProfileImage')
        }
        return imageSrc;
    }

    render() {
        const logoUrl = Telescope.settings.get("logoUrl");
        const siteTitle = Telescope.settings.get("title", "CityHive");
        const tagline = Telescope.settings.get("tagline");

        return (

            <div className="main-wrapper navbar navbar-default navbar-fixed-top">

                <div className="header-wrapper">

                    <div className="container">

                        <header className="header">

                        <div className="row">
                            <div className="col-sm-3">
                                <Telescope.components.Logo logoUrl="/img/logo-desktop.png" siteTitle={siteTitle}/>
                            </div>
                            <div className="col-sm-4"></div>
                            <div className="col-sm-5 txt-right">
                                {this.signInLink()}
                                {this.signUpLink()}
                                {this.profileLink()}
                                <div className="main-menu-trigger" onClick={this.toggleMainMenu}>
                                    <label>Menu</label>
                                    <div>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>                                                               
                            </div>
                        </div>

                        </header>

                    </div>

                </div>

                <div className="main-menu-wrapper">
                    <Telescope.components.MainMenu/>
                </div>

            </div>

        )
    }
}

Header.displayName = "Header";

module.exports = HeaderComposer(Header);
