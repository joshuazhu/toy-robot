const { Command } = require('./Command');
const { NORTH, WEST, SOUTH, EAST } = require('../constants/directions');

class MoveCommand extends Command {
  constructor (robot, table) {
    super(robot);
    this.table = table;
  }

  handle () {
    super.handle();
    if (!this.table) {
      throw new Error('Please initialise a table');
    }

    let nextX = this.robot.x;
    let nextY = this.robot.y;

    switch (this.robot.direction) {
      case NORTH:
        nextY = nextY + 1;
        break;
      case EAST:
        nextX = nextX + 1;
        break;
      case SOUTH:
        nextY = nextY - 1;
        break;
      case WEST:
        nextX = nextX - 1;
        break;

      default:
        throw new Error('Invalid robot direction');
    }

    if (!this.table.validate(nextX, nextY)) {
      throw new Error('Invalid moving position');
    }

    this.robot.move(nextX, nextY);
  }
}

module.exports = {
  MoveCommand
};
