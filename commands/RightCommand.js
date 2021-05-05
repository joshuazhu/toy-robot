const { Command } = require('./Command');
const { NORTH, WEST, SOUTH, EAST } = require('../constants/directions');

class RightCommand extends Command {
  handle () {
    super.handle();
    switch (this.robot.direction) {
      case NORTH:
        this.robot.direction = EAST;
        break;

      case WEST:
        this.robot.direction = NORTH;
        break;

      case SOUTH:
        this.robot.direction = WEST;
        break;

      case EAST:
        this.robot.direction = SOUTH;
        break;

      default:
        throw new Error('Invalid robot direction');
    }
  }
}

module.exports = {
  RightCommand
};
