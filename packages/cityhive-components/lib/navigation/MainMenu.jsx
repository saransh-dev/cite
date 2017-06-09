import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {ListContainer} from "meteor/utilities:react-list-container";
import Pages from 'meteor/cityhive:pages';
import MainMenuList from './MainMenuList';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Search from './Search';
import Social from './Social';
import { Link } from 'react-router';

class MainMenu extends Component {

    render() {
        return (
            <div className="main-menu">
                <div className="clearfix">
                    <div className="left">
                        <div className="links">
                            {/*<ListContainer*/}
                                {/*collection={Pages}*/}
                                {/*publication="pages.list"*/}
                                {/*selector={{menuInclude: 'true'}}*/}
                                {/*options={{sort: {menuWeight: 1}}}*/}
                                {/*joins={Pages.getJoins()}*/}
                                {/*limit={100}*/}
                                {/*component={MainMenuList}*/}
                                {/*listId="pages.list"*/}
                            {/*/>*/}
                            <ul className="main-menu-links">
                                <li><Link activeClassName="active" to="/" >Home</Link></li>
                                <li><Link activeClassName="active" to="/about" >About Us</Link></li>
                                <li><Link activeClassName="active" to="/our-mission" >Our Mission</Link></li>
                                <li><Link activeClassName="active" to="/membership" >Membership</Link></li>
                                <li><Link activeClassName="active" to="/press" >Press</Link></li>
                                <li><Link activeClassName="active" to="/wifc" >WIFC</Link></li>
                                <li><Link activeClassName="active" to="/wifc-pledge" >WIFC Pledge</Link></li>
                                <li><Link activeClassName="active" to="/charity" >Charity</Link></li>
                                <li><Link activeClassName="active" to="/awards" >Awards</Link></li>
                            </ul>
                            <div className="bottom-menu">
                                <ul className="bottom">
                                    <li><Link activeClassName="active" to="/terms" >Terms</Link></li>
                                    <li><Link activeClassName="active" to="/privacy" >Privacy Policy</Link></li>
                                    <li><Link activeClassName="active" to="/cookies" >Cookies</Link></li>
                                    <li><Link activeClassName="active" to="/credits" >Credits</Link></li>
                                </ul>
                                <div className="copyright">
                                    <p>&copy; City Hive Women's Network Ltd<br/>
                                        Registered Company No. 10195767</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <Social/>
                    </div>

                </div>
            </div>
        )
    }
}

MainMenu.displayName = "MainMenu";

module.exports = MainMenu;

export default MainMenu;
