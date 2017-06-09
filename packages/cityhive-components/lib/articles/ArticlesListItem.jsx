import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Helpers} from '../helpers';
import { Link } from 'react-router';
import { FormattedMessage, FormattedRelative } from 'react-intl';

class ArticlesListItem extends Component {

  render() {

    const article = this.props.article;

    let articleClass = "articles-list-item";

    return (
      <div className={articleClass}>

        <div className="articles-list-item-title">
          <Link to={Helpers.getPageUrl(article)} className="articles-list-item-title-link">
            {article.title}
          </Link>
        </div>

        <div className="articles-list-item-meta">
          <div className="articles-list-item-date">
              <div className="posts-item-date">
                  Written on {article.createdAt ? moment(article.createdAt).format('Do MMMM YYYY') :
                      <FormattedMessage id="posts.dateNotDefined"/>}
              </div>
          </div>
        </div>

      </div>
    )
  }
}

ArticlesListItem.propTypes = {
  article: React.PropTypes.object.isRequired
};

ArticlesListItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = ArticlesListItem;
export default ArticlesListItem;