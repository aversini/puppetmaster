module.exports = {
  setupTestFrameworkScriptFile: './jest-helper.js',
  reporters: ['default', 'jest-screenshot/reporter'],
  testMatch: ['**/lib/puppetmaster.js']
};
