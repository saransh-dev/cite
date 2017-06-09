import Telescope from 'meteor/nova:lib';
import React from 'react';

const ArticlesList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

  // console.log(results);
  // console.log(ready);
  // console.log(hasMore);
  // console.log(totalCount);
  // console.log(count);

  if (!!results.length) {
    return (
      <div className="articles-list">
        <div className="articles-list-content">
          {results.map(article => <Telescope.components.ArticlesListItem article={article} currentUser={currentUser} key={article._id}/>)}
        </div>
          {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : 'loading') : ''}
      </div>
    )
  } else if (!ready) {
    return (
      <div className="articles-list">
        <div className="articles-list-content">
          <Telescope.components.ArticlesLoading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="articles-list">
        <div className="articles-list-content">
          <Telescope.components.ArticlesNoResults/>
        </div>
      </div>
    )
  }

};

ArticlesList.displayName = "ArticlesList";

module.exports = ArticlesList;