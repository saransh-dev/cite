import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';

class PageTemplatePrivacy extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-privacy";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width">
                        <h2 className="page-title">{page.title}</h2>
                        {<div dangerouslySetInnerHTML={{__html: page.content}}></div>}
                    </div>

                </div>

            </div>
        )
    }
}

PageTemplatePrivacy.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplatePrivacy.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplatePrivacy;
export default PageTemplatePrivacy;