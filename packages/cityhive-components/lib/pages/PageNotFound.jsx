import React, {PropTypes, Component} from 'react';

class PageNotFound extends Component {

    render() {

        return (
            <div className="page-not-found">

                <img src="/img/logo-footer.png" />
                <p>404 - Page not found</p>

            </div>
        )
    }
}

module.exports = PageNotFound;
export default PageNotFound;