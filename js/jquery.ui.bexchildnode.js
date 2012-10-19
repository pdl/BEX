/*

Child Node

Provides methods relating to a node's role as a child of an element or of the document root, for instance "parent" and "insertPreceding".

Used by:

* Element Nodes
* Text Nodes
* CDATA Sections
* Comment nodes
* Processing instructions

*/
(function($) {
	$.widget("ui.bexchildnode", {
		options: {
			
		},
		_create: function() {
			var self = this;
			return self;
		},
		parent: function(){
			var self = this;
			return $(self.element).parents('.bex-element,.bex-document').first();
		},
		ancestors: function(){ /*todo: add optional selector*/
			var self = this;
			return $(self.element).parents('.bex-element,.bex-document');
		},
		precedingSibling: function(){ /*todo: add optional selector*/
			var self = this;
			return $(self.element).prev();
		},
		precedingSiblings: function(){ /*todo: add optional selector*/
			var self = this;
			return $(self.element).prevAll();
		},
		followingSibling: function(){ /*todo: add optional selector*/
			var self = this;
			return $(self.element).next();
		},
		followingSiblings: function(){ /*todo: add optional selector*/
			var self = this;
			return self.nextAll();
		},
		insertPreceding: function(newNode){
			var self = this;
			/*todo: check if newNode is ok*/
			return $(self.element).before(newNode);
		},
		insertFollowing: function(newNode){
			var self = this;
			/*todo: check if newNode is ok*/
			return $(self.element).after(newNode);
		},
		removeNode: function() {
			var	focusfallback = $(this.element).bexchildnode('followingSibling');
			if (!$(focusfallback).is('li')){
				focusfallback = $(this.element).bexchildnode('precedingSibling')
			}
			if (!$(focusfallback).is('li')) {
				focusfallback = $(this.element).bexchildnode('parent');
			}
			this.element.remove();
			$(focusfallback).find('button').first().focus();
		},
		destroy: function() {
			
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
		}
	});
})(jQuery);
