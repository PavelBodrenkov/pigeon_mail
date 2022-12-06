const jwt = require('jsonwebtoken');
const db = require('../db');
const {JWT_ACCESS_TOKEN, NODE_ENV
} = process.env;

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(
            payload,
            NODE_ENV === 'production' ? JWT_ACCESS_TOKEN : 'dev-secret',
            {expiresIn: '30m'}
        );
        const refreshToken = jwt.sign(
            payload,
            NODE_ENV === 'production' ? JWT_ACCESS_TOKEN : 'dev-secret',
            {expiresIn: '30d'}
        );

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const sql = `SELECT refresh_token FROM tokens WHERE user_id = $1`
        const tokenData = await db.query(sql, [userId])
        if(tokenData.rows[0]) {
            const sql = `UPDATE tokens SET refresh_token = $1, updated_at = $2 WHERE user_id = $3 AND deleted_at is null`
            return await db.query(sql, [refreshToken, new Date(), userId])
        }

        const sqlToken = `INSERT INTO tokens (user_id, refresh_token, created_at) VALUES($1, $2, $3) RETURNING *`
        return await db.query(sqlToken, [userId, refreshToken, new Date()])
    }
}

module.exports = new TokenService()