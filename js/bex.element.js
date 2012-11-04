(function($) {
	$.widget("bex.bexelement", {
		options: {
			from: $('<element/>')
		},
		_create: function() {
			var	self = this;
			var	o = self.options;
			var	el = self.element
					.addClass("ui-widget ui-widget-contents ui-helper-reset bex-element");
			var	bexheader = $('<div></div>').addClass("ui-widget-header ui-corner-all bex-element-header").appendTo(el);
			el.bexparentnode().bexchildnode();
			var	menu = $("<button></button>").appendTo(bexheader);
			el.bexmenubutton({"button": menu});
			var	bexnodename = $('<span></span>')
					.text(o.from[0].nodeName)
					.bextextcontainer({pattern:'[a-zA-Z][\w]*'})
					.addClass("bex-element-name")
					.appendTo(bexheader);
			self.bexnodename = bexnodename; 
			$(o.from).contents().each(function(){ /*use contents().each() then determine nodetype*/
				if (this.nodeType == 1)
				{
					$(self.element).bexparentnode(
						"append", $("<li></li>").bexelement({from: $(this)})	
					);
				}
				else if (this.nodeType == 3)
				{
					$(self.element).bexparentnode(
						"append", $("<li></li>").text(this.data).bextextnode()
					);
				}
				else if (this.nodeType == 4)
				{
					$(self.element).bexparentnode(
						"append", $("<li></li>").text(this.data).bexcdatasection()
					);
				}
				else if (this.nodeType == 8)
				{
					$(self.element).bexparentnode(
						"append", $("<li></li>").text(this.data).bexcommentnode()
					);
				}
				else
				{
					alert("Don't know how to handle node type " + this.nodeType);
				}
			});
			return self;
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
		nodeName: function(){ /*todo: add optional selector*/
			var self = this;
			return $(self.bexnodename).bextextcontainer('val');
		},
		/*
			Todo: core methods
			insertBefore
			insertAfter
			appendNode
			setData
			setName
			unbind
		*/
		xml: function(){
			var	self = this;
			var	xml = '<' + self.nodeName();
			/* attributes*/

			var	children = self.element.bexparentnode('children');
			if (children.length>0) {
				xml += '>';
				children.each(function(){
					if ($(this).is('.bex-element'))
					{
						xml += $(this).bexelement('xml');
					}
					else if ($(this).is('.bex-commentnode'))
					{
						xml += $(this).bexcommentnode('xml');
					}
					else if ($(this).is('.bex-cdatasection'))
					{
						xml += $(this).bexcdatasection('xml');
					}
					else if ($(this).is('.bex-textnode'))
					{
						xml += $(this).bextextnode('xml');
					}
				});
				xml +='</'+self.nodeName()+'>';
			}
			else {
				xml += '/>';
			}
			return xml;
			
		},
		destroy: function() {
			
		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
		}
	});
})(jQuery);
