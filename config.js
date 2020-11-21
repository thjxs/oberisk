const fs = require('fs');
const { safeLoad } = require('js-yaml');

/**
 * Load oberisk.yml
 */
module.exports = function getConfig() {
  try {
    return safeLoad(fs.readFileSync('./oberisk.yml', 'utf-8'));
  } catch (error) {
    throw new Error('Please create a config file "oberisk.yml"');
  }
};
