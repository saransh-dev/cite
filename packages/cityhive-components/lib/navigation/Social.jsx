import React from 'react';

const Social = () => {

    return (
        <ul className="social">
            <li><a href="https://www.linkedin.com/company/cityhive" target="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i><span>Connect with us</span></a></li>
            <li><a href="https://twitter.com/TheCityHive" target="_blank"><i className="fa fa-twitter-square" aria-hidden="true"></i><span>Follow us</span></a></li>
            <li><a href="https://www.linkedin.com/company/cityhive" target="_blank"><i className="fa fa-facebook-square" aria-hidden="true"></i><span>Follow us</span></a></li>
        </ul>
    )
};

Social.displayName = "Social";

module.exports = Social;

export default Social;
