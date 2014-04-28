/*global it, describe,*/
var request = require('request'),
  assert = require('assert');

var coreJson; //store core json feed here for further use;

describe('API CALL UNIT TESTING', function () {
  // GET properties
  describe('GET localhost:3000/coreList', function () {
    it("should respond with status 200", function (done) {
      request('http://localhost:3000/coreList', function (err, resp) {
        assert.equal(resp.statusCode, 200);
          console.log("typeof resp:" + typeof(resp))
               console.log();
        done();


      });
    });
  });


    // GET properties
    describe('check that response body exists', function () {
        it("typeof body should equal string", function (done) {
            request('http://localhost:3000/coreList', function (err, resp, body) {
                assert.equal(typeof(body), "string");
                if(typeof(body)!="undefined")
                {
                    coreJson=JSON.parse(body);
                }
                done();
            });
        });
    });

    // GET properties
    describe('check that body exists', function () {

        it("JSON.Parse(body) creates a valid object", function (done) {
            request('http://localhost:3000/coreList', function (err, resp, body) {

                if(typeof(body)!="undefined")
                {
                    coreJson=JSON.parse(body);
                }
                console.log(body);
                assert.equal(typeof(coreJson),"object" );

                done();
            });



        });
    });



});
