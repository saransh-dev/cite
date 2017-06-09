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
            newsFeed:{},
            journalModules:'',
            searchval:''
        }
    }

    componentDidMount() {
        let self = this;
        Meteor.call('getFeeds', function (err,res){
            if(!err && res && res.length > 0) {
                self.setState({
                    newsFeed: res
                })
            }
        })
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

    displayFeed(count){
       let news_feed = this.state.newsFeed[count];
        if(news_feed!== undefined && news_feed.length !=0){
            let title = news_feed.title[0];
            let author = ((news_feed.author)?news_feed.author[0]:'n/a');
            let link = news_feed.link[0];
            let url = this.cleanURL(link);
            let createdAt = news_feed["pubDate"][0];
            let image = ((news_feed["media:content"])?news_feed["media:content"][0].$.url:'/img/holder-journal.png');
            if(!image) {
                image = '/img/holder-journal.png';
            }
            if(title) {
                return (
                    
                    <article className="journal-module-4 special-edition-archive" key={url}>
                        <a href={ link } target="_blank">
                            <div className="col-sm-6 col-md-6 col-lg-6 wide-article"  style={{backgroundImage:'url("'+image+'")'}}>
                                <img src={image} className="img-responsive" />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 text-center">
                                <h3 className="block-title"><span className="createdOn">{moment(createdAt).fromNow()}</span><br/>News</h3>
                                <p className="article-title">{title}</p>
                                <p className="article-author">{author}</p>
                            </div>
                            <div className="clearfix"></div>
                        </a>
                    </article>               
                )
            }
        } 
    }

    displayModules(){
        let module_counter = 0;
        let journal_counter = 0;
        let journal_count = this.state.newsFeed.length - 1;
        let tweet_counter = 0;
        let feed_counter = 0;
        let modules = [];
        let item;

        for(i=0;i<=journal_count;i++){
            if(module_counter==0){
                
                item = <div className="journal-module-container-4">{this.displayFeed(feed_counter)}</div>;
                modules.push(item);

                feed_counter++;
                // journal_counter++;
            } 
            if(module_counter == 1){
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
        
        return (
            <div className={pageClass}>
            <div className="container-fluid container-no-padding">
            <div className="row">  
                <div className="col-sm-3 col-lg-3 col-lg-3 no-padding-lr-sm options-holder">          
                {/*---------- Journal Options ----------*/}
                <div className={this.state.showJournalOptions}>
                    <div className="journal-container">
                        <div className="options-header">
                            <h2>The Journal</h2>
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
                                <li className="active"><Link to={{ pathname: `the-news`}}><span>News</span></Link></li>
                                <li><Link to={{ pathname: `special-edition`}}><span>Special Edition</span></Link></li>
                            </ul>

                            <form className="search-form" role="search" method="get" action="">
                                <label htmlFor="journal-mail-label">Best of the Journal delivered directly to your inbox</label>
                                <div className="input-group">
                                    <input type="text" id="journal-mail-input" className="form-control" placeholder="Email address" value="" name="m" type="email" />
                                    <span className="input-group-btn">
                                        <button className=" btn-default mailbox" type="button"></button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*---------- End Journal Options ----------*/}
                </div>

                <div className="col-sm-7 col-md-7 col-lg-7 no-padding-lr-sm listing-page">          
                <div className="container">
                    <div className="row">
                        
                        <h2 className="page-title txt-center"><span className="txt-small">the </span><br/>News</h2>
                        <section className="page-blurb" dangerouslySetInnerHTML={{__html:page.content}}></section>


                        {/*---------- Display Modules ----------*/}
                        
                        {this.displayModules()}
                    
                        {/*---------- End Display Modules ----------*/}


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