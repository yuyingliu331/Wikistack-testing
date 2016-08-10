var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var models = require('../models');
var Page = models.Page;
var page, validate;
chai.should();
chai.use(require('chai-things'));
var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

describe('http requests', function () {

  describe('GET /wiki/', function () {
    beforeEach(function(done){
        Page.sync({force: true})
        .then(function (){
            Page.create({
                tags: ['cool', 'awesome', 'sam'],
                title: "create a new title",
                content: "this is a test"
            }).then(function(){
            Page.create({
            title: "Title 2",
            content: "Similar Content",
            tags : ['awesome', 'pretty', 'good']
            }).then(function(){
            Page.create({
            title: "Title 3",
            content: "Different Content",
            tags : ['rachel', 'great', 'fast']
        })
        .then(function(){
            Page.create({
            title: "Title 4",
            content: "Different Content",
            tags : ['sam', 'great', 'fast']
        })
        }).then(function(){
                done();
            }).catch(done);
        });
        })
    })
    })
   it('gets 200 on index', function (done) {
    agent
    .get('/wiki')
    .expect(200, done);
  });
  });

  describe('GET /wiki/add', function () {
    
    it('responds with 200', function(done) {
        agent
        .get('/wiki/add')
        .expect(200, done)
    });
  });

  describe('GET /wiki/:urlTitle', function () {
       beforeEach(function(done){
        Page.sync({force: true})
        .then(function (){
            Page.create({
                tags: ['cool', 'awesome', 'sam'],
                title: "create a new title",
                content: "this is a test"
            }).then(function(){
            Page.create({
            title: "Title 2",
            content: "Similar Content",
            tags : ['awesome', 'pretty', 'good']
            }).then(function(){
            Page.create({
            title: "Title 3",
            content: "Different Content",
            tags : ['rachel', 'great', 'fast']
        })
        .then(function(){
            Page.create({
            title: "Title 4",
            content: "Different Content",
            tags : ['sam', 'great', 'fast']
        })
        }).then(function(){
                done();
            }).catch(done);
        });
        })
    })
    })
    it('responds with 404 on page that does not exist', function(done) {
        agent
        .get('/wiki/rachel')
        .expect(404, done)
    });

    it('responds with 200 on page that does exist', function(done) {
        agent
        .get('/wiki/Title_3')
        .expect(200, done)
    });
  });

  describe('GET /wiki/search', function () {
    it('responds with 200', function(done){
        agent
        .get('/wiki/search')
        .expect(200, done)
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
      beforeEach(function(done){
        Page.sync({force: true})
        .then(function (){
            Page.create({
                tags: ['cool', 'awesome', 'sam'],
                title: "create a new title",
                content: "this is a test"
            }).then(function(){
            Page.create({
            title: "Title 2",
            content: "Similar Content",
            tags : ['awesome', 'pretty', 'good']
            }).then(function(){
            Page.create({
            title: "Title 3",
            content: "Different Content",
            tags : ['rachel', 'sad', 'happy']
        })
        .then(function(){
            Page.create({
            title: "Title 4",
            content: "Different Content",
            tags : ['sam', 'great', 'fast']
        })
        }).then(function(){
                done();
            }).catch(done);
        });
        })
    })
    })
    it('responds with 404 for page that does not exist',function(done){
        agent
        .get('/wiki/Title_5/similar')
        .expect(404, done);
    });
        
     it('responds with 200 for similar page', function(done){
         agent
         .get('/wiki/Title_2/similar')
         .expect(200, done);
     });
  });

  describe('POST /wiki', function () {
    it('responds with 302', function(done){
        agent
        .post('/wiki/')
        .send({title: 'a new article',
               content: 'this is a wonderful day',
               email: 'yuyin@gmail.com',
               author: 'Sarah Hann'
            })
            .then(function(page){
            //     expect(page.title).to.equal('a new article');
             console.log(page);
                done();
            })
        });
        
    it('creates a page in the database');
  });

});