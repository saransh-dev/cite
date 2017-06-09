import React, {PropTypes, Component} from 'react';
import Journals from 'meteor/cityhive:journals';
import {ListContainer} from "meteor/utilities:react-list-container";
import AdminJournalsList from './AdminJournalsList';


class AdminJournals extends Component {

  render(props, context) {

    return (
      <div className="list-journals">
          <div className="breadcrumbs">
              <span>Edit Journals</span>
          </div>
          <div className="user-directory section--grey section--padding clearfix">
              <ListContainer
                  collection={Journals}
                  publication="journals.list"
                  terms={{options: {sort: {createdAt: -1}}}}
                  options={{sort: {createdAt: -1}}}
                  joins={Journals.getJoins()}
                  limit={100}
                  component={AdminJournalsList}
                  listId="journals.list"
                />
          </div>
      </div>
    );

  }

}

AdminJournals.displayName = "AdminJournals";

module.exports = AdminJournals;
export default AdminJournals;