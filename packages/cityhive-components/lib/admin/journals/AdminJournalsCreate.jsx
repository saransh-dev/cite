import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import Journals from 'meteor/cityhive:journals';
import {intlShape} from 'react-intl';
import { FormattedMessage } from 'react-intl';
import CreateJournalForm from './forms/CreateJournalForm';


class AdminJournalsCreate extends Component {

    render(props, context) {

        return (
            <div className="admin-journals-create">
                <div className="breadcrumbs">
                    <span>Create Journal</span>
                </div>
                <div className="user-directory section--grey section--padding clearfix">
                    <CreateJournalForm/>
                </div>
            </div>
        );

    }

}

AdminJournalsCreate.contextTypes = {
    currentUser: React.PropTypes.object,
    messages: React.PropTypes.object,
    intl: intlShape
};

AdminJournalsCreate.displayName = "AdminJournalsCreate";

module.exports = AdminJournalsCreate;
export default AdminJournalsCreate;