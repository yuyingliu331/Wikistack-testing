var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;


describe ('add', function(){
    xit('should add', function(){
        expect(2 + 2 ).to.equal(4);
    });
});

describe ('timeout', function() {
   xit('confirms setTimeout\'s timer accuracy', function (done) {
  var start = new Date();
  setTimeout(function () {
    var duration = new Date() - start;
    expect(duration).to.be.closeTo(1000, 50);
    done();
  }, 1000);
});
});

describe ('spy', function() {
    xit('confirms how many times it has been run.', function(){
        var names = ['Rachel', 'Sam', 'Emily']
        function logName(name){
                console.log(name);
            }
        logName = chai.spy(logName);
        names.forEach(logName);
        expect(logName).to.have.been.called.exactly(names.length);
    });
});
