const assert = require('assert')
const restartor = require('../index')

describe('make-it-restart', () => {
    it('test wrong command', () => {
        try {
            restartor({}, {})
        } catch (err) {
            assert(err.message, 'right command needed')
        }
    })
})
