(function($) {
	$.widget("bex.bextextnode", {
		options: {
			
		},
		_create: function() {
			var self = this,
				o = self.options,
				el = self.element,
				textcontent = el.text();
			el	.empty()
				.addClass("ui-widget bex-textnode ui-helper-reset")
				.bexchildnode();
			var
				menu = $("<button></button>").appendTo(el),
				textcontainer = $("<span></span>").text(textcontent).bextextcontainer().appendTo(el);
			el.bexmenubutton({"button": menu})
			self._trigger("added", null);
			return self;
		},
		wake: function() {
			var textcontainer = this.element.find(".bex-textcontainer");
			textcontainer.bextextcontainer('wake');
			return this;
		},
		sleep: function() {
			var textcontainer = this.element.find(".bex-textcontainer");
			textcontainer.bextextcontainer('sleep');
			return this;
		},
		destroy: function() {
			var textcontent = this.element.find(".bex-textcontainer").text();
			this.element.empty().text(textcontent);
		},
		xml: function(){
			return this.sleep().element.find(".bex-textcontainer")[0].innerHTML; 
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			
		}
	});
})(jQuery);
