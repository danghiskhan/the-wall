var WIDTH = 32;
var HEIGHT = 18;

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