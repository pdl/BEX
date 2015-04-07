(function($) {
	$.widget("bex.bexcommentnode", {
		options: {

		},
		_create: function() {
			$(this.element).bextextnode().addClass('bex-commentnode');
			return this;
		},
		xml: function(){
			$(this.element).bextextnode('sleep');
			return '<!--'+$(this.element).find(".bex-textcontainer")[0].textContent + '-->';
		},
		destroy: function(){
			$(this.element).removeClass('bex-commentnode');
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
		}
	});
})(jQuery);
