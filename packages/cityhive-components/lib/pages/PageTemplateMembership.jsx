import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';

class PageTemplateMembership extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-membership";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width">
                        <h2 className="page-title">{page.title}</h2>

                        <div className="row">
                            <div className="col-sm-12">
                                {<div dangerouslySetInnerHTML={{__html: page.content}}></div>}
                                
                                    <div className="hex hex-beta"><span className="beta-bee"></span><h6>Beta Testing</h6></div> 

                                    <hr className="orange hr-hex"/>                               
                            </div>    
                        </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    {page.customField && page.customField.field_1 ? <div dangerouslySetInnerHTML={{__html: page.customField.field_1}}></div> : ''}

                                    <hr className="orange"/>
                                </div>
                            </div>  

                            <div className="row basic-membership-info">
                                <div className="col-sm-3">
                                    <div className="hex hex-dark"><h5>Basic Membership</h5></div> 
                                </div>
                                <div className="col-sm-9">
                                     <ul className="ul-menu--with-ticks">
                                        <li>Completely FREE</li>
                                        <li>Personal tailored City Hive profile</li>
                                        <li>Ability to apply for positions on Job Board</li>
                                        <li>Access to City Hive's wide-ranging events, programmes and workshops</li>
                                    </ul>                                   
                                </div>
                            </div>               

                            <hr/>

                            <div className="row individual-membership-info">
                                <div className="col-sm-3">
                                    <div className="hex hex-dark"><h5>Individual Membership</h5></div> 
                                </div>
                                <div className="col-sm-9">
                                     <ul className="ul-menu--with-ticks">
                                        <li>Full access to the members’ website and social platform</li>
                                        <li>Priority access to our Careers Portal with two weeks’ advance viewing of jobs posted</li>
                                        <li>Invitations to exclusive paid members’ events</li>
                                        <li>Discounts on all City Hive events, programmess and workshops</li>
                                        <li>Opportunity to apply to our cross company mentoring scheme and scholarships</li>
                                        <li>Contribute to our mission and help support the talented women of our industry</li>
                                    </ul>                                   
                                </div>
                            </div>               

                            <hr/>

                            <div className="row corporate-membership-info">
                                <div className="col-sm-3">
                                    <div className="hex hex-orange"><h5>Corporate Membership</h5></div> 
                                </div>
                                <div className="col-sm-9">
                                    <p>Give all your employees membership to City Hive, and show your company’s support for our game-changing vision. We offer various corporate packages to enable you to tailor your level of involvement and support. Please get in touch for further information.</p>                                  
                                </div>
                            </div>                                                                      

                    </div>

                </div>

            </div>
        )
    }
}

PageTemplateMembership.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateMembership.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateMembership;
export default PageTemplateMembership;