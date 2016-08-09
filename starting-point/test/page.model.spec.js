var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var models = require('../models');
var Page = models.Page;
var page;


describe('Page model', function () {

  describe('Virtuals', function () {
      beforeEach(function(){
        page = Page.build();
        })
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"',function (){
            page.urlTitle = 'some_title';
            expect(page.route).to.equal("/wiki/some_title");
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
          page.content= "This is some content!  This is smaller content!";
          console.log(page.renderedContent);
          expect(page.renderedContent).to.equal('<p>This is some content!  This is smaller content!</p>\n');

      });
      
    });
  });

  describe('Class methods', function () {
    beforeEach(function(done){
        Page.create({
            tags: ['cool', 'awesome', 'sam'],
            title: "create a new title",
            content: "this is a test"
        }).then(function(){
            done();
        }).catch(done);
    })
    describe('findByTag', function (done) {
      it('gets pages with the search tag', function(done){
   
          Page.findByTag('cool')
          .then(function(pages){
              expect(pages).to.have.lengthOf(1);
              done();
          })
          .catch(done);
          
      });
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});