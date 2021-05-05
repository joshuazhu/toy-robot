const { DEFAULT_DIMENSION } = require('../constants/defaults');

class Table {
  constructor (dimensionX = DEFAULT_DIMENSION, dimensionY = DEFAULT_DIMENSION) {
    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
  }

  validate (x, y) {
    return x >= 0 && x < this.dimensionX && y >= 0 && y < this.dimensionY;
  }
}

module.exports = {
  Table
};
