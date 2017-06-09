import Telescope from 'meteor/nova:lib';
import React from 'react';

const ArticlesLoading = props => {
  const Loading = Telescope.components.Loading;
  return <div className="articles-load-more-loading"><Loading/></div>
}

ArticlesLoading.displayName = "ArticlesLoading";

module.exports = ArticlesLoading;