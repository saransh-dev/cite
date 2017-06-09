import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Helpers} from '../helpers';
import { Link } from 'react-router';
import { FormattedMessage, FormattedRelative } from 'react-intl';

class ArticlesItem extends Component {

  render() {

    const article = this.props.article;

    let articleClass = "articles-item";

    return (
      <div className={articleClass}>

      <Link className="back-button-top" to="/press" ><i className="iconmoon-cityhive-iconmoon-font-v2-ol_arrow-up-left"></i> Back</Link>

        <h3 className="articles-item-title">
          <Link to={Helpers.getPageUrl(article)} className="article-item-title-link">
            {article.title}
          </Link>
        </h3>

        <div className="articles-item-meta">
          <div className="articles-item-date">
              <div className="posts-item-date">
                  Written on {article.createdAt ? moment(article.createdAt).format('Do MMMM YYYY') :
                      <FormattedMessage id="posts.dateNotDefined"/>}
              </div>
          </div>
        </div>

        <div className="articles-item-content">
            <p dangerouslySetInnerHTML={{__html: article.content}}/>
        </div>

        <Link className="back-button-bottom" to="/press" ><i className="iconmoon-cityhive-iconmoon-font-v2-ol_arrow-up-left"></i> Back</Link>

      </div>
    )
  }
}

ArticlesItem.propTypes = {
  article: React.PropTypes.object.isRequired
};

ArticlesItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = ArticlesItem;
export default ArticlesItem;