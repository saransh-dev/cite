import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Pages from "meteor/cityhive:pages";

const PageOurSupporters = (props, context) => {
  return (
    <DocumentContainer
      collection={Pages}
      publication="pages.single"
      selector={{_id: 'L6vr6KuymAaCp55R4'}}
      terms={props.params}
      joins={Pages.getJoins()}
      component={Telescope.components.Page}
    />
  )
};

Pages.displayName = "PageOurSupporters";

module.exports = PageOurSupporters;