(function($) {
	var validName =  "[a-zA-Z_][a-zA-Z_0-9\-]*";
	var validBexName =  "bex\.(menubutton|elementnode|childnode|documentnode|parentnode|[a-z]+)\.([a-zA-Z_][a-zA-Z_0-9\-]*)";
	$.widget("bex.bexmenubutton", {
		options: {
			commands: {}
		},
		_create: function() {
			var self = this;
			var	o = self.options;
			var	el = self.element;
			var button = self.options.button;
			if (!typeof button){
				button = $("<button></button>").appendTo(el)
			}
			self.button = button;
			button.button({
						text: false,
						icons: {
							primary: "ui-icon-triangle-1-s"
						}
					})
					.addClass("bex-handle")
					.removeClass("ui-corner-all")
					.click(function(){
						/* todo: menu here */
						var menuoptions = [
							{
								label: "Move...",
								contains: [
									{
										label: "Before Preceding",
										action: function(){
											var controller = self.element;
											$(controller).bexchildnode('precedingSibling').bexchildnode("insertPreceding", controller);
											$(self.button).focus();
										}
									}
								]
							},
							{
								label: "Delete",
								action: function(){
									$(self.element).bexchildnode('removeNode');
								}
							}
						];
						$('.bex-contextmenu').remove();
						var bexcontextmenu = $('<ul class="bex-contextmenu"></ul>');
						var add_menuoption = function(menu, menuoption){
							var listitem = $('<li></li>');
							listitem.append($('<a href="#"></a>').text(menuoption.label).click(menuoption.action));
							if (menuoption.contains !== undefined && menuoption.contains.length > 0) {
								var newmenu = $('<ul></ul>').appendTo(listitem);
								for (var i=0; i<menuoption.contains.length; i++) {
									add_menuoption(newmenu, menuoption.contains[i]);
								}
							}
							menu.append(listitem);
						};
						for (var i=0; i<menuoptions.length; i++){
							add_menuoption(bexcontextmenu, menuoptions[i]);
						}
						bexcontextmenu.menu().show().appendTo(self.button);
					})
					/* Define the keyboard commands */
					.keyup(function(e){
						/* alert( "Keyup " + e.keyCode + " CtrlKey: "+e.ctrlKey); */
						var controller = self.element;
						var keyCode = e.keyCode;

						if (e.ctrlKey)
						{
							switch (keyCode)
							{
								case 37: /*LEFT: Insert after parent*/
									$(controller).bexchildnode('parent').bexchildnode("insertFollowing", controller);
									$(self.button).focus();
									break;
								case 38: /*UP: Insert before previous*/
									$(controller).bexchildnode('precedingSibling').bexchildnode("insertPreceding", controller);
									$(self.button).focus();
									break;
								case 39: /*RIGHT: Append to previous*/
									$(controller).bexchildnode('precedingSibling').bexparentnode("append", controller);
									$(self.button).focus();
									break;
								case 40: /*DOWN: Insert after following */
									$(controller).bexchildnode('followingSibling').bexchildnode("insertFollowing", controller);
									$(self.button).focus();
									break;
								case 46: /*DELETE*/
									$( "#bex-dlg-confirm-delete" ).dialog({
										resizable: false,
										height: 140,
										modal: true,
										title: 'Confirm node deletion',
										close: function(){
											if (self.button){
												self.button.focus();
											}
										},
										buttons: {
											"Delete": function() {
												$(controller).bexchildnode('removeNode');
												$( this ).dialog( "close" );
											},
											"Cancel": function() {
												$( this ).dialog( "close" );
											}
										}
									});
									break;
								case 73: /* CTRL + I */
									$( "#bex-dlg-insert" ).dialog({
										modal: true,
										title: 'Insert Node',
										close: function(){
											if (self.button){
												self.button.focus();
											}
										},
										buttons: {
											"Add Element": function() {
												var xmlforinsertion = '' + $( this ).find('#bex-xmlforinsertion').val();
												if(xmlforinsertion == '' ){xmlforinsertion = '<element/>';}
												var method = $( this ).find(':checked').val();
												/* alert (method+' ' + xmlforinsertion); */
												$(controller).bexparentnode(
													method,
													$('<li/>')
														.bexelement(
															{'from': $($.parseXML(xmlforinsertion).documentElement) }
														)
												);
												$( this ).dialog( "close" );
											},
											"Cancel": function() {
												$( this ).dialog( "close" );
											}
										}
									});
									break;

							}
						}
						else{
							switch (keyCode)
							{
								case 37: /*LEFT: focus on parentnode */
									$(controller).bexchildnode('parent').find('button').first().focus();
									break;
								case 38: /*UP: Focus on preceding sibling */
									$(controller).bexchildnode('precedingSibling').find('button').first().focus();
									break;
								case 39: /*RIGHT: Focus on first child OR edit text node*/
									if ($(controller).is('.bex-textnode'))
									{
										$(controller).bextextnode('wake');
									}
									else if ($(controller).is('.bex-element') && $(controller).bexparentnode('children').length > 0)
									{
										$(controller).bexparentnode('children').first().find('button').first().focus();
									}
									break;
								case 40: /*DOWN: Focus on following sibling */
									$(controller).bexchildnode('followingSibling').find('button').first().focus();
									break;
							}

						}
					});
			return self;
		},
		addCommand: function(command) {
			var self = this;
			var commands = self.commands;
			commands[command.name] = command;
			/*
			if (command.name && validName.match(command.name)){
				self.commands[command.name] = command;
			}
			if (command.name && validBexName.match(command.name)){
				command.action = function () {self.element[ns](method)}
				self.commands[command.name] = command;
			}*/
			return self;
		},
		execCommand: function(commandName){
			var self = this;
			self.commands[commandName](self);
		},
		destroy: function() {

		},
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );

		}
	});
})(jQuery);

/*

	DONE: Make bexmenubutton apply to the controlling element. It will either find and use an existing button as the button or, if it cannot, it will just append a button.

	Commands are always user-facing and if they require parameters, will demand them.
	TODO: Write the following methods
	addCommand ( {
		name: 'insertBefore',
		action: function(){}
	}); # also overwrites existing commands.
	removeCommand ( {
		name: 'insertBefore',
	}); # also iterates through the menu and keyboard shortcuts and unbinds them.
	replaceCommand # alias for addCommand
	addMenuCommand ({
		name: 'insertBeforePreceding'
		path: []
		action: function(){} | commandName ==> function(){execCommand()}
	});
	addKeyboardShortcut ({
		ctrl: 1,
		keyCode: 39
		action: function(){} | commandName ==> function(){execCommand()}
	});
	execCommand ({

	});
*/
