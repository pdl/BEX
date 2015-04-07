(function($) {
    $.widget("bex.bexcontents", {
		options: {
		},
		_create: function() {

			var self = this,
				o = self.options,
				el = self.element
					.addClass("bex-contents")
					.sortable({
						connectWith: ".bex-contents",
						placeholder: "bex-placeholder"
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
