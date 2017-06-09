import Telescope from 'meteor/nova:lib';
import React from 'react';

const PostsList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

    // console.log(results);
    // console.log(ready);
    // console.log(hasMore);
    // console.log(totalCount);
    // console.log(count);

    if (!!results.length) {
        return (
            <div className="posts-list">
                <div className="posts-list-content">
                    {results.map(post => <Telescope.components.PostsListItem post={post} currentUser={currentUser} key={post._id}/>)}
                </div>
                {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : 'loading') : ''}
            </div>
        )
    } else if (!ready) {
        return (
            <div className="posts-list">
                <div className="posts-list-content">
                    <p>Loading</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="posts-list">
                <div className="posts-list-content">
                    <p>No items found.</p>
                </div>
            </div>
        )
    }

};

PostsList.displayName = "PostsList";

module.exports = PostsList;
export default PostsList;
