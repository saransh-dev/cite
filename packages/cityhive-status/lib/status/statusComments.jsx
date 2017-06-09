import React, {PropTypes, Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import {ListContainer} from "meteor/utilities:react-list-container";
import {statusComments} from '../collection.js';


class StatusCommentsComponent extends Component {


  render(props, context) {
    
    return (
      <div className="comments hide">
         /* <ListContainer 
            selector={{'statusId': status._id}}
            collection={StatusComments}
            publication="statusComments.list"
            terms={{sort: {createdAt: -1}}}
            joins={StatusComments.getJoins()}
            component={statusCommentsItemList}
            cacheSubscription={true}
            listId="statusComments.list"
            limit={10}/>*/
      </div>
    );

  }

}

module.exports = StatusCommentsComponent;
export default StatusCommentsComponent;