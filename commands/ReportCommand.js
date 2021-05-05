const { Command } = require('./Command');

class ReportCommand extends Command {
  handle () {
    super.handle();
    this.robot.print();
  }
}

module.exports = {
  ReportCommand
};
