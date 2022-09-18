const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const baseUrl = "localhost:5001"
chai.use(chaiHttp);       //testing using mocha

describe("tweet Test", function(){
    //test tweet retrieval
    it('retrieved tweet', function(done) {
        chai.request(baseUrl)
        .get('/retrieve')
        .query({ tweetId: '1571290152634576902' })
        .end(function (err, res) {
            console.log(res.status);
            console.log(res.text);
            console.log("succesfully retrieved and tested")
            done();
        });
    });

    //test tweet delete
    it('to delete tweet', function(done) {
        chai.request(baseUrl)
        .get('/delete')
        .query({ tweetId: '1571290152634576902' })
        .end(function (err, res) {
            console.log(res.status);
            console.log(res.text);
            console.log("deleted successfully and tested")
            done();
        });
    });
    //test tweet creation
    
    it('create tweet', function(done) {
        chai.request(baseUrl)
        .get('/create')
        .query({ message: 'twitter api test for project' })
        .end(function (err, res) {
            console.log(res.status);
            twid=console.log(res.val);
            console.log("successfully created tweet and tested");
            done();
        });
    });
    
});
