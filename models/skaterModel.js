// models/skaterModel.js

import pool from "../config/db.js";

const findAll = async () => {
    try {
        const query = {
            text: 'SELECT * FROM skaters'
        };
        const res = await pool.query(query);
        return res.rows;
    } catch (error) {
        console.error('Error al obtener todos los skaters:', error);
        throw error;
    }
};

const findOneById = async (id) => {
    try {
        const query = {
            text: 'SELECT * FROM skaters WHERE id = $1',
            values: [id]
        };
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.error('Error al obtener el skater por ID:', error);
        throw error;
    }
};

const findOneByEmail = async (email) => {
    try {
        const query = {
            text: 'SELECT * FROM skaters WHERE email = $1',
            values: [email]
        };
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.error('Error al obtener el skater por email:', error);
        throw error;
    }
};

const create = async ({ id, email, nombre, password, anos_experiencia, especialidad, foto, estado }) => {
    try {
        const query = {
            text: 'INSERT INTO skaters (id, email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            values: [id, email, nombre, password, anos_experiencia, especialidad, foto, estado]
        };
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.error('Error al crear el skater:', error);
        throw error;
    }
};

const update = async ({ id, email, nombre, password, anos_experiencia, especialidad, foto, estado }) => {
    try {
        const query = {
            text: 'UPDATE skaters SET email = $1, nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5, foto = $6, estado = $7 WHERE id = $8 RETURNING *',
            values: [email, nombre, password, anos_experiencia, especialidad, foto, estado, id]
        };
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.error('Error al actualizar el skater:', error);
        throw error;
    }
};

const remove = async (id) => {
    try {
        const query = {
            text: 'DELETE FROM skaters WHERE id = $1 RETURNING *',
            values: [id]
        };
        const res = await pool.query(query);
        return res.rows[0];
    } catch (error) {
        console.error('Error al eliminar el skater:', error);
        throw error;
    }
};

export default {
    findAll,
    findOneById,
    findOneByEmail,
    create,
    update,
    remove
};

