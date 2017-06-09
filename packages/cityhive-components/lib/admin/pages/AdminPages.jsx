import React, {PropTypes, Component} from 'react';
import Pages from 'meteor/cityhive:pages';
import {ListContainer} from "meteor/utilities:react-list-container";
import AdminPagesList from './AdminPagesList';

class AdminPages extends Component {

  render(props, context) {

    return (
      <div className="list-pages">
          <div className="breadcrumbs">
              <span>Edit Pages</span>
          </div>
          <div className="user-directory section--grey section--padding clearfix">
              <ListContainer
              collection={Pages}
              publication="pages.list"
              terms={{options: {sort: {createdAt: -1}}}}
              options={{sort: {createdAt: -1}}}
              joins={Pages.getJoins()}
              limit={100}
              component={AdminPagesList}
              listId="pages.list"
            />
          </div>
      </div>
    );

  }

}

AdminPages.displayName = "AdminPages";

module.exports = AdminPages;
export default AdminPages;