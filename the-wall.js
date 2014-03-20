Squares = new Meteor.Collection('squares');

var WIDTH = 32;
var HEIGHT = 18;

if (Meteor.isClient) {
  Template.wall.rows = function() {
    var rows = [];

    for (var i = 0; i < HEIGHT; i++) {
      rows.push({
        squares: Squares.find({ y: i })
      });
    };

    return rows;
  };

  Template.color_picker.rendered = function() {
    var startColor = Random.hexString(6);

    $('#selected-color').val(startColor);

    $('#color-picker').ColorPicker({
      flat: true,
      color: '#' + startColor,
      onChange: function(hsb, hex) {
        $('#selected-color').val(hex);  
      }
    });
  };

  Template.square.events({
    'click': function() {
      Meteor.call('updateSquare', this._id, $('#selected-color').val());
    }
  });
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

Meteor.methods({
  updateSquare: function(id, color) {
    var isAColor  = /^[0-9A-F]{6}$/i.test(color);

    if (isAColor) {
      Squares.update({
        _id: id
      }, { 
        $set: { 
          color: '#' + color 
        }
      });
    } else {
      throw new Meteor.Error(404, "Not a valid colour");
    }
  }
});
