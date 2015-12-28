(function($) {
	$.widget("bex.bexmodal", {
		options: {
			focusReturn: undefined,
		},
		_create: function() {
			var self = this,
				o      = self.options,
				el     = self.element;

			return self;
		},
		destroy: function() {
			this.element.empty().remove();
			if (focusReturn) {
				focusReturn.focus();
			}
		},
		xml: function(){
			return '';
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
		}
	});
})(jQuery);
