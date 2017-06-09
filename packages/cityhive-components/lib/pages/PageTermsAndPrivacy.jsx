import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Pages from "meteor/cityhive:pages";

const PageTermsAndPrivacy = (props, context) => {
  return (
    <DocumentContainer
      collection={Pages}
      publication="pages.single"
      selector={{_id: '665BR7ny2NNLFKLB5'}}
      terms={props.params}
      joins={Pages.getJoins()}
      component={Telescope.components.Page}
    />
  )
};

Pages.displayName = "PageTermsAndPrivacy";

module.exports = PageTermsAndPrivacy;