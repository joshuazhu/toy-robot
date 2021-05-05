const { output } = require('../utils/output');

class Robot {
  constructor (x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move (x, y) {
    this.x = x;
    this.y = y;
  }

  turn (direction) {
    this.direction = direction;
  }

  isPlacedOnTable () {
    return this.x >= 0 && this.y >= 0 && !!this.direction;
  }

  print () {
    output({ x: this.x, y: this.y, direction: this.direction });
  }
}

module.exports = {
  Robot
};
