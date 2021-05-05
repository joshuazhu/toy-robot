const { Command } = require('./Command');
const { NORTH, WEST, SOUTH, EAST } = require('../constants/directions');

class PlaceCommand extends Command {
  constructor (robot, table) {
    super(robot);
    this.table = table;
  }

  handle (x, y, direction) {
    if (!this.robot) {
      throw new Error('Please initialise a robot');
    }

    if (!this.table) {
      throw new Error('Please initialise a table');
    }

    if (!this.table.validate(x, y)) {
      throw new Error('Robot is placed at an invalid place, please try again');
    }

    if (![NORTH, WEST, SOUTH, EAST].includes(direction)) {
      throw new Error('Robot is placed at an invalid direction, please try again');
    }

    this.robot.x = x;
    this.robot.y = y;
    this.robot.direction = direction;
  }
}

module.exports = {
  PlaceCommand
};
