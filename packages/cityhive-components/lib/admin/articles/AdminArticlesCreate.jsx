import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import Articles from 'meteor/cityhive:articles';
import {intlShape} from 'react-intl';
import { FormattedMessage } from 'react-intl';
import CreateArticleForm from './forms/CreateArticleForm';


class AdminArticlesCreate extends Component {

    render(props, context) {

        return (
            <div className="admin-articles-create">
                <div className="breadcrumbs">
                    <span>Create Article</span>
                </div>
                <div className="user-directory section--grey section--padding clearfix">
                    <CreateArticleForm/>
                </div>
            </div>
        );

    }

}

AdminArticlesCreate.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object,
    intl: intlShape
};

AdminArticlesCreate.displayName = "AdminArticlesCreate";

module.exports = AdminArticlesCreate;
export default AdminArticlesCreate;