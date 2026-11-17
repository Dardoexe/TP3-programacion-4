import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secreto_super_seguro_utn_tp3'
};

export const configurePassport = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
               
                const [rows] = await pool.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [jwt_payload.id]);
                if (rows.length > 0) {
                    return done(null, rows[0]);
                }
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};