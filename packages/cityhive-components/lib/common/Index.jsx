import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';

class Index extends Component {

    render() {
        return <Telescope.components.PageHomepage />;
    }
}

Index.displayName = "Index";

module.exports = Index;