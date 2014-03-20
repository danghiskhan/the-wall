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