import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import {browserHistory} from 'react-router';
import { ModalTrigger } from "meteor/nova:core";

let moduleDict = new ReactiveDict('moduleDict');
let featuredImage = new ReactiveDict('featuredImage');

import  TextModule  from '../modules/textModule';
import  QuotesModule  from '../modules/quotesModule';
import  CarouselModule  from '../modules/carouselModule';
import  ImageModule  from '../modules/imageModule';
import UploadModuleImage from '../modules/upload-module-image'
import PageTemplateJournalContainer from '../../../pages/PageTemplateJournalNews';

class CreateJournalForm extends Component {

   constructor(props) {
        super(props);
        this.state = {
            titleError:'',
            model:'',
            preview:false,
            previewState:{},
            modules: [],
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.journalPreview = this.journalPreview.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.listModule = this.listModule.bind(this);
        this.checkTitle = this.checkTitle.bind(this);
    }

   toggleDropdown() {
      let list = document.getElementById("dropdown-menu");
      if(list.style.display == '' || list.style.display == 'none')
       list.style.display = 'block'
      else
       list.style.display = 'none'
   }

   listModule(e) {
      let target = e.target.id;
      let modules;
      document.getElementById("dropdown-menu").style.display = 'none';
      if(target == "TextModule")
         modules = this.state.modules.concat(TextModule);
      else if(target == "ImageModule")
          modules = this.state.modules.concat(ImageModule);
      else if(target == "CarouselModule")
          modules = this.state.modules.concat(CarouselModule);
      else if(target == "QuotesModule")
          modules = this.state.modules.concat(QuotesModule);
      this.setState({ modules });
   }

   deleteModule(index, moduleName) {
      const modules = this.state.modules;
      moduleDict.delete(moduleName);
      modules.splice(index, 1);
      this.setState({ modules }) 
   }

   checkTitle(e){
      let self = this;
      let title = e.target.value;
      Meteor.call('checkValidTitle', title, (error, result) => {
          if(result && title){
             self.setState({titleError:"Choose a different Title"});
          } else {
             self.setState({titleError:""});
          }
      });
    }

   formSubmit(e) {
      e.preventDefault();

      if(this.state.titleError)
         return;

      let modules = [],
          moduleKeys = moduleDict.keys,
          title = this.refs.journalTitle.value,
          category = this.refs.journalCategory.value,
          author = this.refs.journalAuthor.value,
          featuredJournal = this.refs.featuredJournal.checked,
          featuredImageUrl = featuredImage.get('moduleFeatured'),
          commentsVisibility = this.refs.commentsVisibility.checked;

      Object.keys(moduleKeys).forEach(function (key) {
         modules.push(JSON.parse(moduleKeys[key]));
      });

        let journalDocument = {
            title: title,
            author: author,
            category: category,
            featuredImage: featuredImageUrl?featuredImageUrl.value[0]:'',
            featuredJournal: featuredJournal,
            slug: `/${category.replace(/\s+/g, '-').toLowerCase()}/${title.replace(/-/g, '/').replace(/\s+/g, '-').toLowerCase()}`,
            modules: modules,
            commentsVisibility: commentsVisibility,
        };

        Meteor.call('journals.create', journalDocument, function (error, result) {
            if(error) {
                Messages.clearSeen();
                Messages.flash(error.reason, 'error');
            } else {
                if(result) {
                    Messages.clearSeen();
                    Messages.flash('Journal Created', 'success');
                    browserHistory.push('/admin/journals');
                }
            }
        });

        this.setState({titleError:''});
        moduleDict.clear();
        featuredImage.clear();
   }

   journalPreview() {
      this.state.previewState = {};

      let modules = [],
          moduleKeys = moduleDict.keys,
          title = this.refs.journalTitle.value,
          category = this.refs.journalCategory.value,
          author = this.refs.journalAuthor.value,
          featuredJournal = this.refs.featuredJournal.checked,
          featuredImageUrl = featuredImage.get('moduleFeatured'),
          commentsVisibility = this.refs.commentsVisibility.checked;

      Object.keys(moduleKeys).forEach(function (key) {
         modules.push(JSON.parse(moduleKeys[key]));
      });

      let journalDocument = {
          title: title,
          author: author,
          category: category,
          featuredImage: featuredImageUrl?featuredImageUrl.value[0]:'',
          featuredJournal: featuredJournal,
          slug: `/${category.replace(/\s+/g, '-').toLowerCase()}/${title.replace(/-/g, '/').replace(/\s+/g, '-').toLowerCase()}`,
          modules: modules,
          commentsVisibility: commentsVisibility,
          createdAt: new Date,
          preview: true,
      };
      this.setState({"previewState":journalDocument});
   }

   componentWillUnmount() {
      this.setState({'previewState':''});
   }

   render(props, context) {
      const modules = this.state.modules.map((Element, index) => {
         return <Element 
             key={ index } 
             index={ index } 
             deleteModule={this.deleteModule.bind(this)} 
             moduleDict = {moduleDict}
             {...this.state}
             />
      });
       return (
          <div className="create-journal-form">

             <form onSubmit={this.formSubmit}>

                 <div className="form-group">
                     <label htmlFor="journal-title">Journal Title</label>
                     <input ref="journalTitle" id="journal-title" className="form-control" type="text" onBlur={this.checkTitle} required />
                     <span className="error text-danger">{this.state.titleError}</span>
                 </div>

                 <div className="form-group">
                    <label htmlFor="journal-author">Journal Author</label>
                    <input ref="journalAuthor" id="journal-author" className="form-control" type="text" required />
                 </div>

                 <div className="form-group">
                    <label htmlFor="journal-category">Journal Category</label>
                    <select ref="journalCategory" id="journal-category" className="form-control" required>
                        <option value = '' >Select</option>
                        <option value = "A Hive of Knowledge" >A Hive of Knowledge</option>
                        <option value = "Profile Spotlight" >Profile Spotlight</option>
                        <option value = "The Experts Bureau" >The Experts Bureau</option>
                    </select>
                 </div>

                 <div className="form-group">
                    <label htmlFor="journal-featured-image">Featured Image</label>
                    <UploadModuleImage 
                        label="Upload Image" 
                        moduleType="FeaturedImage" 
                        index="Featured" 
                        moduleDict = {featuredImage}
                  />
                 </div>

                 <div className="form-group">
                    <label htmlFor="featured-journal">Editors Pick</label>
                    <br/>
                    <label className="custom-control custom-checkbox">
                        <input ref="featuredJournal" id="featured-journal" type="checkbox" className="custom-control-input" />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">Check this to make it appear in the editors pick.</span>
                    </label>
                 </div>

                 <br />
                <div>
                  { modules }
                </div>

                <br/>
                <div className="form-group">
                    <label htmlFor="comment-visibility">Show/Hide Comment Section</label>
                    <br/>
                    <label className="custom-control custom-checkbox">
                        <input ref="commentsVisibility" id="comment-visibility" type="checkbox" className="custom-control-input" />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">Check this to hide comments section.</span>
                    </label>
                 </div>
                <input type="submit" value="Create Journal"/>
                &nbsp;
                <button type="button" className='previewButton' onClick={this.journalPreview}>
                 <ModalTrigger
                       label="Journal Preview"
                       component={<div>Preview</div>}
                        >
                        {this.state.previewState != null?
                       <div>
                         <div className="breadcrumbs">
                           <span>Edit Journal</span>
                         </div>
                         <PageTemplateJournalContainer journalPreview={this.state.previewState} />
                       </div>
                       :
                         <div>Please enter all fields</div>
                       }
                     </ModalTrigger>
                </button>
                <div className="dropdown pull-right">
                   <button className="dropdown-toggle" type="button" onClick={this.toggleDropdown}>Add Module
                   <span className="caret"></span></button>
                   <ul className="dropdown-menu dropdown-menu-right" id="dropdown-menu" onClick={this.listModule}>
                      <li ><a id="TextModule" className="dropdown-item">Text</a></li>
                      <li ><a id="ImageModule" className="dropdown-item">Image</a></li>
                      <li ><a id="CarouselModule" className="dropdown-item">Carousel</a></li>
                      <li ><a id="QuotesModule" className="dropdown-item">Quote</a></li>
                   </ul>
                </div> 

             </form>
            
          </div>
       );
   }
}

CreateJournalForm.displayName = "CreateJournalForm";

export default CreateJournalForm;