import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';

class PageTemplateAbout extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-about";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width">
                        <h2 className="page-title">{page.title}</h2>

                            <div className="top">
                                <div className="row">
                                    {<div dangerouslySetInnerHTML={{__html: page.content}} className="col-sm-7"></div>}
                                </div>  
                                <img className="about-desktop" src="img/about-top.png" alt=""/>
                                <img className="about-mobile" src="img/about-mobile.png" alt=""/>                            
                            </div>               

                            <div className="middle">
                            <img src="img/about-profile.png" alt=""/> 
                            <div className="row">
                            <div className="col-sm-6"></div>
                                <div className="col-sm-6">
                                    <div className="about-bio-text">
                                        {page.customField && page.customField.field_1 ? <div dangerouslySetInnerHTML={{__html: page.customField.field_1}}></div> : ''}
                                        <img src="img/about-signature.png" className="center-item margin-top-l " alt=""/>
                                    </div>                                  
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-5 mission-text">
                                    <div className="tri tri-top"></div>
                                   <div className="mission hex-about">

                                       {page.customField && page.customField.field_2 ? <div dangerouslySetInnerHTML={{__html: page.customField.field_2}}></div> : ''}
                                    </div>
                                      <div className="tri tri-bottom"></div>
                                </div>                                
                            </div>
                                
                                              
                            </div>  

                            <div className="contact txt-center">
                                <h2 className="page-title">Contact</h2>
                                <p>Got a bee in your bonnet? Any questions, queries or press enquiries, please contact us at:</p>
                                <p><strong><a href="mailto:hq@cityhive.co.uk">hq@cityhive.co.uk</a></strong></p>
                            </div>

                    </div>

                </div>

            </div>
        )
    }
}

PageTemplateAbout.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateAbout.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateAbout;
export default PageTemplateAbout;