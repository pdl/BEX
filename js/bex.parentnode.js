(function($) {
	$.widget("bex.bexparentnode", {
		options: {
		},
		_create: function() {
			/*self._trigger("added", null);*/
			var self = this;
			var bexcontents = $('<ul></ul>')
					.addClass("bex-contents")
					.sortable({
						connectWith: ".bex-contents",
						placeholder: "bex-placeholder"
					})
					.appendTo(self.element)
					.disableSelection();
			self.bexcontents = bexcontents;

			return this;
		},
		append: function(newNode){
			var self = this;
			/*todo: check if newNode is ok*/
			return $(self.bexcontents).append(newNode);
		},
		prepend: function(newNode){
			var self = this;
			/*todo: check if newNode is ok*/
			return $(self.bexcontents).prepend(newNode);
		},
		children: function(){
			var self = this;
			return $(self.bexcontents).children();
		},
		destroy: function() {
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
		}
	});
})(jQuery);
