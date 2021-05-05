const { PlaceCommand } = require('./PlaceCommand');
const { Table } = require('../models/Table');
const { NORTH } = require('../constants/directions');

describe('PlaceCommand tests', () => {
  describe('Test handle', () => {
    const { Robot } = require('../models/Robot');

    it('should throw an error when there is no robot', () => {
      const placeCommand = new PlaceCommand();
      expect(() => {
        placeCommand.handle();
      }).toThrowError('Please initialise a robot');
    });

    it('should throw an error when there is no table', () => {
      const robot = new Robot();
      const placeCommand = new PlaceCommand(robot);
      expect(() => {
        placeCommand.handle();
      }).toThrowError('Please initialise a table');
    });

    it('should throw an error when x outside table dimension', () => {
      const robot = new Robot();
      const table = new Table();
      const placeCommand = new PlaceCommand(robot, table);
      expect(() => {
        placeCommand.handle(10, 1, NORTH);
      }).toThrowError('Robot is placed at an invalid place, please try again');
    });

    it('should throw an error when y outside table dimension', () => {
      const robot = new Robot();
      const table = new Table();
      const placeCommand = new PlaceCommand(robot, table);
      expect(() => {
        placeCommand.handle(1, 10, NORTH);
      }).toThrowError('Robot is placed at an invalid place, please try again');
    });

    it('should throw an error when direction is invalid', () => {
      const robot = new Robot();
      const table = new Table();
      const placeCommand = new PlaceCommand(robot, table);
      expect(() => {
        placeCommand.handle(1, 1, 'invalid');
      }).toThrowError('Robot is placed at an invalid direction, please try again');
    });

    it('should place robot at a valid position', () => {
      const robot = new Robot();
      const table = new Table();
      const placeCommand = new PlaceCommand(robot, table);
      placeCommand.handle(1, 1, NORTH);

      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(1);
      expect(robot.direction).toEqual(NORTH);
    });
  });
});
