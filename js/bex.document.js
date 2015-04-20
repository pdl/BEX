(function($) {
		$.widget("bex.bexdocument", {
		dialogs: {
			delete:     '<div id="bex-dlg-confirm-delete"><form>Are you sure you want to delete this?</form></div>',
			insertNode: '<div id="bex-dlg-insert">\
				<form>\
					<div id="bex-insert-location">\
						<input type="radio" id="insertPreceding" value="insertPreceding" name="bex-insert-location" /><label for="insertPreceding">Preceding</label>\
						<input type="radio" id="insertFollowing" value="insertFollowing" name="bex-insert-location"" /><label for="insertFollowing">Following</label>\
						<br/>\
						<input type="radio" id="append" value="append" name="bex-insert-location" checked="checked" /><label for="append">Append</label>\
						<input type="radio" id="prepend" value="prepend" name="bex-insert-location" /><label for="prepend">Prepend</label>\
						<br/>\
						<input type="radio" id="aroundSelf" name="bex-insert-location" /><label for="aroundSelf">Around</label>\
						<input type="radio" id="aroundContents" name="bex-insert-location" /><label for="aroundContents">Wrap Contents</label>\
						<textarea id="bex-xmlforinsertion" type="text"/>\
					</div>\
				</form>\
				</div>'
		},
		options: {
		},
		_create: function() {

			var	self = this;
			var	o = self.options;
			var	el = self.element;
			self.bexdocument = $('<div></div>')
				.addClass("bex-document")
				.insertAfter(el).append(el);
			self.bexpreview = $('<div></div>')
				.addClass("bex-preview")
				.appendTo(self.bexdocument);
			self.bexheader = $('<div></div>')
				.addClass("bex-document-header")
				.prependTo(self.bexdocument)
				.append(
					$('<button class="bex-show-tree">Tree</button>').button().click(function(){
						self.showtree();
					})
				)
				.append(
					$('<button class="bex-show-source">Source</button>').button().click(function(){
						self.showsource();
					})
				)
				.append(
					$('<button class="bex-show-preview">Preview</button>').button().click(function(){
						self.showpreview();
					})
				);
			$(self.bexdocument).bexparentnode();
			self.showtree();
			$('#bex-insert-location').buttonset();
			//zen_textarea.setup({pretty_break: true, use_tab: false});
			return self;
		},
		spawnmodal: function(modalType, args){
			var self    = this;
			var overlay = $('<div class="bex-modal-overlay"></div>'); // todo: have only one and a stack of modals
			var modal   = $('<div class="bex-modal"></div>');
			overlay.append(modal);
			var contents = $(self.dialogs[modalType]);
			// if ( typeof contents == typeof function(){} ){
			//   contents = contents(args);
			// }
			modal.append(contents);
			self.bexdocument.append(overlay);
			modal.bexmodal();
			modal.focus();
		},
		showpreview: function(){
			$(this.element).hide();
			$(this.bexdocument).find('>ul').hide();
			$(this.bexpreview).show();
			$(this.bexpreview).html(this.xmlpreview());
		},
		showtree: function(){
			this.tree();
			$(this.element).hide();
			$(this.bexpreview).hide();
			$(this.bexdocument).find('>ul').show();
		},
		showsource: function(){
			$(this.bexpreview).hide();
			$(this.bexdocument).find('>ul').hide();
			$(this.element).show().val(this.xml());
		},
		xml: function(){
			var	source = '';
			$(this.bexdocument).bexparentnode("children").each(function(){
				source += $(this).bexelement('xml');
			});
			return source;
		},
		xmlpreview: function(){
			return this.xml(); // TODO: Add a callback so that users can insert their own XSLT. BUT isn't this its own callback?
		},
		tree: function(){
			var	xml = $(this.element).val();
			var	xmldoc = $.parseXML(xml);
			var	root = $(xmldoc.documentElement);
			$(this.bexdocument).find('>ul').empty();
			$(this.bexdocument).bexparentnode(
				"append",
				$("<li></li>")
					.bexelement({"from": root})
			).find('button').first().focus();
		},
		destroy: function() {
			this.element.after('.bex-document').first.unbindNode();
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );

		}
	});
})(jQuery);
