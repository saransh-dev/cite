import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Pages from "meteor/cityhive:pages";

const PageContactUs = (props, context) => {
  return (
    <DocumentContainer
      collection={Pages}
      publication="pages.single"
      selector={{_id: 'DRqfYTYbacRdPZ2pD'}}
      terms={props.params}
      joins={Pages.getJoins()}
      component={Telescope.components.Page}
    />
  )
};

Pages.displayName = "PageContactUs";

module.exports = PageContactUs;