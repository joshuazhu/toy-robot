const { LeftCommand } = require('./LeftCommand');
const { NORTH, EAST, SOUTH, WEST } = require('../constants/directions');

describe('LeftCommand tests', () => {
  describe('Test handle', () => {
    const { Robot } = require('../models/Robot');

    it('should throw an error when there is no robot', () => {
      const leftCommand = new LeftCommand();
      expect(() => {
        leftCommand.handle();
      }).toThrowError('Please initialise a robot');
    });

    it('should throw an error when robot has not been placed on table', () => {
      const robot = new Robot();
      const leftCommand = new LeftCommand(robot);
      expect(() => {
        leftCommand.handle();
      }).toThrowError('Robot is not on table, please run PLACE command first');
    });

    it('should turn to WEST when robot current direction is NORTH', () => {
      const robot = new Robot(1, 2, NORTH);
      const leftCommand = new LeftCommand(robot);
      leftCommand.handle();

      expect(robot.direction).toEqual(WEST);
    });

    it('should turn to SOUTH when robot current direction is WEST', () => {
      const robot = new Robot(1, 2, WEST);
      const leftCommand = new LeftCommand(robot);
      leftCommand.handle();

      expect(robot.direction).toEqual(SOUTH);
    });

    it('should turn to EAST when robot current direction is SOUTH', () => {
      const robot = new Robot(1, 2, SOUTH);
      const leftCommand = new LeftCommand(robot);
      leftCommand.handle();

      expect(robot.direction).toEqual(EAST);
    });

    it('should turn to NORTH when robot current direction is EAST', () => {
      const robot = new Robot(1, 2, EAST);
      const leftCommand = new LeftCommand(robot);
      leftCommand.handle();

      expect(robot.direction).toEqual(NORTH);
    });

    it('should throw error when robot facing invalid direction', () => {
      const robot = new Robot(1, 2, 'PIKACHU');
      const leftCommand = new LeftCommand(robot);

      expect(() => {
        leftCommand.handle();
      }).toThrowError('Invalid robot direction');
    });
  });
});
