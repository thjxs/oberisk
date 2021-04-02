const fs = require('fs');
const { load } = require('js-yaml');

/**
 * Load oberisk.yml
 */
module.exports = function getConfig() {
  try {
    return load(fs.readFileSync('./oberisk.yml', 'utf-8'));
  } catch (error) {
    throw new Error('Please create a config file "oberisk.yml"');
  }
};
