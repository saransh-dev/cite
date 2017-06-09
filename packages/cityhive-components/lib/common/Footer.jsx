import React from 'react';
import {browserHistory} from 'react-router';
import { Link } from 'react-router';

const Footer = props => {
  return (
    <div className="footer">
        <div className="container">
            <div className="row">

            <div className="col-sm-5 footer-column-one">
                <span>© City Hive Women's Network Ltd   /   Registered Company No. 10195767</span>
                <ul className="footer-menu">
                    <li><Link activeClassName="active" to="/terms" >Terms</Link></li>
                    <li><Link activeClassName="active" to="/privacy" >Privacy Policy</Link></li>
                    <li><Link activeClassName="active" to="/cookies" >Cookies</Link></li>
                    <li><Link activeClassName="active" to="/credits" >Credits</Link></li>
                </ul>
            </div>
            <div className="col-sm-2 footer-column-two">
                <img src="/img/logo-footer.png"/>
            </div>
            <div className="col-sm-5 footer-column-three">
                <span>Join our hive</span>
                <ul className="footer-socials">
                    <li><a href="https://www.facebook.com/TheCityHive" target="_blank"><i className="fa fa-facebook-square"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/cityhive" target="_blank"><i className="fa fa-linkedin-square"></i></a></li>
                    <li><a href="https://twitter.com/TheCityHive" target="_blank"><i className="fa fa-twitter-square"></i></a></li>
                </ul>
            </div>
            </div>
        </div>
    </div>
  )
};

Footer.displayName = "Footer";

module.exports = Footer;