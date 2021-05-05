const { Command } = require('./Command');
const { Robot } = require('../models/Robot');

describe('Command tests', () => {
  describe('Test handle', () => {
    it('should throw an error when there is no robot', () => {
      const command = new Command();
      expect(() => {
        command.handle();
      }).toThrowError('Please initialise a robot');
    });

    it('should throw an error when robot has not been placed on table', () => {
      const robot = new Robot();
      const command = new Command(robot);
      expect(() => {
        command.handle();
      }).toThrowError('Robot is not on table, please run PLACE command first');
    });
  });
});
