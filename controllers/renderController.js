// renderController.js

import skaterModel from '../models/skaterModel.js';

export const { findAll } = skaterModel;

export const index = (req, res) => {
    return res.render('index');
};

export const login = (req, res) => {
    return res.render('login');
};

export const registro = (req, res) => {
    return res.render('registro');
};

export const participantes = async (req, res) => {
    try {
        const skaters = await findAll(); // Obtener todos los skaters con sus IDs
        return res.render('participantes', { skaters, URL_DOMAIN: 'http://localhost:3000/api/v1' });
    } catch (error) {
        console.error(error);
        return res.status(500).render('500');
    }
};

export const renderParticipantes = async (req, res) => {
    try {
        const skaters = await SkaterModel.findAll();
        res.render('participantes', { skaters });
    } catch (error) {
        console.error('Error al obtener los skaters:', error);
        res.status(500).send('Error al obtener los skaters');
    }
};

export const admin = (req, res) => {
    return res.render('admin');
};




