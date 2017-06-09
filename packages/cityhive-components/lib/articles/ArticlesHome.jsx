import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";
import Articles from "meteor/cityhive:articles";

class ArticlesHome extends Component {

  getDefaultView() {
    return {view: 'top'}
  }
  
  render() {

    const params = {...this.getDefaultView(), ...this.props.location.query, listId: "articles.list.main"};

    return (
      <ListContainer 
        collection={Articles}
        publication="articles.list"
        terms={params}
        joins={Articles.getJoins()}
        component={Telescope.components.ArticlesList}
        cacheSubscription={true}
        listId={params.listId}
        limit={Telescope.settings.get("postsPerPage", 10)}
      />
    )
  }
}

module.exports = ArticlesHome;