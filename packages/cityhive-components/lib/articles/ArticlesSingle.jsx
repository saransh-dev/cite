import Telescope from 'meteor/nova:lib';
import React from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Articles from "meteor/cityhive:articles";

const ArticlesSingle = (props, context) => {
  return (
    <DocumentContainer
      collection={Articles}
      publication="articles.single"
      selector={{_id: props.params._id}}
      terms={props.params}
      joins={Articles.getJoins()}
      component={Telescope.components.ArticlesPage}
    />
  )
};

ArticlesSingle.displayName = "ArticlesSingle";

module.exports = ArticlesSingle;