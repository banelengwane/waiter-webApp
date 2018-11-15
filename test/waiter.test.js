const assert = require('assert');
const pg = require('pg');
const Pool = pg.Pool;
const Waiters = require('../waiter');

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost/waiters';

const pool = new Pool({
    connectionString
});


describe('The basic database web app', function () {
    beforeEach(async function () {
        await pool.query('delete from waitersTb;');
    });

    it('should pass', async function () {
        assert.equal(1, 2);
    });
    after(function () {
        pool.end();
    });
});
