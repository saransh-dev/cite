import React from 'react';
import { IndexLink } from 'react-router';

const Logo = ({logoUrl, siteTitle}) => {
  if (logoUrl) {
    return (
        <IndexLink to={{pathname: "/"}}>
          <img src={logoUrl} alt={siteTitle} className="logo logo-desktop" />
          <img src="/img/logo-mobile.png" alt={siteTitle} className="logo logo-mobile" />
        </IndexLink>
    )
  } else {
    return (
      <h1 className="logo-text">
        <IndexLink to={{pathname: "/"}}>{siteTitle}</IndexLink>
      </h1>
    )
  }
}

Logo.displayName = "Logo";

module.exports = Logo;