define([
	'jquery',
	'underscore',
	'backbone', 	
	'config/config',
	'models/Comment'
	], function($, _, Backbone, config, Comment) {
	'use strict';
	// Add comment view
	// Represents the view that makes it possible to add comments
	// We use an already existin
	var View = Backbone.View.extend({
		initialize: function() {
			
		},

		// Bind events to view methods
		events : {
			'click #btnAddComment': 'add',
			'keypress #appendedInputButton': 'checkKey',
			'focusin #appendedInputButton': 'widenTextbox',
			'focusout #appendedInputButton': 'narrowTextbox',
		},

		checkKey: function(ev) {
			// Check if enter key pressed and add a comment
			if (ev.keyCode === config.ENTER) {
				this.add();
		    }
		},

		widenTextbox: function() {
			this.$('#appendedInputButton').animate({
				'width': '90%'
			});
		},

		narrowTextbox: function() {
			this.$('#appendedInputButton').animate({
				'width': '40%'
			});
		},

		initForm: function() {
			this.$('#appendedInputButton').val('');
			this.$('#appendedInputButton').focus();
		},

		add : function() {
			var comment = new Comment.model({
				text: this.$('#appendedInputButton').val()			
			});
			
			// Call the server and add to collection		
			this.collection.create(comment);
			this.initForm();
		}
	});

	return View;
});
	