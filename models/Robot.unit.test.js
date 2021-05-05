const {
  NORTH,
  WEST
} = require('../constants/directions');

describe('Robot tests', () => {
  const mockedOutput = jest.fn();
  jest.mock('../utils/output.js', () => ({
    output: mockedOutput
  }));
  const { Robot } = require('./Robot.js');

  describe('Test constructor', () => {
    it('should create a Robot base on parameter', () => {
      const robot = new Robot(6, 7, WEST);
      expect(robot.x).toEqual(6);
      expect(robot.y).toEqual(7);
      expect(robot.direction).toEqual(WEST);
    });
  });

  describe('Test isPlacedOnTable', () => {
    it('should return true when robot has x, y coordinator and has direction', () => {
      const robot = new Robot(6, 7, WEST);
      expect(robot.isPlacedOnTable()).toEqual(true);
    });

    it('should return false when robot x or y or direction is undefined', () => {
      const robot = new Robot();
      expect(robot.isPlacedOnTable()).toEqual(false);
    });
  });

  describe('Test move', () => {
    it('Robot should move to destination coordinator', () => {
      const robot = new Robot(6, 7, WEST);
      robot.move(1, 2);
      expect(robot.x).toEqual(1);
      expect(robot.y).toEqual(2);
    });
  });

  describe('Test turn', () => {
    it('Robot should turn to destination direction', () => {
      const robot = new Robot(6, 7, WEST);
      robot.turn(NORTH);
      expect(robot.direction).toEqual(NORTH);
    });
  });

  describe('Test print position', () => {
    it('Robot should print current position', () => {
      const robot = new Robot(6, 7, WEST);
      robot.move(1, 2);
      robot.print();
      expect(mockedOutput).toBeCalledWith({ x: 1, y: 2, direction: WEST });
    });
  });
});
