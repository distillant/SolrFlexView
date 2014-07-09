/*global it, describe,*/
var request = require('request'),
  assert = require('assert');

var coreJson; //store core json feed here for further use;

describe('API UNIT TESTING- Core feed', function () {
  // GET properties
  describe('GET localhost:3000/coreList', function () {
    it("should respond with status 200", function (done) {
      request('http://localhost:3000/coreList', function (err, resp) {
        assert.equal(resp.statusCode, 200);

        done();


      });
    });
  });


    // GET properties
    describe('Core feed', function () {
        it("typeof body should equal string", function (done) {
                request('http://localhost:3000/coreList', function (err, resp, body) {
                    assert.equal(typeof(body), "string");
                   /* if(typeof(body)!="undefined")
                    {
                        coreJson=JSON.parse(body);
                    }*/
                done();
            });
        });
    });

    // GET properties
    describe('Core feed', function () {

        it("JSON.Parse(body) creates a valid object", function (done) {
            request('http://localhost:3000/coreList', function (err, resp, body) {

               // if(typeof(body)!="undefined")
               // {
               coreJson=JSON.parse(body);
              //  }

                assert.equal(typeof(coreJson),"object" );

                done();
            });
        });
    });
    // GET properties
    describe('Core feed', function () {
        it("check that cores list has more than 1 item", function (done) {
            assert.equal((coreJson.length > 0),true );
            done();

        });
    });
    describe('Core feed', function () {
        it("check that core has a name", function (done) {
            if (coreJson.length > 0)
            var core= coreJson[0];
            assert.equal(typeof(core.name) == "undefined", false  );

            done();
        });
    });

});


describe('API UNIT TESTING- fields field', function () {
    // GET properties

    describe('GET localhost:3000/fields/:core', function () {
        it("get fields list for core", function (done) {
            var core= coreJson[0];
            request('http://localhost:3000/fields/'+core.name, function (err, resp) {
                assert.equal(resp.statusCode, 200);
                done();


            });
        });
    });
});
