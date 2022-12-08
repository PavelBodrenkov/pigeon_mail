const jwt = require('jsonwebtoken');
const db = require('../db');
const {JWT_ACCESS_TOKEN, NODE_ENV
} = process.env;

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(
            payload,
            'jwt-secret-key',
            {expiresIn: '30m'}
        );
        const refreshToken = jwt.sign(
            payload,
            'jwt-refresh-secret-key',
            {expiresIn: '30d'}
        );

        return {
            accessToken,
            refreshToken
        }
    }

     validateAccessToken(token) {
        try{
            return jwt.verify(token, 'jwt-secret-key' )
        } catch (e) {
            return null
        }
    }

     validateRefreshToken(token) {
        try{
            return jwt.verify(token, 'jwt-refresh-secret-key');
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const sql = `SELECT refresh_token FROM tokens WHERE user_id = $1 AND deleted_at is null`
        const tokenData = await db.query(sql, [userId])
        if(tokenData.rows.length !== 0) {
            const sql = `UPDATE tokens SET refresh_token = $1, updated_at = $2 WHERE user_id = $3 AND deleted_at is null`
            return await db.query(sql, [refreshToken, new Date(), userId])
        } else {
            const sqlToken = `INSERT INTO tokens (user_id, refresh_token, created_at) VALUES($1, $2, $3) RETURNING *`
            return await db.query(sqlToken, [userId, refreshToken, new Date()])
        }
    }

    async removeToken(refreshToken) {
        // const sql = `UPDATE tokens SET deleted_at = $1 WHERE refresh_token = $2`
        const sql = `DELETE FROM tokens WHERE refresh_token = $1`
        return await db.query(sql, [refreshToken])
    }

    async findToken(refreshToken) {
        const sql = `SELECT refresh_token FROM tokens WHERE refresh_token = $1`
        return await db.query(sql, [refreshToken])
    }
}

module.exports = new TokenService()