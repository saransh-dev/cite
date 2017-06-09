import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import Journals from 'meteor/cityhive:journals';
import ListJournals from './ListJournals';
import {ListContainer} from "meteor/utilities:react-list-container";

class ListJournalsWrapper extends Component {

  render(props, context) {

    return (
      <div className="list-journals-wrapper">
        <Telescope.components.DashboardMenu/>
        <ListContainer
          collection={Journals}
          publication="journals.list"
          terms={{options: {sort: {createdAt: -1}}}}
          options={{sort: {createdAt: -1}}}
          joins={Journals.getJoins()}
          limit={1000}
          component={ListJournals}
          listId="journals.list"
        />
      </div>
    );

  }

}

export default ListJournalsWrapper;