import React, {PropTypes, Component} from 'react';
import Articles from 'meteor/cityhive:articles';
import {ListContainer} from "meteor/utilities:react-list-container";
import AdminArticlesList from './AdminArticlesList';


class AdminArticles extends Component {

  render(props, context) {

    return (
      <div className="list-articles">
          <div className="breadcrumbs">
              <span>Edit Articles</span>
          </div>
          <div className="user-directory section--grey section--padding clearfix">
              <ListContainer
                  collection={Articles}
                  publication="articles.list"
                  terms={{options: {sort: {createdAt: -1}}}}
                  options={{sort: {createdAt: -1}}}
                  joins={Articles.getJoins()}
                  limit={100}
                  component={AdminArticlesList}
                  listId="articles.list"
                />
          </div>
      </div>
    );

  }

}

AdminArticles.displayName = "AdminArticles";

module.exports = AdminArticles;
export default AdminArticles;