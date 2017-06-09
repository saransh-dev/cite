import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import Articles from 'meteor/cityhive:articles';
import ListArticles from './ListArticles';
import {ListContainer} from "meteor/utilities:react-list-container";

class ListArticlesWrapper extends Component {

  render(props, context) {

    return (
      <div className="list-articles-wrapper">
        <Telescope.components.DashboardMenu/>
        <ListContainer
          collection={Articles}
          publication="articles.list"
          terms={{options: {sort: {createdAt: -1}}}}
          options={{sort: {createdAt: -1}}}
          joins={Articles.getJoins()}
          limit={1000}
          component={ListArticles}
          listId="articles.list"
        />
      </div>
    );

  }

}

export default ListArticlesWrapper;