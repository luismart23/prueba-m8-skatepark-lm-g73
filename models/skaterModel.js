// models/skaterModel.js
import pool from "../config/db.js";

const findAll = async () => {
    const res = await pool.query('SELECT * FROM skaters');
    return res.rows;
};

const findOneById = async (id) => {
    const res = await pool.query('SELECT * FROM skaters WHERE id = $1', [id]);
    return res.rows[0];
};

const findOneByEmail = async (email) => {
    const res = await pool.query('SELECT * FROM skaters WHERE email = $1', [email]);
    return res.rows[0];
};

const create = async ({ email, nombre, password, anos_experiencia, especialidad, foto, estado }) => {
    const res = await pool.query(
        'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [email, nombre, password, anos_experiencia, especialidad, foto, estado]
    );
    return res.rows[0];
};

const update = async ({ id, email, nombre, password, anos_experiencia, especialidad, foto, estado }) => {
    const res = await pool.query(
        'UPDATE skaters SET email = $1, nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5, foto = $6, estado = $7 WHERE id = $8 RETURNING *',
        [email, nombre, password, anos_experiencia, especialidad, foto, estado, id]
    );
    return res.rows[0];
};

const remove = async (id) => {
    const res = await pool.query('DELETE FROM skaters WHERE id = $1 RETURNING *', [id]);
    return res.rows[0];
};

export default {
    findAll,
    findOneById,
    findOneByEmail,
    create,
    update,
    remove
};

