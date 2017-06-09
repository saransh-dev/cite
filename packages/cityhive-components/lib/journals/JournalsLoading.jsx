import Telescope from 'meteor/nova:lib';
import React from 'react';

const JournalsLoading = props => {
  const Loading = Telescope.components.Loading;
  return <div className="journals-load-more-loading"><Loading/></div>
}

JournalsLoading.displayName = "JournalsLoading";

module.exports = JournalsLoading;