Squares = new Meteor.Collection('squares');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to the wall.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.wall.squares = function() {
    return Squares.find();
  };

}

var WIDTH = 40;
var HEIGHT = 20;

if (Meteor.isServer) {
  var insertAllSquares = function() {
    if (Squares.find().count() === 0) {
      for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < HEIGHT; j++) {
          Squares.insert({
            x: i,
            y: j,
            color: Random.hexString(6)
          });
        };
      };
    }
  };

  Meteor.startup(function () {
    // code to run on server at startup

    insertAllSquares();
  });
}
