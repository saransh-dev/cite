import Telescope from 'meteor/nova:lib';
import React from 'react';

const UsersDirectoryList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

    if (!!results.length) {
        return (
            <div className="wrapper wrapper-content items-count" rel={totalCount}>
                <div className="row">
                    {results.map(user => <Telescope.components.UsersDirectoryListItem user={user} currentUser={currentUser}
                                                                                  key={user._id}/>)}
                </div>
                {hasMore ? (ready ? <Telescope.components.UsersLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : 'loading') : ''}
            </div>
        )
    } else if (!ready) {
        return (
            <div className="wrapper wrapper-content items-count">
                <div className="row">
                    <p>Loading</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="wrapper wrapper-content items-count">
                <div className="row">
                    <p>No users to display</p>
                </div>
            </div>
        )
    }

};

UsersDirectoryList.displayName = "UsersDirectoryList";

module.exports = UsersDirectoryList;