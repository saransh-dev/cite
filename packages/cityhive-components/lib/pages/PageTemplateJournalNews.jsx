import React, {PropTypes, Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {ModalTrigger} from "meteor/nova:core";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';
import { Session } from 'meteor/session';

require("froala-editor/js/froala_editor.pkgd.min.js");
var FroalaEditor = require('react-froala-wysiwyg');
var FroalaEditorView = require('react-froala-wysiwyg/FroalaEditorView');
var FroalaEditorA = require('react-froala-wysiwyg/FroalaEditorA');
var FroalaEditorButton= require('react-froala-wysiwyg/FroalaEditorButton');
var FroalaEditorImg = require('react-froala-wysiwyg/FroalaEditorImg');
var FroalaEditorInput = require('react-froala-wysiwyg/FroalaEditorInput');

import Journals , { JournalComments } from "meteor/cityhive:journals";

var Slider = require('react-slick');

class PageTemplateJournal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showJournalOptions:"journal-options",
            model:'',
            commentEditId:'',
            searchval:''
        };
        this.handleModelChange = this.handleModelChange.bind(this); 
        this.deleteComment = this.deleteComment.bind(this);
        this.commentJournal = this.commentJournal.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.getJournalComments = this.getJournalComments.bind(this);
        this.cloudName = "dl25y9xfd"; 
        this.apiKey = "173649537729756"; 
        this.unsignedPreset = "jbjwtlsv"; 
        this.fullPath = "//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload";
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

    handleModelChange(model) {
        this.setState({model: model});
        if( this.cloudName === "yourcloud" || this.apiKey === "yourapikey" || this.unsignedPreset === "yourpreset") {
            console.log( "You need to put real values in the variables to make this work!");
        }

        const _parseJSON = jQuery.parseJSON;
        jQuery.parseJSON = function(j) {
        var response = _parseJSON(j);
        response.link = response.url;
        return response;
        };
    }

    toggleJournalOptions() {
        var css = ((this.state.showJournalOptions === "journal-options") ? "journal-options active" : "journal-options");
        this.setState({"showJournalOptions":css});
    }

    displayPage(count){
        let modules = this.props.singleJournal.modules;
        let item;
        let obj = [];
        let module = [];
        let img;
        if(modules!== undefined){
             _.each(modules,function(posts){
                if(posts.moduleType=='TextModule'){
                    item = <div dangerouslySetInnerHTML={{__html: posts.value[0]}} ></div>;
                    module.push(item);
                }
                if(posts.moduleType=='ImageModule'){
                    item = <img src={posts.value[0]} className="img-responsive fullwidth" />
                    module.push(item);
                }
                if(posts.moduleType=='QuotesModule'){
                    item = <blockquote dangerouslySetInnerHTML={{__html: posts.value[0]}} ></blockquote>;
                    obj.push(item);
                    item = <a href={'https://twitter.com/intent/tweet?text='+posts.value[0].replace(/(<([^>]+)>)/ig,"")} target="_blank" className="twitter-quote">Tweet this</a>
                    obj.push(item);
                    module.push(obj);
                    obj = [];
                }
                if(posts.moduleType=='CarouselModule'){
                    _.each(posts.value,function(images){
                        item = <img src={images} className="img-responsive" />
                        obj.push(item);
                    })
                    {obj.length > 0 ? img = <Slider>{obj}</Slider>: null}
                    module.push(img);
                    obj = [];
                }
            });
        }
        return module;
    }

    shareThis(e){
        var share = e.target.attributes.getNamedItem('data-share').value;
        var title = e.target.attributes.getNamedItem('data-title').value;
        var slug = window.location.href;
        var subject = 'Share City hive article - '+title;
        switch(share)  {
            case 'twitter':
                return window.open('https://twitter.com/home?status='+slug,'_blank');
            case 'linkedin':
                return  window.open('https://www.linkedin.com/shareArticle?mini=true&url='+slug+'&title='+title,'_blank');
            case 'facebook':
                return  window.open('https://www.facebook.com/sharer/sharer.php?u='+slug,'_blank');
            default:
                return window.open('mailto:?&subject='+subject+'&body='+slug,'_self');
        }
    }

    // componentWillReceiveProps() {
    //     var content = this.props.page.content;
    //     String(content);
    //    content.replace('</blockquote>','<button class="share-this">Tweet this</button></blockquote>');
    //    console.log(console)
    // }

   getJournalComments(id) {
      let comments = JournalComments.find({journalId:id}).fetch();
      if (!comments) return;
      return comments.map(comment => {
         let commentDate = moment(new Date(comment.createdAt)).fromNow() + ' ' + moment(new Date(comment.createdAt)).format('h:mm a - DD.MM.YYYY');
         return (
           <div key={comment._id}  className="commentItem" id={comment._id}>
             <span>{Meteor.users.findOne({_id: comment.userId}).profile.firstName + ' ' + Meteor.users.findOne({_id: comment.userId}).profile.lastName} wrote</span>:
             <p className="comment-date"><small className="txt-col--grey-light">{commentDate}</small></p>
             {this.state.commentEditId!=comment._id?
              <div className='commentContent' dangerouslySetInnerHTML={{__html: comment.content}}></div>
             :
              <div>
                 <textarea defaultValue={this.state.model} className="hidden-xs-up" id={'myprop'+comment._id} placeholder="Write your comment"></textarea>
                 <div className="editor--status editor-comment-box">
                 <FroalaEditor
                     model={this.state.model}
                     onModelChange={this.handleModelChange}
                     config= {{
                       key: 'zpB-8aoC-21qoF-11A2C-9rB2jk==',
                       pluginsEnabled: ['image', 'link', 'emoticons'],
                       placeholderText: 'Write your comment',
                       charCounterCount: false,
                       height: '150px',
                       toolbarInline: false,
                       toolbarBottom: true,
                       toolbarButtons: ['insertImage', 'emoticons', 'insertLink'],
                       quickInsertButtons: false,
                       linkAlwaysBlank: true,
                       linkEditButtons: ['linkEdit', 'linkRemove'],
                       imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
                       imageUploadURL: '//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload',
                       imageUploadParams: {
                           upload_preset: this.unsignedPreset,
                           api_key: this.apiKey
                       }
                     }}
                 />
                 <br/>
                 <button onClick={()=>this.updateComment(comment._id, comment.userId)} className="sendComment">Send</button>
                 </div>
              </div>
             }
             {comment.userId == Meteor.userId()?
                 <div className="comment-options">
                    <span id={`editComment${comment._id}`} onClick={()=>this.editComment(comment._id)}>Edit</span>
                    &nbsp;&nbsp;
                    <span onClick={()=>this.deleteComment(comment._id, comment.userId)}>Delete</span>
                  </div>
              :
                 ''
             }
           </div>
         )
     });
  }

  deleteComment(id, userId) {
      if(Meteor.userId()==userId){
         Meteor.call('journalComments.delete', id);
      }
      this.setState({'commentEditId': ''});
      this.setState({'model': ''});
      $('span').css("pointer-events", "auto");
  }

  editComment(id) {
      $('span').css("pointer-events", "auto");
      let comment =  JournalComments.findOne({_id:id});
      this.setState({'commentEditId': id});
      this.state.model = comment.content;
     $(`span#editComment${id}`).css("pointer-events", "none");
  }

   updateComment(id, userId) {
      const data = {
        id: id,
        content: this.state.model
      };
      if(Meteor.userId()==userId){
         Meteor.call('journalComments.update', data);
      }
      this.setState({'commentEditId':''});
      this.setState({'model': ''});
      $('span').css("pointer-events", "auto");
   }

   commentJournal(id) {
    let text = $('textarea#myprop'+id).val();
    let journalDocument = {
        journalId: id,
        content: text,
        username: Meteor.users.findOne({_id: Meteor.userId()}).profile.firstName + ' ' + Meteor.users.findOne({_id: Meteor.userId()}).profile.lastName,
    };
    Meteor.call('journalComments.create', journalDocument)
    // Clear WYSIWYG after submit
    this.setState({'model': ''});
  }

   renderMainPage() {
      const page = this.props.page;
      const journal = this.props.singleJournal;
      let pageClass = "page-item page-template-journal";

      let settings = {
         enabled: true,
         dots: false,
         autoplay: false,
         slidesToScroll: 1,
         infinite: false,
         slidesToShow: 1,
         arrows:true
      };

      let rm_settings = {
         enabled: true,
         dots: false,
         autoplay: false,
         slidesToScroll: 1,
         infinite: false, 
         arrows:true,
                     centerMode: true,
                     centerPadding: '0',
                     adaptiveHeight: false,
                     slidesToShow: 1,
                     variableWidth:true,
         responsive:[
             {
                 breakpoint:769,
                 settings:{
                     centerMode: false,
                     centerPadding: '50px',
                     adaptiveHeight: false,
                     slidesToShow: 1,
                     variableWidth:false,
                 }
             }
         ]
      };

      let date = moment(journal.createdAt).fromNow();
      let page_title = journal.title;
        
      return (
         <div className={pageClass} style={journal.preview?{'pointer-events':'none'}:{}}>
            <div className="container-fluid container-no-padding">
            <div className="row">  

                <div className="col-sm-3 col-lg-3 col-lg-3 options-holder">          
                {/*---------- Journal Options ----------*/}
                <div className={this.state.showJournalOptions}>
                    <div className="journal-container">
                        <div className="options-header">
                            <h2><span>The</span> Journal</h2>
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

                            <form className="mail-form" role="search" method="get" action="">
                                <label htmlFor="journal-mail-input">Best of the Journal delivered directly to your inbox</label>
                                <div className="input-group">
                                    <input type="text" id="journal-mail-input" className="form-control" placeholder="Email address" value="" name="mail-follow" type="email" />
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

                <div className="col-sm-7 col-md-7 col-lg-7 no-padding-lr-sm">          
                <div className="container">
                    <div className="row">
                        <div className="journal-content-container col-sm-12 col-md-12 col-lg-12">
                            <div className="journal-content">
                                <div className="article-created">{date}<br/><span>Special Edition</span></div>
                                <h1>{journal.title}</h1>
                                <div className="author inverted">{journal.author}</div>
                                
                                {this.displayPage()}

                                <div className="share-container">
                                    <div className="share-icon twitter" data-title={page_title} data-share="twitter" onClick={this.shareThis}></div>
                                    <div className="share-icon facebook" data-title={page_title} data-share="facebook" onClick={this.shareThis}></div>
                                    <div className="share-icon linkedin" data-title={page_title} data-share="linkedin" onClick={this.shareThis}></div>
                                    <div className="share-icon email" data-title={page_title} data-share="email" onClick={this.shareThis}></div>
                                </div>

                              {journal && !journal.commentsVisibility && !journal.preview?
                                <div className="comment-container">
                                    <div className="comment-heading">Comment</div>                               
                                    <div className='commentBox'>
                                      { this.getJournalComments(journal._id) }
                                    </div>
                                    {!this.state.commentEditId?
                                    <div className={`textarea${journal._id}`}>
                                      <textarea value={this.state.model} className="hidden-xs-up" id={'myprop'+journal._id} placeholder="Write your comment"></textarea>
                                      <div className="editor--status editor-comment-box">
                                        <FroalaEditor
                                            model={this.state.model}
                                            onModelChange={this.handleModelChange}
                                            config= {{
                                              key: 'zpB-8aoC-21qoF-11A2C-9rB2jk==',
                                              pluginsEnabled: ['image', 'link', 'emoticons'],
                                              placeholderText: 'Write your comment',
                                              charCounterCount: false,
                                              height: '150px',
                                              toolbarInline: false,
                                              toolbarBottom: true,
                                              toolbarButtons: ['insertImage', 'emoticons', 'insertLink'],
                                              toolbarButtonsMD: ['insertImage', 'emoticons', 'insertLink'],
                                              toolbarButtonsSM: ['insertImage', 'emoticons', 'insertLink'],
                                              toolbarButtonsXS: ['insertImage', 'emoticons', 'insertLink'],
                                              quickInsertButtons: false,
                                              linkAlwaysBlank: true,
                                              linkEditButtons: ['linkEdit', 'linkRemove'],
                                              imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
                                              imageUploadURL: '//api.cloudinary.com/v1_1/dl25y9xfd/auto/upload',
                                              imageUploadParams: {
                                                  upload_preset: this.unsignedPreset,
                                                  api_key: this.apiKey
                                              }
                                            }}
                                        />
                                        <br/>
                                        <button onClick={this.commentJournal.bind(this, journal._id)} className="btn">POST</button>
                                      </div>
                                    </div>
                                    :
                                       ''
                                    }
                                  </div>
                              :
                               ""
                              }
                            </div>

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

                            <div className="read-more-container">
                                <h6>You may also like to read</h6>
                                <Slider {...rm_settings}>
                                    <article className="rm-item">
                                        <div className="date">2 days ago</div>
                                        <div className="category">special edition</div>
                                        <div className="content">Story headline here tur alibusaperum lorem ipsum</div>
                                        <div className="author">John Robinson</div>
                                    </article>
                                    <article className="rm-item">
                                        <div className="date">2 days ago</div>
                                        <div className="category">special edition</div>
                                        <div className="content">Story headline here tur alibusaperum lorem ipsum</div>
                                        <div className="author">John Robinson</div>
                                    </article>
                                    <article className="rm-item">
                                        <div className="date">2 days ago</div>
                                        <div className="category">special edition</div>
                                        <div className="content">Story headline here tur alibusaperum lorem ipsum</div>
                                        <div className="author">John Robinson</div>
                                    </article>
                                    <article className="rm-item">
                                        <div className="date">2 days ago</div>
                                        <div className="category">special edition</div>
                                        <div className="content">Story headline here tur alibusaperum lorem ipsum</div>
                                        <div className="author">John Robinson</div>
                                    </article>
                                </Slider>
                                <div className="mail-subscribe">
                                    <form className="mail-form" role="search" method="get" action="">
                                        <label htmlFor="journal-mail-input-footer">Best of the Journal delivered directly to your inbox</label>
                                        <div className="input-group">
                                            <input type="text" id="journal-mail-input-footer" className="form-control" placeholder="Email address" value="" name="mail-follow" type="email" />
                                            <span className="input-group-btn">
                                                <button className=" btn-default mailbox" type="button"></button>
                                            </span>
                                        </div>
                                        <div className="clearfix"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-sm-2  col-md-2 col-lg-2 advert-column hide-xs">          
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

   render() {
      return this.props.singleJournal? this.renderMainPage():<h2>Loading....</h2>
   }
}

PageTemplateJournal.propTypes = {
    page: React.PropTypes.object.isRequired
};

PageTemplateJournal.contextTypes = {
    currentUser: React.PropTypes.object
};


PageTemplateJournalContainer = createContainer((props) => {
  let subscription = Meteor.subscribe('journals.list');
  let commentSubscription = Meteor.subscribe('journalComments');
  let userSubscription = Meteor.subscribe('cityhive.users.directory');
  let slug, journalsInfo;
  if(!Meteor.isServer){
    slug = window.location.hash.split('#').slice(-1)[0];
    journalsInfo = Journals.findOne({slug:slug});
  }
  return {
    singleJournal: journalsInfo && commentSubscription.ready() && userSubscription.ready() ? journalsInfo: props.journalPreview?props.journalPreview:'',
    journals: subscription.ready()?Journals.find({}, {sort:{createdAt: -1}}).fetch():'',
    page: props.page?props.page:{},
  };
}, PageTemplateJournal);

module.exports = PageTemplateJournalContainer;
export default PageTemplateJournalContainer;
