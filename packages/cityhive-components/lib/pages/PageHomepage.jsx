import Telescope from 'meteor/nova:lib';
import React, {Component} from 'react';
import {DocumentContainer} from "meteor/utilities:react-list-container";
import Pages from "meteor/cityhive:pages";

class PageHomepage extends Component{

    getOptionHomepage() {
        const options = this.context.options;
        return options.getOption('homepage');
    }

    render() {
        return (
            <DocumentContainer
                collection={Pages}
                publication="pages.single"
                selector={{_id: this.getOptionHomepage()}}
                terms={this.props.params}
                joins={Pages.getJoins()}
                component={Telescope.components.Page}
            />
        )
    }

}

PageHomepage.contextTypes = {
    options: React.PropTypes.object
};

PageHomepage.displayName = "PageHomepage";

module.exports = PageHomepage;
export default PageHomepage;