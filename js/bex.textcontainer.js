/*
** bex.bextextcontainer
**
** This widget provides functions wake and sleep.
**
** - wake takes the element's contents and place them inside a textarea to be edited.
** - sleep returns the element to its normal state
**
** This is used because textareas are expensive to render.
**
*/

(function($) {
	$.widget("bex.bextextcontainer", {
		options: {
			pattern: ''
		},
		_create: function() {

			var self = this;
			var	o = self.options;
			var	el = self.element
					.addClass("bex-textcontainer")
					.click(function(){self.wake()});
			return self;
		},
		wake: function(){
			var self = this;
			var inputs = self.element.find("textarea")
			if (inputs.length > 0)
			{
				inputs[0].focus();
			}
			else
			{
				var input = $("<textarea></textarea>")
					.val(self.element.text())
					.change(function(){$(this).attr('data-changed','1')})
					.blur(function(){self.sleep()});
				if (self.options.pattern != '')
				{
					input.attr('pattern', self.options.pattern);
				}
				this.element.empty().append(input);
				input.focus();
			}
			return self;
		},
		sleep: function(){
			var inputs = this.element.find("textarea");
			if (inputs.length > 0)
			{
				var textcontent = $(inputs[0]).val();
				this.element.empty().text(textcontent);
			}
			return self;
		},
		val: function() {
			this.sleep();
			return $(this.element).text();
		},
		destroy: function() {
			this.sleep();
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );

		}
	});
})(jQuery);
