const Pool = require('pg').Pool;
const Storage = require('../service/storage');
const User = require("../model/user");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user',
    password: 'postgres',
    port: 5432,
});

class dbUserService extends Storage {

    constructor() {
        super();
    }

    async create(user) {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [user.name, user.email]
        );
        return {id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email};
    }

    async clear() {
        await pool.query('DELETE FROM users');
    }

    async getAll() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    async getById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    async update(id, user) {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            [user.name, user.email, id]
        );
        if (result.rowCount !== 0) {
            return result.rows[0];
        } else return null;
    }

    async delete(id) {
        try {
            const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return result.rowCount > 0;
        } catch (error) {
            return false;
        }
    }
}

module.exports = dbUserService;
