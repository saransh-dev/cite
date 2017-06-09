import React from 'react';
import { FormattedMessage } from 'react-intl';

const UsersLoadMore = ({loadMore, count, totalCount}) => {
    return (
        <div className="users-directory-load-more-wrapper">
            <a className="users-directory-load-more" onClick={loadMore}>
                <span className="btn btn-primary btn-ghost">Load more</span>
                &nbsp;
                {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
            </a>
        </div>
    )
};

UsersLoadMore.displayName = "UsersLoadMore";

module.exports = UsersLoadMore;