import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
// import Articles from 'meteor/cityhive:articles';
// import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";

class PageTemplateAwards extends Component {

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-charity";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width-medium">
                        <h2 className="page-title txt-center">WeAreTheCity ‘Rising Star’ awards 2017:<span className="txt-small">Inspiring women in business.</span></h2>
                        
                        <div className="row">
                            <div className="col-sm-9">
                                <p>Launched by WeAreTheCity in 2015, the annual ‘Rising Star’ awards ‘recognise the achievements of women who are below Senior Management or Director level and therefore represent the female talent pipeline and the next generation of future leaders’.</p>
                                <p>It’s a sentiment so close to our own hearts here at City Hive that, although we’re not one of the official sponsors, a prestigious list which again includes an array of FTSE-listed financial companies, it is an event we want to support and promote.</p>
                                <p>So now the 2017 competition is open for nominations, and there is a category dedicated to Investment Management, you have the perfect opportunity to step out of the shadows and take your well-earned place in the spotlight.</p>
                                <p>More than that, by getting involved and taking an active part you’ll have the chance to showcase the dynamic diversity of our industry; highlighting the possibilities of a fascinating, fulfilling and fantastically rewarding career in Asset and Investment Management to astute, ambitious female graduates everywhere.</p>
                            </div>
                            <div className="col-sm-3">
                                <img src="/img/page-awards-risingstars-logo.png" alt="Rising Stars" className="image mob-50pc mob-50pc-center" />
                            </div>
                        </div>

                        <hr className="orange"/>

                         <div className="row">
                            <div className="col-sm-12">

                                <h6 className="page-title txt-center">Take your inspiration from the 2016 finalists</h6>

                                <p>Focusing on the category we believe City Hive members will be most closely associated with, you’ll find the impressive, influential and assuredly no longer unsung heroines who earned their places on the UK 2016 shortlists in Investment Management right here:</p>
                                <p>&nbsp;</p>

                                <img src="/img/page-awards-risingstars.png" alt="Rising Stars" className="image width90 img-center hidden-xs-down" />

                                <img src="/img/page-awards-risingstars-mob.png" alt="Rising Stars" className="image width90 img-center hidden-sm-up" />
                            
                            </div>
                        </div>

                        <hr className="orange"/>

                        <div className="row basic-membership-info">
                            <div className="col-sm-3">
                                <div className="hex hex-dark"><h5 className="small">Nominate a friend, a colleague or even yourself</h5></div> 
                            </div>
                            <div className="col-sm-9">
                                <p>The call for entries started on 1 February and will end on 24 March 2017.</p>
                                <p>You can put forward an inspirational female friend, a talented woman you work alongside – anyone who’s proved they can rise and shine within their particular area of business.</p>
                                <p>There’s no limit on numbers, and you can even nominate yourself.</p>
                            </div>
                        </div>

                        <hr/>         

                        <div className="row basic-membership-info">
                            <div className="col-sm-3">
                                <div className="hex hex-dark"><h5 className="small">Choose a category</h5></div> 
                            </div>
                            <div className="col-sm-9">
                                <p>&nbsp;</p>
                                <p>To broaden the scope of the competition, this year there are award categories covering 22 industries and <a href="http://risingstars.wearethecity.com/" target="_blank">vocations</a>, including the very relevant ‘Rising Stars in Investment Management’ category, sponsored by Northern Trust, where we’re encouraging you to submit your nominations.</p>
                            </div>
                        </div>

                        <hr/>         

                        <div className="row basic-membership-info">
                            <div className="col-sm-3">
                                <div className="hex hex-dark"><h5 className="small">Check<br/>the dates</h5></div> 
                            </div>
                            <div className="col-sm-9">
                                <p>&nbsp;</p>
                                <p>To make sure you know what’s happening when, we’ve made a note of the key dates for each of the competition stages:</p>
                                <p>&nbsp;</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <p>&nbsp;</p>
                                <img alt="Awards Timeline" src="/img/page-awards-timeline.png" className="image left-aligned hidden-xs-down" />
                                <img alt="Awards Timeline" src="/img/page-awards-timeline.png" className="image left-aligned hidden-sm-up" />
                                <p>&nbsp;</p>
                                <p className="txt-center color-orange">* There is no public vote of support for the ‘Champion of the Year’ or ‘Company of the Year’ awards.</p>
                            </div>
                        </div>

                        <hr className="orange"/>

                        <div className="row basic-membership-info">
                            <div className="col-sm-3">
                                <div className="hex hex-dark"><h5>Check back for more</h5></div> 
                            </div>
                            <div className="col-sm-9">
                                <p>&nbsp;</p>
                                <p>As the competition to reveals and recognise the ‘Rising Stars’ of 2017 progresses, we’ll keep you up to date here on <a href="http://www.cityhive.co.uk">cityhive.co.uk</a></p>
                                <p><strong>So get your nominations in by that 24 March deadline, and come back on 15 May to see who made the all-female shortlist and how to cast your vote.</strong></p>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}

PageTemplateAwards.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateAwards.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplateAwards;
export default PageTemplateAwards;
