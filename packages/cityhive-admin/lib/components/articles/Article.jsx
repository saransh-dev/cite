import React, {PropTypes, Component} from 'react';
import NovaForm from "meteor/nova:forms";
import {Button} from 'react-bootstrap';
import {ModalTrigger} from "meteor/nova:core";
import Users from 'meteor/nova:users';
import Articles from 'meteor/cityhive:articles';
import { FormattedMessage, intlShape } from 'react-intl';

class Article extends Component {

  constructor() {
    super();
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  deleteArticle() {
    const article = this.props;
    const deletePageConfirm = "Delete " + article.title + " article?";

    if (window.confirm(deletePageConfirm)) {
      this.context.actions.call('articles.remove', article._id, (error, result) => {
        this.context.messages.flash("Article deleted", "success");
        this.context.events.track("Article deleted", {'_id': article._id});
      });
    }
  }

  renderEdit() {

    const article = this.props;

    const component = (
      <ModalTrigger
        label="Edit Article"
        component={<Button bsStyle="primary">Edit Article</Button>}
      >
        <NovaForm
          collection={Articles}
          currentUser={this.props.currentUser}
          document={article}
          methodName="articles.edit"
        />
      </ModalTrigger>
    );

    return (
      <div className="item-actions">
        {this.props.currentUser && this.props.currentUser._id === article.userId || Users.isAdmin() ? component : ""}
      </div>
    )
  }

  render() {

    const article = this.props;

    return (
      <div key={article.name} style={{paddingBottom: "15px", marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
        <h2>{article.title}</h2>
        <p>{article.review} – by <strong>{article.user && article.user.username}</strong></p>
        {this.renderEdit()}
        <Button bsStyle="primary" onClick={this.deleteArticle}>Delete Article</Button>
      </div>
    )
  }

}

Article.contextTypes = {
  currentUser: React.PropTypes.object,
  actions: React.PropTypes.object,
  events: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

export default Article;
