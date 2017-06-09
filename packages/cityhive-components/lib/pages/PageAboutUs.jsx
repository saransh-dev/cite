import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Pages from "meteor/cityhive:pages";

const PageAboutUs = (props, context) => {
  return (
    <DocumentContainer
      collection={Pages}
      publication="pages.single"
      selector={{_id: 'eiN6yDK6cSPr82tzQ'}}
      terms={props.params}
      joins={Pages.getJoins()}
      component={Telescope.components.Page}
    />
  )
};

Pages.displayName = "PageAboutUs";

module.exports = PageAboutUs;