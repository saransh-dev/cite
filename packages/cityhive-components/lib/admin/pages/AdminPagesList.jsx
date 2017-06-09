import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import AdminPagesItem from './AdminPagesItem';
import { FormattedMessage } from 'react-intl';

class AdminPagesList extends Component {

  render() {
    return (
      <div className="admin-pages-list">
        <table className="table table-striped pages-list">
          <thead>
            <tr>
              <th><FormattedMessage id="admin.pages.id"/></th>
              <th><FormattedMessage id="admin.pages.create.table.title"/></th>
              <th><FormattedMessage id="admin.pages.create.table.edit"/></th>
              <th><FormattedMessage id="admin.pages.create.table.delete"/></th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(page => <AdminPagesItem key={page._id} {...page} currentUser={this.props.currentUser}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminPagesList;
