import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
// import Articles from 'meteor/cityhive:articles';
// import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";

class PageTemplateCharity extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-wifc page-template-charity";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width-medium">
                        <h2 className="page-title txt-center">Charitable Giving:<span className="txt-small">All in a Good Cause</span></h2>
                        
                        <p>At City Hive, we’re determined to do more than support women and encourage diversity in our industry.</p>
                        <p>Every year, to reach out and help improve life for others around the world, we’ll choose a charity close to our hearts and actively commit to assist their cause.</p>
                        <p>This first year, we’ll be helping <span className="lead">CASCAID</span>.</p>
                        <p>&nbsp;</p>

                        <div className="row">
                            <div className="col-sm-3">
                                <a href="http://www.cascaidcharity.com/" target="_blank"><img alt="Cascaid charity logo" src="/img/page-cascaid-logo-charities.png" className="image left-aligned" alt="CASCAID" width="180" /></a>
                            </div>

                            <div className="col-sm-9">
                                <p>&nbsp;</p>
                                <p><span className="lead">CASCAID</span> is a new initiative set up to bring the asset management community together, along with friends, family and any other connections, to raise £1million for Cancer Research UK in 2017. Headed-up by 100 industry-leading Ambassadors, their campaign will promote an exciting, engaging – and above all, money-making – calendar of challenges and activities throughout the year. Something that will put the ‘fun’ into fundraising, very much along the lines of Comic Relief! </p>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <div className="col-sm-6">
                                <h4 className="txt-left txt-upper">Our Pledge</h4>
                                <p>To support CASCAID and boost their fundraising efforts on behalf of CRUK, we have promised to donate the following:</p>
                                <ul className="ul-menu--with-circles">
                                    <li>£5 for each paid up Individual Member who joins us by our first anniversary; <em>and</em> </li>
                                    <li>5% of all the Corporate Membership fees we receive by the same date (30 November 2017).</li>
                                </ul>
                            </div>

                            <div className="col-sm-6 txt-center orange-link">
                                <a href="http://www.cityhive.co.uk/sign-up">
                                    <div className="hex hex-orange"><h5>Care to<br/>sign up?</h5></div>
                                </a>
                                <br/>
                                <a href="http://www.cityhive.co.uk/sign-up">Join the City Hive network today &gt;</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

PageTemplateCharity.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateCharity.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateCharity;
export default PageTemplateCharity;