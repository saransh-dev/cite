import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Journals from "meteor/cityhive:journals";

const JournalsSingle = (props, context) => {
  return (
    <DocumentContainer
      collection={Journals}
      publication="journals.single"
      selector={{_id: props.params._id}}
      terms={props.params}
      joins={Journals.getJoins()}
      component={Telescope.components.JournalsPage}
    />
  )
};

JournalsSingle.displayName = "JournalsSingle";

module.exports = JournalsSingle;