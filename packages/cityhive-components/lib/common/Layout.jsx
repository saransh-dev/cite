import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import {FlashContainer} from "meteor/nova:core";

class Layout extends Component {

    render() {

        let classes = 'container main-container ' + (this.props.isProfileSection ? 'user-dashboard-section ' : '') + this.props.currentPage;

        return (
            <div className={classes}>
                <script src="//tinymce.cachefly.net/4.2/tinymce.min.js"></script>

                <div className="home-loading"><img src="/img/cityhive-loading.gif" /></div>


                <Telescope.components.HeadTags />

                <Telescope.components.Header {...this.props}/>

                <div className="main">

                    <span className="spray-mask"></span>
                    <span className="spray-triangle"></span>
                    <span className="spray-bg"></span>
                    
                    <FlashContainer component={Telescope.components.FlashMessages}/>

                    <div className="content clearfix">
                        {this.props.children}
                    </div>

                </div>

                <Telescope.components.Footer {...this.props}/>

                {Meteor.user() ? <Telescope.components.ChatUsersList /> : ''}

            </div>
        )

    }
}

Layout.displayName = "Layout";
module.exports = Layout;