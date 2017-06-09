import React, { PropTypes, Component } from 'react';
import NovaForm from "meteor/nova:forms";
import { Button } from 'react-bootstrap';
import { ModalTrigger } from "meteor/nova:core";
import Articles from 'meteor/cityhive:articles';
import { intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import EditArticleForm from './forms/EditArticleForm';
import {FlashContainer} from "meteor/nova:core";

class AdminArticlesItem extends Component {

  constructor() {
    super();
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  deleteArticle() {
    const article = this.props;
    const deleteArticleConfirmation = "Delete " + article.title + " article?";

    if (window.confirm(deleteArticleConfirmation)) {
      this.context.actions.call('articles.remove', article._id, (error, result) => {
        this.context.messages.flash("Article deleted", "success");
        this.context.events.track("article deleted", {'_id': article._id});
      });
    }
  }

  renderEdit() {

    const article = this.props;

    const component = (
      <ModalTrigger
        label="Edit Article"
        component={<p><FormattedMessage id="admin.articles.create.table.edit"/></p>}
      >
        <div>
          <div className="breadcrumbs">
            <span>Edit Article</span>
          </div>
          <EditArticleForm document={article} />
        </div>
      </ModalTrigger>
    );

    return (
      <div className="item-actions">
        {this.props.currentUser && this.props.currentUser._id === article.userId ? component : ""}
      </div>
    )
  }

  render() {

    const article = this.props;

    return (
        <tr>
          <td key={article.name}>
            <p>{article.title}</p>
          </td>
          <td className="edit">
            {this.renderEdit()}
          </td>
          <td className="delete">
            <p onClick={this.deleteArticle}><FormattedMessage id="admin.articles.create.table.delete"/></p>
          </td>
        </tr>
    )
  }

}

AdminArticlesItem.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default AdminArticlesItem;

