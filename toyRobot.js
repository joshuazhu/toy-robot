const { Robot, Table } = require('./models');
const { CommandHandler } = require('./commandHandler');
const { input } = require('./utils/input');

class ToyRobot {
  constructor() {
    this.question = {
      type: 'input',
      name: 'command',
      message:
        'Please enter your command, or type "list" to show available commands, "exit" to quit the program:'
    };
    this.commandHandler = new CommandHandler(new Robot(), new Table(5, 5));
  }

  async run() {
    const { command } = await input(this.question);
    if (command === 'exit') {
      console.log('exiting program');
      return;
    } else if (command === 'list') {
      console.log(`
      PLACE <x>,<y>,<facing>
      MOVE
      LEFT
      RIGHT
      REPORT
      `);
    } else {
      try {
        this.commandHandler.execute(command);
      } catch (e) {
        console.log(e.message);
      }
    }

    this.run();
  }
}

module.exports = {
  ToyRobot
};
