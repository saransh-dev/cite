import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import Pages from 'meteor/cityhive:pages';
import {intlShape} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import CreatePageForm from './forms/CreatePageForm';

class AdminPagesCreate extends Component {

    render(props, context) {

        return (
            <div className="admin-pages-create">
                <div className="breadcrumbs">
                    <span>Create Page</span>
                </div>
                <div className="user-directory section--grey section--padding clearfix">
                    <CreatePageForm/>
                </div>
            </div>
        );

    }

}

AdminPagesCreate.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object,
    intl: intlShape
};

AdminPagesCreate.displayName = "AdminPagesCreate";

module.exports = AdminPagesCreate;
export default AdminPagesCreate;