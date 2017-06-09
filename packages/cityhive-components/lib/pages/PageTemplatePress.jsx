import React, {PropTypes, Component} from 'react';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Articles from 'meteor/cityhive:articles';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";

class PageTemplatePress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweetDate : '',
            tweet: ''
        }
    }

    componentDidMount() {
        let self = this;
        Meteor.call('getTweets', function (err, res) {
            if(!err && res && res.length > 0) {
                //console.log(res);

                self.setState({
                    tweetDate: res[0].created_at,
                    tweet: res[0].text
                })
            }
        })
    }

    displayTweet() {
        let date = this.state.tweetDate;
        let tweet = this.state.tweet;

        if(date && tweet) {
            let formattedDate = moment(new Date(date)).format('h:mm A - Do MMM YYYY');
            return (
                <div>
                    <span className="date">{formattedDate}</span>
                    <span className="text">{tweet}</span>
                </div>
            )
        }
    }

    render() {
        const page = this.props.page;

        let pageClass = "page-item page-template-press";

        return (
            <div className={pageClass}>

                <div className="container txt-col--light">

                    <div className="limited-width-medium">
                        <h2 className="page-title">Press</h2>
                        <p className="txt-center">Keep up with the latest buzz - browse our news and press releases below</p>
                        <p className="txt-center">For all media enquiries please contact <a href="mailto:hq@cityhive.co.uk">hq@cityhive.co.uk</a></p>

                        <div className="col-sm-6">
                            <div className="latest-tweet block">
                                <div className="latest-tweet-top">
                                    {this.displayTweet()}
                                </div>
                                <div className="latest-tweet-bottom">
                                    <div className="triangle-bottom"></div>
                                    <a href="https://twitter.com/thecityhive" className="twitter-follow-link" target="_blank">
                                        <span>Follow</span>
                                        <span>@TheCityHive</span>
                                    </a>
                                </div>
                            </div> 
                            <div className="follow-social-block">
                                <a href="https://www.facebook.com/TheCityHive" target="_blank"><i className="fa fa-facebook-square"></i></a>
                                <a href="https://www.linkedin.com/company/cityhive" target="_blank"><i className="fa fa-linkedin-square"></i></a>
                                <p>CONNECT WITH US<br />
                                    <span>/TheCityHive</span>
                                </p>
                            </div>                           
                        </div>
                        <div className="col-sm-6 press-listing">
                            <div className="triangle-top"></div>
                             <div className="hex"><h5>Latest News</h5></div>

                                <ListContainer
                                    collection={Articles}
                                    publication="articles.list"
                                    joins={Articles.getJoins()}
                                    component={Telescope.components.ArticlesList}
                                    cacheSubscription={true}
                                    listId="articles.list"
                                    limit={8}
                                />                           
                        </div>                        

                    </div>
                </div>

            </div>
        )
    }
}

PageTemplatePress.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplatePress.contextTypes = {
    currentUser: React.PropTypes.object
};

module.exports = PageTemplatePress;
export default PageTemplatePress;