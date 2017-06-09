import Telescope from 'meteor/nova:lib';
import React from 'react';

export const Helpers = {

  getPageUrl(post, isAbsolute = false) {
    const prefix = isAbsolute ? Telescope.utils.getSiteUrl().slice(0, -1) : "";
    return `${prefix}/news/${post._id}`;
  }

};
