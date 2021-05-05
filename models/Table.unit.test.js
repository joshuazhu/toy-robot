const { Table } = require('./Table.js');

describe('Table tests', () => {
  describe('Test constructor', () => {
    it('should create 5 x 5 dimension table by default', () => {
      const table = new Table();
      expect(table.dimensionX).toEqual(5);
      expect(table.dimensionY).toEqual(5);
    });

    it('should create a table base on dimension parameter', () => {
      const table = new Table(6, 7);
      expect(table.dimensionX).toEqual(6);
      expect(table.dimensionY).toEqual(7);
    });
  });

  describe('Test validate', () => {
    it('should return false when either coordinator x < 0 or coordinator y < 0', () => {
      const table = new Table(6, 7);
      expect(table.validate(-1, 1)).toEqual(false);
      expect(table.validate(1, -1)).toEqual(false);
    });

    it('should return false when coordinator outside table dimension', () => {
      const table = new Table(6, 7);
      expect(table.validate(10, 1)).toEqual(false);
      expect(table.validate(1, 9)).toEqual(false);
    });

    it('should return true for a NORTH edge position', () => {
      const table = new Table(5, 5);
      expect(table.validate(0, 4)).toEqual(true);
    });

    it('should return true for an EAST edge position', () => {
      const table = new Table(5, 5);
      expect(table.validate(4, 0)).toEqual(true);
    });

    it('should return true for a SOUTH edge position', () => {
      const table = new Table(5, 5);
      expect(table.validate(2, 0)).toEqual(true);
    });

    it('should return true for a WEST edge position', () => {
      const table = new Table(5, 5);
      expect(table.validate(0, 2)).toEqual(true);
    });

    it('should return true for a valid coordinator ', () => {
      const table = new Table(6, 7);
      expect(table.validate(1, 1)).toEqual(true);
    });
  });
});
