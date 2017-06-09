import React, {PropTypes, Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import Journals from "meteor/cityhive:journals";

var Slider = require('react-slick');

class PageTemplateJournal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showJournalOptions:"journal-options",
            twitterFeed: {},
            twitterCount:0,
            newsFeed:{},
            journalModules:'',
            searchval:''
        }
    }

    handleSubmit(e){
        e.preventDefault();
        browserHistory.push('/search-journal?s='+this.state.searchval);
    }

    handleChange(field, e){
        var obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    componentDidMount() {
        let self = this;
        Meteor.call('getTweets',10, function (err, res) {
            if(!err && res && res.length > 0) {
                self.setState({
                    twitterFeed: res
                })
            }
        })
        Meteor.call('getFeeds', function (err,res){
            if(!err && res && res.length > 0) {
                self.setState({
                    newsFeed: res
                })
            }
        })
    }

    cleanURL(url) {
        var url = $.trim(url);
        if(url.search(/^https?\:\/\//) != -1)
            url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, "");
        else
            url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, "");
        return url[1];
    }

    toggleJournalOptions() {
        var css = ((this.state.showJournalOptions === "journal-options") ? "journal-options active" : "journal-options");
        this.setState({"showJournalOptions":css});
    }

    displayTweet(count) {
        let tweet_feed = this.state.twitterFeed[count];
        if(tweet_feed!== undefined){
            let count_val = parseInt(this.state.twitterCount);
            let date = tweet_feed.created_at;
            let tweet = tweet_feed.text;
            let name = tweet_feed.user.screen_name;
            let image = tweet_feed.user.profile_image_url;
            // this.setState({twitterCount: count_val + 1})

            // SEPERATE LINKS
            let www_reg = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim;
            
            let blocks = tweet.split(' ');

            let message = blocks.map(block => {
                let space = '';
                if (block.match(www_reg)) {
                    return <a href={'//' + block} target="_blank">{block}</a>;
                } else {
                    return ' ' + block + ' ';
                }
            });

            tweet = message;

            if(date && tweet) {
                let formattedDate = moment(new Date(date)).format('h:mm A - Do MMM YYYY');
                return (
                    <article className="col-sm-6 col-md-6 col-lg-6 ">
                        <div className="journal-module-2-social">
                            <div className="module-logo">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                <div className="logo-inner"></div>
                            </div> 
                               
                            <div className="module-content">             
                                <div className="col-md-9">
                                    <p>{tweet}</p>
                                </div>
                                <div className="col-md-3 feed-details">
                                    <img src={image} className="feed-logo" />
                                    <span className="feed-time"> {formattedDate}</span>
                                    <a href={"https://twitter.com/" +name+ "?lang=en"} className="feed-anchor" target="_blank">@{name}</a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </article>
                )
            }
        }
    }

    displayFeed(count){
       let news_feed = this.state.newsFeed[count];
        if(news_feed!== undefined && news_feed.length !=0){
            let title = news_feed.title[0];
            let author = ((news_feed.author)?news_feed.author[0]:'n/a');
            let link = news_feed.link[0];
            let url = this.cleanURL(link);
            let image = ((news_feed["media:content"])?news_feed["media:content"][0].$.url:'/img/holder-journal.png');
            // console.log(news_feed);
            if(!image) {
                image = '/img/holder-journal.png';
            }
            if(title) {
                return (
                    <article className="col-sm-6  col-md-6 col-lg-6 hide-xs">
                        <a href={ link } target="_blank">
                            <div className="journal-module-2-news">
                                <div className="module-header light">The News</div>
                                <div className="module-footer" style={{backgroundImage:'url("'+image+'")'}}>
                                    <img src={image} className="img-responsive" />
                                    <span className="img-border img-border--top"></span>
                                    <span className="img-border img-border--bottom"></span>
                                    <span className="img-border img-border--left"></span>
                                    <span className="img-border img-border--right"></span>                                
                                    {/*<div className="module-title">{url}</div>*/}
                                </div>
                                <div className="module-title">{url}</div>
                                <div className="module-content">
                                {title}
                                </div>
                                <div className="module-author">{author}</div>
                            </div>
                        </a>
                    </article>
                )
            }
        } 
    }

    displayJournal(count,module){
        let journal_feed = this.props.journals[count];
        if(journal_feed!== undefined){
            let title = journal_feed['title'];
            let category = journal_feed['category'];
            let link = journal_feed['slug'];
            let id = journal_feed['_id'];
            let author = journal_feed['author'];
            let featuredImage = journal_feed['featuredImage'];
            if(!featuredImage){
                featuredImage = '/img/holder-journal.png';
            }
            if(module == 2){
                return(
                        <article className="journal-module-4">
                           <Link to={{ pathname: `journal-news`, hash:`#${link}` }}>
                               <div className="col-sm-6 col-md-6 col-lg-6 wide-article"  style={{backgroundImage:'url("'+featuredImage+'")'}}>
                                   <img src={featuredImage} className="img-responsive" />
                               </div>
                               <div className="col-sm-6 col-md-6 col-lg-6 text-center">
                                   <h3 className="block-title color-1">Special Edition</h3>
                                   <h4>{category}</h4>
                                   <p>{title}</p>
                                   <p className="article-author">{author}</p>
                               </div>
                               <div className="clearfix"></div>
                           </Link> 
                        </article>
                )
            }else{
                return(
                     <article className="col-sm-6 col-md-6 col-lg-6 hide-xs">
                        <Link to={{ pathname: `journal-news`, hash:`#${link}` }}>
                           <div className="journal-module-2-news">
                               <div className="module-header dark">Special Edition</div>
                               <div className="module-footer"  style={{backgroundImage:'url("'+featuredImage+'")'}}>
                                   <img src={featuredImage} className="img-responsive" />
                                   <span className="img-border img-border--top"></span>
                                   <span className="img-border img-border--bottom"></span>
                                   <span className="img-border img-border--left"></span>
                                   <span className="img-border img-border--right"></span>
                                   {/*<div className="module-title">{category}</div>*/}
                               </div>
                               <div className="module-title">{category}</div>
                               <div className="module-content">
                                   {title}
                               </div>
                               <div className="module-author">{author}</div>
                           </div>
                        </Link>
                    </article>
                )
            }
        }
    }

    displayFeatured(){
        let journal_feed = this.props.journals;
        let featured = [];
        let image,item;
        // console.log(journal_feed);
        if(journal_feed!== undefined){
            _.each(journal_feed,function(post){
                if(post.featuredJournal){
                    image = post.featuredImage;
                    if(!image){
                        image = '/img/holder-journal.png';
                    }
                    item =  <div className="slickItem">
                            <Link to={{ pathname: `journal-news`, hash:`#${post.slug}` }}>
                                <img src={image} className="img-responsive" />
                                <div className="module-excerpt">
                                    {post.title}
                                    <div className="author">
                                        {post.author}
                                    </div>
                                </div>
                            </Link>
                            </div>
                    featured.push(item);
                }
            })
        }
        return featured;
    }

    // This is temporary
    mobileJournal(){
        let journal_feed = this.props.journals;
        let featured = [];
        let image,item,link;
        // console.log(journal_feed);
        if(journal_feed!== undefined){
            _.each(journal_feed,function(post){
                image = post.featuredImage;
                link = post.slug;
                if(!image){
                    image = '/img/holder-journal.png';
                }
                item =  <article className="carousel-item">
                            <Link to={{ pathname: `journal-news`, hash:`#${link}` }}>
                            <div className="carousel-inner">
                                <div className="carousel-header">
                                    <img src={image} className="img-responsive" />
                                    <div className="carousel-title">{post.category}</div>
                                </div>
                                <div className="carousel-content">
                                    {post.title}
                                </div>
                                <div className="carousel-author">{post.author}</div>
                            </div>
                            </Link>
                        </article>
                featured.push(item);
            })
        }
        return featured;
    }

    displayModules(){
        let module_counter = 0;
        let journal_counter = 0;
        let journal_count = this.props.journals.length - 1;
        let tweet_counter = 0;
        let feed_counter = 0;
        let modules = [];
        let item;

        for(i=0;i<=journal_count;i++){
            if(module_counter==0){
               
                item = <div className="journal-module-container-2">
                       
                        {this.displayJournal(journal_counter,module_counter)}  
                        {this.displayTweet(tweet_counter)} 
                           
                        <div className="clearfix"></div>
                    </div>;
                modules.push(item);
                tweet_counter++;
                journal_counter++;
            } else if(module_counter==1){
                
                item = <div className="journal-module-container-2">

                        {this.displayFeed(feed_counter)}  
                        {this.displayJournal(journal_counter,module_counter)}   
                        
                        <div className="clearfix"></div>
                    </div>;
                modules.push(item);
                feed_counter++;
                journal_counter++;
            } else if(module_counter==2){
                
                item = <div className="journal-module-container-3">
                        <article className="col-md-3">
                            <div className="journal-module-3">
                                <p>Get full access to The Journal, events, jobs and more&hellip;</p>
                                <a href="#">Upgrade your membership</a>
                            </div>
                        </article>
                        </div>;
                modules.push(item);

                item =  <div className="journal-module-container-4">{this.displayJournal(journal_counter,module_counter)}</div>;
                modules.push(item);

                journal_counter++;
            }else if(module_counter==3){
               
                item = <div className="journal-module-container-2">
                       
                        {this.displayJournal(journal_counter,module_counter)} 
                        {this.displayTweet(tweet_counter)}  
                           
                        <div className="clearfix"></div>
                    </div>;
                modules.push(item);
                tweet_counter++;
                journal_counter++;
            }
            if(module_counter == 3){
                module_counter=0;
            }else{
                module_counter++;
            }
        }
        return modules;
    }

    render() {
        const page = this.props.page;
        let pageClass = "page-item page-template-journal";

        let settings = {
            enabled: true,
            dots: false,
            autoplay: false,
            slidesToScroll: 1,
            infinite: false,
            centerMode: true,
            centerPadding: '0',
            adaptiveHeight: true,
            slidesToShow: 1,
            variableWidth:true,
            arrows:true
        };
        let settings_featured = {
            enabled: true,
            dots: true,
            autoplay: true,
            slidesToScroll: 1,
            infinite: true,
            arrows:false,
            slickFilter:'slickItem'
        };
        
        return (
            <div className={pageClass}>
            <div className="container-fluid container-no-padding">
            <div className="row">  
                <div className="col-sm-3 col-lg-3 col-lg-3 no-padding-lr-sm options-holder">          
                {/*---------- Journal Options ----------*/}
                <div className={this.state.showJournalOptions}>
                    <div className="journal-container">
                        <div className="options-header">
                            <h2>{page.title}</h2>
                            <button className="toggle-btn" onClick={this.toggleJournalOptions.bind(this)}><i></i></button>
                        </div>
                        <div className="options-body">
                            <form className="search-form" role="search" method="get" action="search-journal" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="input-group">
                                    <input 
                                        ref="searchval"
                                        type="text" 
                                        onChange={this.handleChange.bind(this,'searchval')}
                                        value={this.state.searchval}
                                        className="form-control" 
                                        placeholder="Search the journal" 
                                        name="searchval" 
                                    />
                                    <span className="input-group-btn">
                                        <button className=" btn-default search" type="submit"></button>
                                    </span>
                                </div>
                            </form>

                            <ul className="options-list">
                                <li><Link to={{ pathname: `the-news`}}><span>News</span></Link></li>
                                <li><Link to={{ pathname: `special-edition`}}><span>Special Edition</span></Link></li>
                            </ul>

                            <form className="search-form" role="search" method="get" action="">
                                <label htmlFor="journal-mail-label">Best of the Journal delivered directly to your inbox</label>
                                <div className="input-group">
                                    <input type="text" id="journal-mail-input" className="form-control" placeholder="Email address" name="m" type="email" />
                                    <span className="input-group-btn">
                                        <button className=" btn-default mailbox" type="submit"></button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*---------- End Journal Options ----------*/}
                </div>

                <div className="col-sm-7 col-md-7 col-lg-7 no-padding-lr-sm">          
                <div className="container">
                    <div className="row">

                        {/*---------- Module 1 ----------*/}
                        <div className="journal-module-container-1">
                        <article className="col-sm-12 col-md-12 col-lg-12 ">
                            <div className="journal-module-1">
                                <header className="module-title">
                                    <div className="title">Special Edition</div>
                                    <div className="sub-title">Editors Pick</div>
                                </header>
                                {this.displayFeatured().length > 0 ? <Slider {...settings_featured}>{this.displayFeatured()}</Slider>: null}
                            </div>
                        </article>
                        </div>
                        {/*---------- End Module 1 ----------*/}
                        <div className="clearfix"></div>
                        {/*---------- Display Modules ----------*/}
                        
                        {this.displayModules()}
                    
                        {/*---------- End Display Modules ----------*/}



                        {/*---------- Module Carousel ----------*/}
                        <div className="journal-carousel-container">
                            <h3 className="block-title color-1">Special Edition</h3>
                            {this.mobileJournal().length > 0 ? <Slider {...settings}>{this.mobileJournal()}</Slider>: null}
                        </div>
                        {/*---------- End Module Carousel ----------*/}

                        {/*---------- Mobile Advert ----------*/}
                        <div className="col-sm-2  col-md-2 col-lg-2 advert-column advert-column-mobile hidden-sm-up">          
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12  col-md-12 col-lg-12 no-padding-l-sm">
                                        <div className="dummy-ad">
                                            Advertising
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*---------- end Mobile Advert ----------*/}

                    </div>
                </div>
                </div>

                <div className="col-sm-2  col-md-2 col-lg-2 no-padding-lr-sm advert-column hide-xs">          
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12  col-md-12 col-lg-12 no-padding-l-sm">
                                <div className="dummy-ad">
                                    Advertising
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>    
            </div>
            </div>
        )
    }
}

PageTemplateJournal.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateJournal.contextTypes = {
    currentUser: React.PropTypes.object
};

// module.exports = PageTemplateJournal;
// export default PageTemplateJournal;

PageTemplateJournalContainer = createContainer((props) => {
  let subscription = Meteor.subscribe('journals.list');

  return {
    journals: subscription.ready()?Journals.find({}, {sort:{createdAt: -1}}).fetch():'',
  };
}, PageTemplateJournal);

module.exports = PageTemplateJournalContainer;
export default PageTemplateJournalContainer;