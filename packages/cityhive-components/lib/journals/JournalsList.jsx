import Telescope from 'meteor/nova:lib';
import React from 'react';

const JournalsList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

  // console.log(results);
  // console.log(ready);
  // console.log(hasMore);
  // console.log(totalCount);
  // console.log(count);

  if (!!results.length) {
    return (
      <div className="journals-list">
        <div className="journals-list-content">
          {results.map(journal => <Telescope.components.JournalsListItem journal={journal} currentUser={currentUser} key={journal._id}/>)}
        </div>
          {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : 'loading') : ''}
      </div>
    )
  } else if (!ready) {
    return (
      <div className="journals-list">
        <div className="journals-list-content">
          <Telescope.components.JournalsLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="journals-list">
        <div className="journals-list-content">
          <Telescope.components.JournalsNoResults/>
        </div>
      </div>
    )
  }

};

JournalsList.displayName = "JournalsList";

module.exports = JournalsList;