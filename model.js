Squares = new Meteor.Collection('squares');

Meteor.methods({
  updateSquare: function(id, color) {
    var isAColor  = /^[0-9A-F]{6}$/i.test(color);

    if (isAColor) {
      Squares.update({
        _id: id
      }, { 
        $set: { 
          color: color 
        }
      });
    } else {
      throw new Meteor.Error(404, "Not a valid colour");
    }
  }
});
