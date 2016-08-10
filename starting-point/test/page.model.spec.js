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


describe('Page model', function () {

  describe('Virtuals', function () {
      beforeEach(function(){
        page = Page.build();
      });
    describe('route', function () {
      xit('returns the url_name prepended by "/wiki/"',function (){
            page.urlTitle = 'some_title';
            expect(page.route).to.equal("/wiki/some_title");
      });
    });
    describe('renderedContent', function () {
      xit('converts the markdown-formatted content into HTML', function(){
          page.content= "This is some content!  This is smaller content!";
          console.log(page.renderedContent);
          expect(page.renderedContent).to.equal('<p>This is some content!  This is smaller content!</p>\n');

      });
      
    });
  });

  describe('Class methods', function () {
    beforeEach(function(done){
      
    Page.sync({force: true})
      .then(function (){
        Page.create({
            tags: ['cool', 'awesome', 'sam'],
            title: "create a new title",
            content: "this is a test"
        }).then(function(){
            done();
        }).catch(done);
      });

    })
    describe('findByTag', function (done) {
      xit('gets pages with the search tag', function(done){
   
          Page.findByTag('cool')
          .then(function(pages){
              expect(pages).to.have.lengthOf(1);
              done();
          })
          .catch(done);
          
      });
      xit('does not get pages without the search tag', function(done){
        Page.findByTag('rachel')
        .then(function(pages){
          expect(pages).to.have.lengthOf(0);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('Instance methods', function () {
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
    describe('findSimilar', function () {
      
      xit('never gets itself', function(done){
        Page.findOne({
        where: {
          title: "create a new title"
        }
      }).then (function(page){
        return page.findSimilar();
      }).then(function(similar){
        similar.should.not.contain.a.thing.with.property('title', "create a new title");
          done();
      }).catch(done);
      });
      xit('gets other pages with any common tags', function(done){
         Page.findOne({
        where: {
          title: "create a new title"
        }
      }).then (function(page){
        return page.findSimilar();
      }).then(function(similar){
        similar.should.contain.a.thing.with.property('title', 'Title 4');
          done();
      }).catch(done);
      });
      xit('does not get other pages without any common tags', function(done){
         Page.findOne({
        where: {
          title: "create a new title"
        }
      }).then (function(page){
        return page.findSimilar();
      }).then(function(similar){
        similar.should.not.contain.a.thing.with.property('title', 'Title 3');
          done();
      }).catch(done);
      });
    });
})
  describe('Validations', function () {
     beforeEach(function(){
        page = Page.build({
          status: 'sam'
        });
       
      });
    xit('errors without title', function(done){
        page.validate().then( function(err){
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[0].path).to.equal('title');
          done();
        }).catch(done);
    });
    
    xit('errors without content', function(done){
        page.validate().then( function(err){
          expect(err).to.exist;
          expect(err.errors).to.exist;
          
          expect(err.errors[2].path).to.equal('content');
          done();
        }).catch(done);
    });
    xit('errors given an invalid status', function(done){
      page.title = "title";
      page.content = "content";
      
      page.save().then(function(sucess){
        throw new Error('page was validated');
      } ,function(err){
        expect(err).to.exist;
        expect(err.message).to.contain('invalid input value');
        done();
      })
    });
  });

  describe('Hooks', function () {
    beforeEach(function(){
        page = Page.build({
          title: 'rachel addleman',
          content: 'some content'
        });
    });
    xit('it sets urlTitle based on title before validating', function(done){
      page.save().then(function(){
      expect(page.urlTitle).to.equal('rachel_addleman');
      done();
      }).catch(done);
    });

  });
      
})