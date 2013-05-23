// http://backbonetutorials.com/organizing-backbone-using-modules/
require.config({
  baseUrl: "/js/",
  paths: {
    templates: '../templates',
    jquery: 'lib/jquery-1.8.3.min',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-min',
    bootstrap: 'lib/bootstrap.min',
    moment: 'lib/moment.min',
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    moment: {
      exports: 'moment'
    }
  }
});


require([
  'jquery',
  'underscore',
  'backbone',
  './MainRouter',
], function($, _, Backbone, MainRouter) {
	'use strict';
	
  MainRouter.initialize();

});