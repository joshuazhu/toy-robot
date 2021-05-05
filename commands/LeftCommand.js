const { Command } = require('./Command');
const { NORTH, WEST, SOUTH, EAST } = require('../constants/directions');

class LeftCommand extends Command {
  handle () {
    super.handle();
    switch (this.robot.direction) {
      case EAST:
        this.robot.direction = NORTH;
        break;

      case NORTH:
        this.robot.direction = WEST;
        break;

      case WEST:
        this.robot.direction = SOUTH;
        break;

      case SOUTH:
        this.robot.direction = EAST;
        break;

      default:
        throw new Error('Invalid robot direction');
    }
  }
}

module.exports = {
  LeftCommand
};
