#!/bin/sh
mkdir ext-lib

curl http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js      > ext-lib/jquery.js
curl http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js > ext-lib/jquery.ui.js
curl http://jqueryui.com/resources/download/jquery-ui-1.11.4.zip           > ext-lib/jqueryui.zip

cd ext-lib && unzip jqueryui.zip && cd ..

curl http://code.jquery.com/qunit/qunit-1.11.0.js  > ext-lib/qunit.js
curl http://code.jquery.com/qunit/qunit-1.11.0.css > ext-lib/qunit.css

curl https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js   > ext-lib/bootstrap.js
curl https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css > ext-lib/bootstrap.css


echo "Done"
