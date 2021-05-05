class Command {
  constructor (robot) {
    this.robot = robot;
  }

  handle () {
    if (!this.robot) {
      throw new Error('Please initialise a robot');
    }

    if (!this.robot.isPlacedOnTable()) {
      throw new Error('Robot is not on table, please run PLACE command first');
    }
  }
}

module.exports = {
  Command
};
