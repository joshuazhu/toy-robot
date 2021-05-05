const { ReportCommand } = require('./ReportCommand');
const { NORTH } = require('../constants/directions');

describe('ReportCommand tests', () => {
  describe('Test handle', () => {
    const mockedPrint = jest.fn();
    const { Robot } = require('../models/Robot');
    Robot.prototype.print = mockedPrint;

    it('should throw an error when there is no robot', () => {
      const reportCommand = new ReportCommand();
      expect(() => {
        reportCommand.handle();
      }).toThrowError('Please initialise a robot');
    });

    it('should throw an error when robot has not been placed on table', () => {
      const robot = new Robot();
      const reportCommand = new ReportCommand(robot);
      expect(() => {
        reportCommand.handle();
      }).toThrowError('Robot is not on table, please run PLACE command first');
    });

    it('should print robot position', () => {
      const robot = new Robot(1, 2, NORTH);
      const reportCommand = new ReportCommand(robot);
      reportCommand.handle();

      expect(mockedPrint).toHaveBeenCalledTimes(1);
    });
  });
});
