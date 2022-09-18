const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const baseUrl = "localhost:5001"
chai.use(chaiHttp);       //testing using mocha

// Written by Hongru Lin and Monish
describe("Tweet Test", function(){
    //test tweet retrieval
    it('Retrieve tweet success', function(done) {
        chai.request(baseUrl)
        .get('/retrieve')
        .query({ tweetId: '1571292369370357765' })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            let result = JSON.parse(res.text);
            expect(result.code).to.equal(200);
            expect(result.message).to.equal("tweet api test");
            done();
        });
    });
    
    it('Retrieve tweet fail', function(done) {
        chai.request(baseUrl)
        .get('/retrieve')
        .query({ tweetId: '12345' })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            let result = JSON.parse(res.text);
            expect(result.code).to.equal(400);
            expect(result.message).to.equal("Invalid Tweet ID");
            done();
        });
    });

    // test tweet delete
    it('Delete tweet success', function(done) {
        chai.request(baseUrl)
        .get('/delete')
        .query({ tweetId: '1571372455293497347' })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            let result = JSON.parse(res.text);
            expect(result.code).to.equal(200);
            expect(result.message).to.equal("Tweet has been deleted");
            done();
        });
    });

    //test tweet creation
    it('Create tweet', function(done) {
        chai.request(baseUrl)
        .get('/create')
        .query({ message: 'twitter api test for project' })
        .end(function (err, res) {
            expect(res.status).to.equal(200);
            let result = JSON.parse(res.text);
            expect(result.code).to.equal(200);
            expect(result.message).to.equal("Tweet created successfully");
            done();
        });
    });
    
});
