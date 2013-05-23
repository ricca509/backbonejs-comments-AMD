define([
	'jquery',
	'underscore',
	'backbone', 	
	'views/CommentsCountView', 
	'views/AddCommentView', 
	'views/CommentView'
	], function($, _, Backbone, CommentsCountView, AddCommentView, CommentView) {
		'use strict';
		// App view 
		// We use the AppView to bootstrap the application
		// and render the views for the first time
		var View = Backbone.View.extend({
			initialize: function() {
				// At every 'add' event of the collection, call the addOneComment method
				this.collection.on('add', this.addOneComment, this);
				// At every 'reset' event of the collection, call the addAllComments method
				this.collection.on('reset', this.addAllComments, this);

				this.render();
			},

			render: function() {
				var commentsCountView = new CommentsCountView({
					collection: this.collection
				});

				$('#commentsCountCountainer').empty().append(commentsCountView.render().$el);

				var addCommentView = new AddCommentView({
					collection: this.collection
				});
				addCommentView.setElement($('#add-comment'));
			},			

			addAllComments: function() {
				var that = this;
				$('#commentsContainer').empty();
				this.collection.each(that.addOneComment);
			},

			addOneComment: function(comment) {
				var commentV = new CommentView({
					model: comment
				});

				$('#commentsContainer').prepend(commentV.render().$el.fadeIn('slow'));
			}
		});

		return View;
});