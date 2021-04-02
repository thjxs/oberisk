const getConfig = require('../config');
const assert = require('assert');

describe('load yaml file', () => {
  it('load oberisk config', () => {
    const config = getConfig()
    assert.strictEqual(config.auth, 'auth')
    assert.strictEqual(config.owner, 'owner')
  })
})
