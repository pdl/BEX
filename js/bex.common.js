(function( $ ){

	var methods = {
		parseXMLText : function( content ) { 
			// !!! 
		}
		parseXMLElement : function( content ) { 
			// !!! 
		}
		parseXMLDocument : function( content ) { 
			// !!! 
		}
	};

	$.fn.bex = function( method ) {
	
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.bex' );
		}		
	
	};

})( jQuery );

