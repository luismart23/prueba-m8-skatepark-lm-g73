// controllers/skaterController.js

import skaterData from '../models/skaterModel.js';
import bcrypt from 'bcrypt';

export const getAllSkaters = async (req, res) => {
    try {
        const skaters = await skaterData.findAll();
        res.status(200).json(skaters);
    } catch (error) {
        console.error("Error al obtener los skaters:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getSkater = async (req, res) => {
    try {
        const skaterId = req.params.id;
        const skater = await skaterData.findOneById(skaterId);

        if (!skater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }

        res.status(200).json(skater);
    } catch (error) {
        console.error("Error al obtener el skater:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const createSkater = async (req, res) => {
    try {
        const { email, nombre, password, repitaPassword, anos_experiencia, especialidad, foto } = req.body;

        if (password !== repitaPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingSkater = await skaterData.findOneByEmail(email);
        if (existingSkater) {
            return res.status(400).json({ message: "El skater ya está registrado" });
        }

        const newSkater = await skaterData.create({
            email,
            nombre,
            password: hashedPassword,
            anos_experiencia,
            especialidad,
            foto
        });

        res.status(200).json({ message: "Skater registrado exitosamente", newSkater });
    } catch (error) {
        console.error("Error al registrar skater:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const removeSkater = async (req, res) => {
    try {
        const skaterId = req.params.id;
        const skater = await skaterData.remove(skaterId);

        if (!skater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }

        res.status(200).json({ message: "Skater eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el skater:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateSkater = async (req, res) => {
    try {
        const skaterId = req.params.id;
        const updatedData = req.body;

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }

        const skater = await skaterData.update({ id: skaterId, ...updatedData });

        if (!skater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }

        res.status(200).json({ message: "Skater actualizado exitosamente", skater });
    } catch (error) {
        console.error("Error al actualizar el skater:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


