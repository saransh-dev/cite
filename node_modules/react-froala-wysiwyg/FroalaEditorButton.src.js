(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["FroalaEditorButton"] = factory(require("react"));
	else
		root["FroalaEditorButton"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var FroalaEditorFunctionality = {

	  // Tag on which the editor is initialized.
	  tag: null,
	  defaultTag: 'div',
	  listeningEvents: [],

	  // Jquery wrapped element.
	  $element: null,

	  // Editor element.
	  $editor: null,

	  // Editor options config
	  config: {
	    immediateReactModelUpdate: false,
	    reactIgnoreAttrs: null
	  },

	  editorInitialized: false,

	  SPECIAL_TAGS: ['img', 'button', 'input', 'a'],
	  INNER_HTML_ATTR: 'innerHTML',
	  hasSpecialTag: false,

	  oldModel: null,

	  // Before first time render.
	  componentWillMount: function componentWillMount() {
	    this.tag = this.props.tag || this.defaultTag;
	  },

	  // After first time render.
	  componentDidMount: function componentDidMount() {

	    var tagName = this.refs.el.tagName.toLowerCase();
	    if (this.SPECIAL_TAGS.indexOf(tagName) != -1) {

	      this.tag = tagName;
	      this.hasSpecialTag = true;
	    }

	    if (this.props.onManualControllerReady) {
	      this.generateManualController();
	    } else {
	      this.createEditor();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.destroyEditor();
	  },

	  componentDidUpdate: function componentDidUpdate() {

	    if (JSON.stringify(this.oldModel) == JSON.stringify(this.props.model)) {
	      return;
	    }

	    this.setContent();
	  },

	  createEditor: function createEditor() {

	    if (this.editorInitialized) {
	      return;
	    }

	    this.config = this.props.config || this.config;

	    this.$element = $(this.refs.el);

	    this.setContent(true);

	    this.registerEvents();
	    this.$editor = this.$element.froalaEditor(this.config).data('froala.editor').$el;
	    this.initListeners();

	    this.editorInitialized = true;
	  },

	  setContent: function setContent(firstTime) {

	    if (!this.editorInitialized && !firstTime) {
	      return;
	    }

	    if (this.props.model || this.props.model == '') {

	      this.oldModel = this.props.model;

	      if (this.hasSpecialTag) {
	        this.setSpecialTagContent();
	      } else {
	        this.setNormalTagContent(firstTime);
	      }
	    }
	  },

	  setNormalTagContent: function setNormalTagContent(firstTime) {

	    var self = this;

	    function htmlSet() {

	      self.$element.froalaEditor('html.set', self.props.model || '', true);
	      //This will reset the undo stack everytime the model changes externally. Can we fix this?
	      self.$element.froalaEditor('undo.reset');
	      self.$element.froalaEditor('undo.saveStep');
	    }

	    if (firstTime) {
	      this.registerEvent(this.$element, 'froalaEditor.initialized', function () {
	        htmlSet();
	      });
	    } else {
	      htmlSet();
	    }
	  },

	  setSpecialTagContent: function setSpecialTagContent() {

	    var tags = this.props.model;

	    // add tags on element
	    if (tags) {

	      for (var attr in tags) {
	        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
	          this.$element.attr(attr, tags[attr]);
	        }
	      }

	      if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
	        this.$element[0].innerHTML = tags[this.INNER_HTML_ATTR];
	      }
	    }
	  },

	  destroyEditor: function destroyEditor() {

	    if (this.$element) {

	      this.listeningEvents && this.$element.off(this.listeningEvents.join(" "));
	      this.$editor.off('keyup');
	      this.$element.froalaEditor('destroy');
	      this.listeningEvents.length = 0;
	      this.$element = null;
	      this.editorInitialized = false;
	    }
	  },

	  getEditor: function getEditor() {

	    if (this.$element) {
	      return this.$element.froalaEditor.bind(this.$element);
	    }
	    return null;
	  },

	  generateManualController: function generateManualController() {

	    var self = this;
	    var controls = {
	      initialize: this.createEditor,
	      destroy: this.destroyEditor,
	      getEditor: this.getEditor
	    };

	    this.props.onManualControllerReady(controls);
	  },

	  updateModel: function updateModel() {

	    if (!this.props.onModelChange) {
	      return;
	    }

	    var modelContent = '';

	    if (this.hasSpecialTag) {

	      var attributeNodes = this.$element[0].attributes;
	      var attrs = {};

	      for (var i = 0; i < attributeNodes.length; i++) {

	        var attrName = attributeNodes[i].name;
	        if (this.config.reactIgnoreAttrs && this.config.reactIgnoreAttrs.indexOf(attrName) != -1) {
	          continue;
	        }
	        attrs[attrName] = attributeNodes[i].value;
	      }

	      if (this.$element[0].innerHTML) {
	        attrs[this.INNER_HTML_ATTR] = this.$element[0].innerHTML;
	      }

	      modelContent = attrs;
	    } else {

	      var returnedHtml = this.$element.froalaEditor('html.get');
	      if (typeof returnedHtml === 'string') {
	        modelContent = returnedHtml;
	      }
	    }

	    this.oldModel = modelContent;
	    this.props.onModelChange(modelContent);
	  },

	  initListeners: function initListeners() {
	    var self = this;

	    // bind contentChange and keyup event to froalaModel
	    this.registerEvent(this.$element, 'froalaEditor.contentChanged', function () {
	      self.updateModel();
	    });
	    if (this.config.immediateReactModelUpdate) {
	      this.registerEvent(this.$editor, 'keyup', function () {
	        self.updateModel();
	      });
	    }
	  },

	  // register event on jquery editor element
	  registerEvent: function registerEvent(element, eventName, callback) {

	    if (!element || !eventName || !callback) {
	      return;
	    }

	    this.listeningEvents.push(eventName);
	    element.on(eventName, callback);
	  },

	  registerEvents: function registerEvents() {

	    var events = this.config.events;
	    if (!events) {
	      return;
	    }

	    for (var event in events) {
	      if (events.hasOwnProperty(event)) {
	        this.registerEvent(this.$element, event, events[event]);
	      }
	    }
	  }
	};

	module.exports = FroalaEditorFunctionality;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var FroalaEditorFunctionality = __webpack_require__(3);

	var FroalaEditorButton = React.createClass({
	  displayName: 'FroalaEditorButton',


	  mixins: [FroalaEditorFunctionality],
	  render: function render() {
	    return React.createElement(
	      'button',
	      { ref: 'el' },
	      this.props.children
	    );
	  }
	});

	module.exports = FroalaEditorButton;

/***/ }
/******/ ])
});
;