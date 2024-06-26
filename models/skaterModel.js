// model/skaterModel.js

import pool from "../config/db.js";

const skaterData = {
    findAll: async () => {
        try {
            const query = {
                text: 'SELECT * FROM skaters',
            };
            const { rows } = await pool.query(query);
            console.log('Skaters encontrados:', rows); // Agregar registro de depuración
            return rows;
        } catch (error) {
            console.error('Error al encontrar skaters:', error);
            throw error;
        }
    },

    findOneById: async (id) => {
        try {
            const query = {
                text: 'SELECT * FROM skaters WHERE id = $1',
                values: [id],
            };
            const { rows } = await pool.query(query);
            return rows[0];
        } catch (error) {
            console.error('Error al encontrar skater:', error);
            throw error;
        }
    },

    findOneByEmail: async (email) => {
        try {
            const query = {
                text: 'SELECT * FROM skaters WHERE email = $1',
                values: [email],
            };
            const { rows } = await pool.query(query);
            return rows[0];
        } catch (error) {
            console.error('Error al encontrar skater:', error);
            throw error;
        }
    },

    create: async ({ email, nombre, password, anos_experiencia, especialidad, foto }) => {
        try {
            const query = {
                text: `
                    INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado)
                    VALUES ($1, $2, $3, $4, $5, $6, true)
                    RETURNING *
                `,
                values: [email, nombre, password, anos_experiencia, especialidad, foto],
            };
            const { rows } = await pool.query(query);
            return rows[0];
        } catch (error) {
            console.error('Error al crear skater:', error);
            throw error;
        }
    },

    remove: async (id) => {
        try {
            const query = {
                text: 'DELETE FROM skaters WHERE id = $1 RETURNING *',
                values: [id],
            };
            const { rows } = await pool.query(query);
            return rows[0];
        } catch (error) {
            console.error('Error al eliminar skater:', error);
            throw error;
        }
    },

    update: async ({ id, email, nombre, password, anos_experiencia, especialidad, foto, estado }) => {
        try {
            const query = {
                text: `
                    UPDATE skaters
                    SET email = $1,
                        nombre = $2,
                        password = $3,
                        anos_experiencia = $4,
                        especialidad = $5,
                        foto = $6,
                        estado = $7
                    WHERE id = $8
                    RETURNING *
                `,
                values: [email, nombre, password, anos_experiencia, especialidad, foto, estado, id],
            };
            const { rows } = await pool.query(query);
            return rows[0];
        } catch (error) {
            console.error('Error al actualizar skater:', error);
            throw error;
        }
    }
};

export default skaterData;
