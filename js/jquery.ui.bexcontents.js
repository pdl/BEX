(function($) {
    $.widget("ui.bexcontents", {
		options: {
		},
		_create: function() {
			
			var self = this,
				o = self.options,
				el = self.element
					.addClass("ui-helper-reset bex-contents")
					.sortable({
						connectWith: ".bex-contents",
						placeholder: "ui-state-highlight"
					})
					.disableSelection();
			return self;
		},
		destroy: function() {
			this.sleep();
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			
		}
	});
})(jQuery);
