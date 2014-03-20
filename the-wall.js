Squares = new Meteor.Collection('squares');

var WIDTH = 16;
var HEIGHT = 9;

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

  Template.wall.rows = function() {
    var rows = [];

    for (var i = 0; i < HEIGHT; i++) {
      rows.push({
        squares: Squares.find({ y: i })
      });
    };

    return rows;
  };

}

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
