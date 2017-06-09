import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import Options from 'meteor/cityhive:admin-options';
import {IntlProvider, intlShape} from 'react-intl';
import {ListContainer} from "meteor/utilities:react-list-container";
import AdminOptionsList from './AdminOptionsList';

class AdminOptions extends Component {

    render() {
        return (
            <div className="admin-options">
                <div className="breadcrumbs">
                    <span>Edit Options</span>
                </div>
                <div className="user-directory section--grey section--padding clearfix">
                    <ListContainer
                        collection={Options}
                        publication="options.list"
                        limit={100}
                        component={AdminOptionsList}
                        listId="options.list"
                    />
                </div>
            </div>
        )
    }

}

AdminOptions.displayName = "AdminOptions";

module.exports = AdminOptions;
export default AdminOptions;