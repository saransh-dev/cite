import Telescope from 'meteor/nova:lib';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import {StatusComments} from '../collection.js';
import StatusCommentsItem from './statusCommentsItem.jsx';



const statusCommentsItemList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

   //console.log(results);
   //console.log(ready);
   //console.log(hasMore);
   //console.log(totalCount);
   //console.log(count);

  if (!!results.length) {
    return (
      <div className="statusCommentsItemList-list">
        <div className="statusCommentsItemList-list-content">
          {results.map(comment => <StatusCommentsItem key={comment._id} comment = {comment} currentUser={currentUser}/>)}
        </div>
      </div>
    )
  }
  else{
    return (<span></span>)
  }

};

statusCommentsItemList.displayName = "statusCommentsItemList";

module.exports = statusCommentsItemList;