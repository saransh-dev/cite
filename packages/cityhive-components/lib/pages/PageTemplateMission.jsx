import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Articles from 'meteor/cityhive:articles';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";

class PageTemplateEquality extends Component {

    componentDidMount() {
        $(document).ready(function(){
            // Target your .container, .wrapper, .post, etc.
            setTimeout(function () {
                $(".page-template-our-mission .limited-width-medium").fitVids();
            }, 100);
        });
    }

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-our-mission";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width-medium">
                        <h2 className="page-title">{page.title}</h2>

                        <img src="/img/our-mission-graphic.gif" className="intro-image"/>

                        <div className="limited-width-small">
                            {<div dangerouslySetInnerHTML={{__html: page.content}}></div>}
                            <iframe
                                src="https://player.vimeo.com/video/193641908?title=0&byline=0&portrait=0"
                                width="600"
                                height="338"
                            ></iframe>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}

PageTemplateEquality.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateEquality.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateEquality;
export default PageTemplateEquality;