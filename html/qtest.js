
test( "Check QUnit is working ok", function() {
	equal( 2+2, 4, "equal: 2+4=4" );
	deepEqual( [{}], [{}], "deepEqual: [{}] = [{}]" );
});
test( "Check we have jQuery and a test canvas", function() {
	ok( $('#testcanvas'), "$('#testcanvas') returns true" );
});

test( "Check we can setup a simple document", function() {
	var xml = '<root/>'
	setup_scope(xml);
	ok ( $('#bexme'), "$('#bexme') returns true" );
});

function roundtrip(xml, reason){
	setup_scope(xml);
	equal ( $('#bexme').bexdocument('xml'), xml, "Roundtripped ok. "+ reason );
}
test( "Check we can roundtrip with some simple documents", function() {
	roundtrip ('<root/>', 'Empty root.');
	roundtrip ('<root>Test</root>', 'Text only.');
	roundtrip ('<root> </root>', 'Whitespace only.');
	roundtrip ('<root>  </root>', 'Multiple whitespace.');
	roundtrip ('<root>&lt;</root>', 'Named Entity.');
//	roundtrip ('<root>&#x3c;</root>', 'Numerical Entity.'); // shouldn't roundtrip but should resolve to &lt; - test later.
	roundtrip ('<root> Test </root>', 'Whitespace and text.');
	roundtrip ('<root><test/></root>', 'Element.');
	roundtrip ('<root><test/><case/></root>', 'Elements.');
	roundtrip ('<root><test><case/></test></root>', 'Nested elements.');
	roundtrip ('<root><test><case/></test><case/></root>', 'Nested elements and siblings.');
	roundtrip ('<root>Before<test/>After</root>', 'Mixed content.');
	roundtrip ('<root>Before <test/> and After</root>', 'Mixed content with whitespace.');
	roundtrip ('<root>Before <test>a <case/> </test> and After</root>', 'Mixed content with more whitespace and nesting.');
});
test( "Check we can roundtrip with comments", function() {
	roundtrip ('<root><!--Test--></root>', 'Simple text comment.');
	roundtrip ('<root><!-- --></root>', 'Whitespace only comment.');
	roundtrip ('<root><!----></root>', 'Empty comment.');
	roundtrip ('<root><!-- <noop/> --></root>', 'XML in comments is not parsed.');
	roundtrip ('<root><!-- &apos; --></root>', 'Entities in comments are not molested.');
//	roundtrip ('<root><!-- <!-- --></root>', 'No issue with <!-- in comments.'); // Actually, this is bad xml. Test it dies correctly later.
	roundtrip ('<root>t<!-- ... -->est</root>', 'Mix comments with text.');
	roundtrip ('<root><unit>t<!-- ... -->est<case/></unit></root>', 'Mix comments with elements.');
});
test( "Check we can roundtrip with CDATA sections", function() {
	roundtrip ('<root><![CDATA[Test]]></root>', 'Simple text CDATA.');
	roundtrip ('<root><![CDATA[ ]]></root>', 'Whitespace only CDATA.');
	roundtrip ('<root><![CDATA[]]></root>', 'Empty CDATA.');
	roundtrip ('<root><![CDATA[ <noop/> ]]></root>', 'XML in CDATA is not parsed.');
	roundtrip ('<root><![CDATA[ &apos; ]]></root>', 'Entities in CDATA are not molested.');
	roundtrip ('<root>t<![CDATA[ ... ]]>est</root>', 'Mix CDATA with text.');
	roundtrip ('<root><unit>t<![CDATA[ ... ]]>est<case/></unit></root>', 'Mix CDATA with elements.');
});

 
function escapeXml (s) {
	// Adapted from https://gist.github.com/panzi/1857360
	var XML_CHAR_MAP = {
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		'"': '&quot;',
		"'": '&apos;'
	};

	return s.replace(/[<>&"']/g, function (ch) {
		return XML_CHAR_MAP[ch];
	});
}

function clear_canvas() {
	$('#testcanvas').empty();
}

function setup_scope(xml) {
	clear_canvas();
	$('#testcanvas').append(
		'<textarea name="" id="bexme" cols="30" rows="10">'
		+ escapeXml(xml)
		+'</textarea>');
	$('#bexme').bexdocument();
}
