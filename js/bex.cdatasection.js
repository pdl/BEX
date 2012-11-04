(function($) {
	$.widget("bex.bexcdatasection", {
		options: {
			
		},
		_create: function() {
			$(this.element).bextextnode().addClass('bex-cdatasection ui-state-highlight');
			return this;
		},
		xml: function(){
			$(this.element).bextextnode('sleep');
			var cdata = $(this.element).find(".bex-textcontainer")[0].textContent;
			cdata.replace(']]>', ']]&gt;');
			return '<![CDATA['+ cdata + ']]>'; 
		},
		destroy: function(){
			$(this.element).removeClass('bex-cdatasection ui-state-highlight');
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			
		}
	});
})(jQuery);
