import React from 'react';
import { FormattedMessage } from 'react-intl';

const PostLoadMore = ({loadMore, count, totalCount}) => {
    return (
        <div className="timeline-load-more-wrapper">
            <a className="timeline-load-more" onClick={loadMore}>
                <span className="btn btn-primary btn-ghost">Load more</span>
                &nbsp;
                {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
            </a>
        </div>
    )
};

PostLoadMore.displayName = "PostLoadMore";

module.exports = PostLoadMore;