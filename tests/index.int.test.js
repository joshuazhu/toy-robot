const { Table } = require('../models/Table');
const { CommandHandler } = require('../commandHandler');

let robot;
let table;
let commandHandler;
const mockedOutput = jest.fn();

describe('integration tests', () => {
  beforeAll(() => {
    jest.mock('../utils/output.js', () => ({
      output: mockedOutput
    }));
  });

  beforeEach(() => {
    const { Robot } = require('../models/Robot');
    robot = new Robot();
    table = new Table();
    commandHandler = new CommandHandler(robot, table);

    mockedOutput.mockClear();
  });

  it('should throw error when robot not place on table', () => {
    const commands = ['MOVE', 'LEFT', 'RIGHT', 'REPORT'];

    commands.forEach(command => expect(() => {
      commandHandler.execute(command);
    }).toThrowError('Robot is not on table, please run PLACE command first'));
  });

  it('should place robot on valid position', () => {
    commandHandler.execute('PLACE 1,1,NORTH');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'NORTH' });
  });

  it('should throw error when place robot to invalid place', () => {
    expect(() => {
      commandHandler.execute('PLACE 10,10,NORTH');
    }).toThrowError('Robot is placed at an invalid place, please try again');
  });

  it('should be able to turn right', () => {
    commandHandler.execute('PLACE 1,1,NORTH');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'NORTH' });

    commandHandler.execute('RIGHT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'EAST' });

    commandHandler.execute('RIGHT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'SOUTH' });

    commandHandler.execute('RIGHT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'WEST' });

    commandHandler.execute('RIGHT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'NORTH' });
  });

  it('should be able to turn left', () => {
    commandHandler.execute('PLACE 1,1,NORTH');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'NORTH' });

    commandHandler.execute('LEFT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'WEST' });

    commandHandler.execute('LEFT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'SOUTH' });

    commandHandler.execute('LEFT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'EAST' });

    commandHandler.execute('LEFT');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'NORTH' });
  });

  it('should be able to move to all directions', () => {
    commandHandler.execute('PLACE 1,1,NORTH');
    commandHandler.execute('MOVE');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 2, direction: 'NORTH' });

    commandHandler.execute('RIGHT');
    commandHandler.execute('MOVE');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 2, y: 2, direction: 'EAST' });

    commandHandler.execute('LEFT');
    commandHandler.execute('MOVE');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 2, y: 3, direction: 'NORTH' });

    commandHandler.execute('LEFT');
    commandHandler.execute('MOVE');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 3, direction: 'WEST' });

    commandHandler.execute('LEFT');
    commandHandler.execute('MOVE');
    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 2, direction: 'SOUTH' });
  });

  it('should throw error when robot move outside edge and ignore last invalid move', () => {
    commandHandler.execute('PLACE 1,1,NORTH');
    commandHandler.execute('LEFT');
    commandHandler.execute('MOVE');

    expect(() => {
      commandHandler.execute('MOVE');
    }).toThrowError('Invalid moving position');

    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 0, y: 1, direction: 'WEST' });
  });

  it('should throw error and ignore all invalid commands', () => {
    commandHandler.execute('PLACE 1,1,NORTH');

    const invalidCommands = ['INVALID', 'PIKACHU', 'POKAMON'];
    invalidCommands.map(command => expect(() => {
      commandHandler.execute(command);
    }).toThrowError('Invalid command'));

    commandHandler.execute('REPORT');
    expect(mockedOutput).toBeCalledWith({ x: 1, y: 1, direction: 'NORTH' });
  });
});
