import Telescope from 'meteor/nova:lib';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import {Status} from '../collection.js';
import StatusItem from './statusItem.jsx';



const StatusItemList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

   //console.log(results);
   //console.log(ready);
   //console.log(hasMore);
   //console.log(totalCount);
   //console.log(count);

  if (!!results.length) {
    return (
      <div className="status-list">
        <div className="status-list-content">
          {results.map(status => <StatusItem key={status._id} status = {status} currentUser={currentUser}/>)}
        </div>
      </div>
    )
  }
  else{
    return (<span></span>)
  }

};

StatusItemList.displayName = "StatusItemList";

module.exports = StatusItemList;