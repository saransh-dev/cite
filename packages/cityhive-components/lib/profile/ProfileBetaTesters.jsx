import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';

class ProfileBetaTesters extends Component {

    displayElement() {
        if(typeof document !== "undefined") {
            return (
                <div className="wrapper">
                    <a className="typeform-share link" href="https://cityhive.typeform.com/to/fjathK" data-mode="1" target="_blank">
                        <img src="/img/ch-beetatesting-banner.png" />
                    </a>
                    <script>{(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()}</script>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="beta-testers">
                {this.displayElement()}
            </div>
        )
    }
}

ProfileBetaTesters.displayName = "ProfileBetaTesters";

module.exports = ProfileBetaTesters;
export default ProfileBetaTesters;