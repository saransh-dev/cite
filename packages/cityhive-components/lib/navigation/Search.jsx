import React from 'react';
import { FormattedMessage } from 'react-intl';

const Search = () => {

    return (
        <form className="search">
            <i className="fa fa-search"></i>
        </form>
    )
};

Search.displayName = "Search";

module.exports = Search;

export default Search;
