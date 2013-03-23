test( "Check QUnit is working ok", function() {
	equal( 2+2, 4, "equal: 2+4=4" );
	deepEqual( [{}], [{}], "deepEqual: [{}] = [{}]" );
});
test( "Check we have jQuery and a test canvas", function() {
	ok( $('#bexme'), "$('#bexme') returns true" );
});

