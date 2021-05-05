const { MoveCommand } = require('./MoveCommand');
const { Table } = require('../models/Table');
const { NORTH, EAST, SOUTH, WEST } = require('../constants/directions');

describe('MoveCommand tests', () => {
  describe('Test handle', () => {
    const { Robot } = require('../models/Robot');

    it('should throw an error when there is no robot', () => {
      const moveCommand = new MoveCommand();
      expect(() => {
        moveCommand.handle();
      }).toThrowError('Please initialise a robot');
    });

    it('should throw an error when there is no table', () => {
      const robot = new Robot(1, 1, NORTH);
      const moveCommand = new MoveCommand(robot);
      expect(() => {
        moveCommand.handle();
      }).toThrowError('Please initialise a table');
    });

    it('should throw an error when robot has not been placed on table', () => {
      const robot = new Robot();
      const moveCommand = new MoveCommand(robot);
      expect(() => {
        moveCommand.handle();
      }).toThrowError('Robot is not on table, please run PLACE command first');
    });

    it('should ignore when robot to be moved outside NORTH edge', () => {
      const table = new Table(5, 5);
      const robot = new Robot(0, 4, NORTH);
      const moveCommand = new MoveCommand(robot, table);

      expect(() => {
        moveCommand.handle();
      }).toThrowError('Invalid moving position');

      expect(robot.x).toEqual(0);
      expect(robot.y).toEqual(4);
    });

    it('should ignore when robot to be moved outside EAST edge', () => {
      const table = new Table(5, 5);
      const robot = new Robot(4, 0, EAST);
      const moveCommand = new MoveCommand(robot, table);

      expect(() => {
        moveCommand.handle();
      }).toThrowError('Invalid moving position');

      expect(robot.x).toEqual(4);
      expect(robot.y).toEqual(0);
    });

    it('should ignore when robot to be moved outside SOUTH edge', () => {
      const robot = new Robot(0, 0, SOUTH);
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);

      expect(() => {
        moveCommand.handle();
      }).toThrowError('Invalid moving position');

      expect(robot.x).toEqual(0);
      expect(robot.y).toEqual(0);
    });

    it('should ignore when robot to be moved outside WEST edge', () => {
      const robot = new Robot(0, 0, WEST);
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);

      expect(() => {
        moveCommand.handle();
      }).toThrowError('Invalid moving position');

      expect(robot.x).toEqual(0);
      expect(robot.y).toEqual(0);
    });

    it('should move to x + 1 when robot facing EAST', () => {
      const robot = new Robot(1, 1, EAST);
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);

      moveCommand.handle();

      expect(robot.x).toEqual(2);
      expect(robot.y).toEqual(1);
    });

    it('should move to x - 1 when robot facing WEST', () => {
      const robot = new Robot(1, 1, WEST);
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);

      moveCommand.handle();

      expect(robot.x).toEqual(0);
      expect(robot.y).toEqual(1);
    });

    it('should move to y + 1 when robot facing NORTH', () => {
      const robot = new Robot(1, 1, NORTH);
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);

      moveCommand.handle();

      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(2);
    });

    it('should move to y - 1 when robot facing SOUTH', () => {
      const robot = new Robot(1, 1, SOUTH);
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);

      moveCommand.handle();

      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(0);
    });

    it('should throw error when robot facing invalid direction', () => {
      const robot = new Robot(1, 1, 'PIKACHU');
      const table = new Table(5, 5);
      const moveCommand = new MoveCommand(robot, table);
      expect(() => {
        moveCommand.handle();
      }).toThrowError('Invalid robot direction');
    });
  });
});
