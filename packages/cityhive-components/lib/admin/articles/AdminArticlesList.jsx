import { ListContainer } from "meteor/utilities:react-list-container";
import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import AdminArticlesItem from './AdminArticlesItem';
import { FormattedMessage } from 'react-intl';

class AdminArticlesList extends Component {

  render() {
    return (
      <div className="admin-articles-list">
        <table className="table table-striped articles-list">
          <thead>
            <tr>
              <th><FormattedMessage id="admin.articles.create.table.title"/></th>
              <th><FormattedMessage id="admin.articles.create.table.edit"/></th>
              <th><FormattedMessage id="admin.articles.create.table.delete"/></th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(article => <AdminArticlesItem key={article._id} {...article} currentUser={this.props.currentUser}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminArticlesList;
