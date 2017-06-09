import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";
import Journals from "meteor/cityhive:journals";

class JournalsHome extends Component {

  getDefaultView() {
    return {view: 'top'}
  }
  
  render() {

    const params = {...this.getDefaultView(), ...this.props.location.query, listId: "journals.list.main"};

    return (
      <ListContainer 
        collection={Journals}
        publication="journals.list"
        terms={params}
        joins={Journals.getJoins()}
        component={Telescope.components.JournalsList}
        cacheSubscription={true}
        listId={params.listId}
        limit={Telescope.settings.get("postsPerPage", 10)}
      />
    )
  }
}

module.exports = JournalsHome;