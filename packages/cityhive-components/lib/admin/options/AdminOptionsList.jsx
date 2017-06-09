import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import AdminOptionsItem from './AdminOptionsItem';
import { FormattedMessage } from 'react-intl';

class AdminOptionsList extends Component {

  render() {
    return (
      <div className="admin-options-list">
        <table className="table table-striped options-list">
          <thead>
            <tr>
              <th><FormattedMessage id="options.optionName"/></th>
              <th><FormattedMessage id="options.optionValue"/></th>
              <th><FormattedMessage id="admin.options.edit"/></th>
              <th><FormattedMessage id="admin.options.delete"/></th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(option => <AdminOptionsItem key={option._id} {...option} currentUser={this.props.currentUser}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminOptionsList;
