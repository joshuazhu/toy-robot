const { prompt } = require('inquirer');

const input = question => prompt([question]);

module.exports = { input };
