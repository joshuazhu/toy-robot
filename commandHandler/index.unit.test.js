describe('CommandHandler tests', () => {
  describe('Test validateCommand', () => {
    const { CommandHandler } = require('./index');
    it('should throw an error when command is not a string', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand(123);
      }).toThrowError('Invalid command');
    });

    it('should throw an error when command is not "MOVE", "LEFT", "RIGHT", "REPORT" or "PLACE"', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('Invalid');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when "PLACE" command parameter is empty', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('PLACE');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when the number of "PLACE" command parameter is incorrect', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('PLACE 1,2,3,4');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when passing parameter to command "MOVE"', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('MOVE 1');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when passing parameter to command "LEFT"', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('LEFT 1');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when passing parameter to command "RIGHT"', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('RIGHT 1');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when passing parameter to command "REPORT"', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.validateCommand('REPORT 1');
      }).toThrowError('Invalid command');
    });

    it('should not throw error for valid "PLACE" command', () => {
      const commandHandler = new CommandHandler();
      commandHandler.validateCommand('PLACE 1,2,NORTH');
    });

    it('should not throw error for valid "MOVE" command', () => {
      const commandHandler = new CommandHandler();
      commandHandler.validateCommand('MOVE');
    });

    it('should not throw error for valid "LEFT" command', () => {
      const commandHandler = new CommandHandler();
      commandHandler.validateCommand('LEFT');
    });

    it('should not throw error for valid "RIGHT" command', () => {
      const commandHandler = new CommandHandler();
      commandHandler.validateCommand('RIGHT');
    });

    it('should not throw error for valid "REPORT" command', () => {
      const commandHandler = new CommandHandler();
      commandHandler.validateCommand('REPORT');
    });
  });

  describe('Test parseCommand', () => {
    const { CommandHandler } = require('./index');
    it('should return command object for "MOVE" command', () => {
      const commandHandler = new CommandHandler();
      expect(commandHandler.parseCommand('MOVE')).toEqual({
        command: 'MOVE'
      });
    });

    it('should return command object for "LEFT" command', () => {
      const commandHandler = new CommandHandler();
      expect(commandHandler.parseCommand('LEFT')).toEqual({
        command: 'LEFT'
      });
    });

    it('should return command object for "RIGHT" command', () => {
      const commandHandler = new CommandHandler();
      expect(commandHandler.parseCommand('RIGHT')).toEqual({
        command: 'RIGHT'
      });
    });

    it('should return command object for "MOVE" command', () => {
      const commandHandler = new CommandHandler();
      expect(commandHandler.parseCommand('MOVE')).toEqual({
        command: 'MOVE'
      });
    });

    it('should return command object for "REPORT" command', () => {
      const commandHandler = new CommandHandler();
      expect(commandHandler.parseCommand('REPORT')).toEqual({
        command: 'REPORT'
      });
    });

    it('should throw an error when "PLACE" parameters are of string type', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.parseCommand('PLACE a,b,c');
      }).toThrowError('Invalid command');
    });

    it('should throw an error when "PLACE" parameters are of double type', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.parseCommand('PLACE 1.1,1.2,c');
      }).toThrowError('Invalid command');
    });

    it('should return  when "PLACE" parameters are of wrong type', () => {
      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.parseCommand('PLACE a,b,c');
      }).toThrowError('Invalid command');
    });
  });

  describe('Test execute', () => {
    it('should execute valid "PLACE" command', () => {
      const mockHandle = jest.fn();
      const { PlaceCommand } = require('../commands');
      PlaceCommand.prototype.handle = mockHandle;

      const { CommandHandler } = require('./index');

      const commandHandler = new CommandHandler();
      commandHandler.execute('PLACE 1,2,NORTH');

      expect(mockHandle).toBeCalledWith(1, 2, 'NORTH');
      expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should execute valid "MOVE" command', () => {
      const mockHandle = jest.fn();
      const { MoveCommand } = require('../commands');
      MoveCommand.prototype.handle = mockHandle;

      const { CommandHandler } = require('./index');

      const commandHandler = new CommandHandler();
      commandHandler.execute('MOVE');

      expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should execute valid "LEFT" command', () => {
      const mockHandle = jest.fn();
      const { LeftCommand } = require('../commands');
      LeftCommand.prototype.handle = mockHandle;

      const { CommandHandler } = require('./index');

      const commandHandler = new CommandHandler();
      commandHandler.execute('LEFT');

      expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should execute valid "RIGHT" command', () => {
      const mockHandle = jest.fn();
      const { RightCommand } = require('../commands');
      RightCommand.prototype.handle = mockHandle;

      const { CommandHandler } = require('./index');

      const commandHandler = new CommandHandler();
      commandHandler.execute('RIGHT');

      expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should execute valid "REPORT" command', () => {
      const mockHandle = jest.fn();
      const { ReportCommand } = require('../commands');
      ReportCommand.prototype.handle = mockHandle;

      const { CommandHandler } = require('./index');

      const commandHandler = new CommandHandler();
      commandHandler.execute('REPORT');

      expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it('should throw exception for invalid command', () => {
      const { CommandHandler } = require('./index');

      const commandHandler = new CommandHandler();
      expect(() => {
        commandHandler.execute('invalid');
      }).toThrowError('Invalid command');
    });
  });
});
