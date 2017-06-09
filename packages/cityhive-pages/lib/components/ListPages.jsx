import Telescope from 'meteor/nova:lib';
import React, {PropTypes, Component} from 'react';
import Pages from '../collection';
import {ListContainer} from "meteor/utilities:react-list-container";
import PagesList from './PagesList';


class ListPages extends Component {

  render(props, context) {

    return (
      <div className="list-pages">
        <Telescope.components.DashboardMenu/>
        <ListContainer
          collection={Pages}
          publication="pages.list"
          terms={{options: {sort: {createdAt: -1}}}}
          options={{sort: {createdAt: -1}}}
          joins={Pages.getJoins()}
          limit={100}
          component={PagesList}
          listId="pages.list"
        />
      </div>
    );

  }

}

export default ListPages;