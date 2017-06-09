import React, {PropTypes, Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import Journals from "meteor/cityhive:journals";

var Slider = require('react-slick');

class PageTemplateJournal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showJournalOptions:"journal-options",
            newsFeed:{},
            searchval:''
        }
    }

    handleChange(field, e){
        var obj = {};
        obj[field] = e.target.value;
        this.setState(obj);
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({showJournalOptions:'journal-options'})
    }
    componentDidMount() {
        let self = this;
        self.setState({
            searchval: decodeURIComponent(this.getUrlVars()["s"])
        });
    }


    toggleJournalOptions() {
        var css = ((this.state.showJournalOptions === "journal-options") ? "journal-options active" : "journal-options");
        this.setState({"showJournalOptions":css});
    }

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    displaySearch(count){
        // let search_val = this.state.searchVal.toLowerCase();
        let search_val = this.state.searchval.toLowerCase();
        let journal_feed = this.props.journals[count];
        let search_str = '';
        let result = '';
        let regex = /<\/?\w+[^>]*\/?>/g;

        let title = journal_feed['title'];
        let category = journal_feed['category'];
        let link = journal_feed['slug'];
        let id = journal_feed['_id'];
        let author = journal_feed['author'];
        let featuredImage = journal_feed['featuredImage'];
        let createdAt = journal_feed['createdAt'];
        if(!featuredImage){
            featuredImage = '/img/holder-journal.png';
        }

        if(journal_feed!== undefined){
            search_str = journal_feed.title;
            search_str = search_str+' '+journal_feed.author;
            _.each(journal_feed.modules,function(module){
                if(module.moduleType=='TextModule'){
                    search_str = search_str+' '+module.value;
                }else if(module.moduleType=='QuotesModule'){
                    search_str = search_str+' '+module.value;
                }
            })
            search_str = search_str.replace(regex, "");
            search_str = search_str.toLowerCase();
            result = search_str.search(search_val);

       
            if(result != -1){
                return(
                    <article className="journal-module-4 special-edition-archive">
                       <Link to={{ pathname: `journal-news`, hash:`#${link}` }}>
                           <div className="col-sm-6 col-md-6 col-lg-6 wide-article"  style={{backgroundImage:'url("'+featuredImage+'")'}}>
                               <img src={featuredImage} className="img-responsive" />
                           </div>
                           <div className="col-sm-6 col-md-6 col-lg-6 text-center">
                               <h3 className="block-title"><span className="createdOn">{moment(createdAt).fromNow()}</span><br/>Special Edition</h3>
                               {/*<h4>{category}</h4>*/}
                               <p className="article-title">{title}</p>
                               <p className="article-author">{author}</p>
                           </div>
                           <div className="clearfix"></div>
                       </Link> 
                    </article>
                )
            }
        }
    }

    displayModules(){
        let module_counter = 0;
        let journal_counter = 0;
        let journal_count = this.props.journals.length - 1;
        let modules = [];
        let item;

        for(i=0;i<=journal_count;i++){
            if(this.displaySearch(i)){
                item =  <div className="journal-module-container-4">{this.displaySearch(i)}</div>;
                modules.push(item);
                module_counter++;
            }
            
            journal_counter++;
           
        }
        if(modules.length ==0){
            return <div className="journal-module-container-4"><h4>Your search for "{this.state.searchval}" has returned no results.</h4></div>;
        }else if( this.state.searchval ==''){
            return <div className="journal-module-container-4"><h4>The search field is empty.</h4></div>;
        }else{
            return modules;
        }
    }

    render() {
        const page = this.props.page;
        const search = this.state.searchval;
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
                                <li><Link to={{ pathname: `the-news`}}><span>News</span></Link></li>
                                <li><Link to={{ pathname: `special-edition`}}><span>Special Edition</span></Link></li>
                            </ul>

                            <form className="search-form" role="search" method="get" action="">
                                <label htmlFor="journal-mail-label">Best of the Journal delivered directly to your inbox</label>
                                <div className="input-group">
                                    <input type="text" id="journal-mail-input" className="form-control" placeholder="Email address" name="m" type="email" />
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
                        
                        <h2 className="page-title txt-center">Search</h2>
                        
                            {((search)?<section className="page-blurb"><h3>Search results for: <i><u>{search}</u></i></h3></section>:'')}
                        


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