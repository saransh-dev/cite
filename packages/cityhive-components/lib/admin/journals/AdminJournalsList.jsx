import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import AdminJournalsItem from './AdminJournalsItem';
import { FormattedMessage } from 'react-intl';

class AdminJournalsList extends Component {

  render() {
    return (
      <div className="admin-journals-list">
        <table className="table table-striped journals-list">
          <thead>
            <tr>
              <th><FormattedMessage id="admin.journals.create.table.title"/></th>
              <th><FormattedMessage id="admin.journals.create.table.edit"/></th>
              <th><FormattedMessage id="admin.journals.create.table.delete"/></th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(journal => <AdminJournalsItem key={journal._id} {...journal} currentUser={this.props.currentUser}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminJournalsList;
