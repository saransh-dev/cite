import React, {PropTypes, Component} from 'react';
import TinyMCE from 'react-tinymce';
import {Messages} from 'meteor/nova:core';
import {FlashContainer} from "meteor/nova:core";
import { Session } from 'meteor/session';
import { ModalTrigger } from "meteor/nova:core";

let moduleEditDict = new ReactiveDict('moduleEditDict');
let featuredEditImage = new ReactiveDict('featuredEditImage');

import  TextModule  from '../modules/textModule';
import  QuotesModule  from '../modules/quotesModule';
import  CarouselModule  from '../modules/carouselModule';
import  ImageModule  from '../modules/imageModule';
import UploadModuleImage from '../modules/upload-module-image';
import PageTemplateJournalContainer from '../../../pages/PageTemplateJournalNews';

class EditJournalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
             titleError:'',
             journalModules: props.document.modules || '',
             modules: [],
             previewState:{},
        };
        this.formSubmit = this.formSubmit.bind(this);
        this.journalPreview = this.journalPreview.bind(this);
        this.checkTitle = this.checkTitle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.listModule = this.listModule.bind(this);
    }

   componentWillReceiveProps(nextProps){
     if(nextProps.document){
      let carouselImages = [];

      Object.keys(nextProps.document.modules).forEach((key, index) => {
       if(nextProps.document.modules[key] != "undefined")
          moduleEditDict.set(`module${index}`, nextProps.document.modules[key])
      });

      featuredEditImage.set('moduleFeatured', {moduleType:"FeaturedImage", value:[nextProps.document.featuredImage]} );

      let modules = [];
      nextProps.document.modules.map((module, index) => {
        if(module.moduleType == "TextModule"){
          modules = modules.concat(TextModule);
        } else if(module.moduleType == "ImageModule") {
         modules = modules.concat(ImageModule);
        } else if(module.moduleType == "CarouselModule") {
          modules = modules.concat(CarouselModule);
        } else if(module.moduleType == "QuotesModule") {
          modules = modules.concat(QuotesModule);
        }
      });
      this.setState({ modules });
     }
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
      moduleEditDict.delete(moduleName);
      modules.splice(index, 1);
      this.setState({ modules }) 
   }

   checkTitle(e){
      let self = this;
      let title = e.target.value;
      Meteor.call('checkValidTitle', e.target.value, (error, result) => {
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

      let journalDocument = this.props.document,
          modulesValues = [],
          moduleKeys = moduleEditDict.keys,
          title = this.refs.journalTitle.value,
          category = this.refs.journalCategory.value,
          author = this.refs.journalAuthor.value,
          featuredJournal = this.refs.featuredJournal.checked,
          featuredImageUrl = featuredEditImage.get('moduleFeatured'),
          commentsVisibility = this.refs.commentsVisibility.checked;

      Object.keys(moduleKeys).forEach(function (key) {
         modulesValues.push(JSON.parse(moduleKeys[key]));
      });

      let modifier = {
          $set : {
             title : title,
             author: author,
             featuredImage: featuredImageUrl?featuredImageUrl.value[0]:'',
             featuredJournal: featuredJournal,
             category : category,
             slug: `/${category.replace(/\s+/g, '-').toLowerCase()}/${title.replace(/-/g, '/').replace(/\s+/g, '-').toLowerCase()}`,
             modules: modulesValues,
             commentsVisibility: commentsVisibility,
          }
      };

      Meteor.call('journals.edit', journalDocument._id, modifier, function (error, result) {
          if(error) {
             Messages.clearSeen();
             Messages.flash(error.reason, 'error');
          } else {
             if(result) {
                 Messages.clearSeen();
                 Messages.flash('Journal Edited', 'success');
             }
          }
      });
      this.setState({titleError:''});
   }

   journalPreview() {

      if(this.refs.journalTitle.value == '' || this.refs.journalCategory.value == '' || this.refs.journalAuthor.value == '' || featuredEditImage.get('moduleFeatured') == undefined ) {
        return;
      }

      let journalData = this.props.document,
          modulesValues = [],
          moduleKeys = moduleEditDict.keys,
          title = this.refs.journalTitle.value,
          category = this.refs.journalCategory.value,
          author = this.refs.journalAuthor.value,
          featuredJournal = this.refs.featuredJournal.checked,
          featuredImageUrl = featuredEditImage.get('moduleFeatured'),
          commentsVisibility = this.refs.commentsVisibility.checked;

      Object.keys(moduleKeys).forEach(function (key) {
         modulesValues.push(JSON.parse(moduleKeys[key]));
      });


      let journalDocument = {
          title : title,
          author: author,
          featuredImage: featuredImageUrl?featuredImageUrl.value[0]:'',
          featuredJournal: featuredJournal,
          category : category,
          slug: `/${category.replace(/\s+/g, '-').toLowerCase()}/${title.replace(/-/g, '/').replace(/\s+/g, '-').toLowerCase()}`,
          modules: modulesValues,
          commentsVisibility: commentsVisibility,
          createdAt: journalData.createdAt,
          preview: true,
      };

      this.setState({"previewState":journalDocument});
   }

   componentWillUnmount(){
       moduleEditDict.clear();
       featuredEditImage.clear();
       this.setState({'previewState':''});
   }

   render() {

      let title = this.props.document.title,
          author = this.props.document.author,
          slug = this.props.document.slug,
          featuredImage = this.props.document.featuredImage,
          featuredJournal = this.props.document.featuredJournal,
          menuInclude = this.props.document.menuInclude,
          menuWeight = this.props.document.menuWeight,
          category = this.props.document.category,
          commentsVisibility = this.props.document.commentsVisibility,
          modulesValues = [];

       Object.keys(moduleEditDict.keys).forEach(function (key) {
         if(moduleEditDict.keys[key] != undefined || moduleEditDict.keys[key] != 'undefined')
             modulesValues.push(JSON.parse(moduleEditDict.keys[key]));
       });

      const modules = this.state.modules.map((Element, index) => {
         return <Element 
             key={ index } 
             index={ index } 
             deleteModule={this.deleteModule.bind(this)} 
             moduleDict = {moduleEditDict}
             value={modulesValues?modulesValues[index]?modulesValues[index].value:'':''} 
             {...this.state}
             />
      });

      return (
          <div className="create-journal-form">
             <form onSubmit={this.formSubmit}>
                 <div className="form-group">
                    <label htmlFor="journal-title">Journal Title</label>
                    <input defaultValue={title} ref="journalTitle" id="journal-title" className="form-control" onBlur={this.checkTitle} type="text" required />
                    <span className="error text-danger">{this.state.titleError}</span>
                </div>

                <div className="form-group">
                   <label htmlFor="journal-author">Journal Author</label>
                   <input defaultValue={author} ref="journalAuthor" id="journal-author" className="form-control" type="text" required />
                </div>

                <div className="form-group">
                   <label htmlFor="journal-category">Journal Category</label>
                   <select ref="journalCategory" id="journal-category" className="form-control" defaultValue={category}  required>
                     <option>Select</option>
                     <option value="A Hive of Knowledge" >A Hive of Knowledge</option>
                     <option value="Profile Spotlight" >Profile Spotlight</option>
                     <option value="The Experts Bureau" >The Experts Bureau</option>
                    </select>
                </div>
                
                <div className="form-group">
                   <label htmlFor="journal-featured-image">Featured Image</label>
                   <UploadModuleImage 
                       label="Upload Image" 
                       moduleType="FeaturedImage"
                       value = {[featuredImage]}
                       index="Featured" 
                       moduleDict = {featuredEditImage}
                 />
                </div>

                <div className="form-group">
                <label htmlFor="featured-journal">Editors Pick</label>
                 <br/>
                   <label className="custom-control custom-checkbox">
                       <input ref="featuredJournal" id="featured-journal" type="checkbox" defaultChecked={featuredJournal} className="custom-control-input" />
                       <span className="custom-control-indicator"></span>
                       <span className="custom-control-description">Check this to make it appear in the Editors Pick.</span>
                   </label>
                </div>

                 {modules}
                 <br/>
                 <div className="form-group">
                    <label htmlFor="comment-visibility">Show/Hide Comment Section</label>
                    <br/>
                    <label className="custom-control custom-checkbox">
                        <input ref="commentsVisibility" id="comment-visibility" type="checkbox" defaultChecked={commentsVisibility} className="custom-control-input" />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">Check this to hide comments section.</span>
                    </label>
                 </div>
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
                <input type="submit" value="Save Edit"/>
                 &nbsp;
                <button type="button" className='previewButton' onClick={this.journalPreview}>
                    <ModalTrigger
                       label="Journal Preview"
                       component={<div>Preview</div>}
                        >
                        <div>
                          <div className="breadcrumbs">
                            <span>Edit Journal</span>
                          </div>
                          <PageTemplateJournalContainer journalPreview={this.state.previewState} />
                        </div>
                     </ModalTrigger>
                </button>
             </form>
          </div>
      );
   }
}

EditJournalForm.displayName = "EditJournalForm";

export default EditJournalForm;