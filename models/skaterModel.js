import pool from '../config/db.js';

const skaterModel = {
    findAll: async () => {
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
    },

    findOneById: async (id) => {
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
    },

    findOneByEmail: async (email) => {
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
    },

    create: async ({ id, email, nombre, password, anos_experiencia, especialidad, foto, estado }) => {
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
    },

    update: async (id, { nombre, password, anos_experiencia, especialidad }) => {
        const query = `
            UPDATE skaters
            SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4
            WHERE id = $5
            RETURNING *;
        `;
        const values = [nombre, password, anos_experiencia, especialidad, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    remove: async (id) => {
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
    }
};

export default skaterModel;
