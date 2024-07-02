// skaterController.js

import skaterModel from '../models/skaterModel.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateToken } from '../utils/jwt.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para manejar el inicio de sesión
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error("Email y contraseña son obligatorios");
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

        const skater = await skaterModel.findOneByEmail(email);
        if (!skater || !(await bcrypt.compare(password, skater.password))) {
            console.error("Email o contraseña incorrectos");
            return res.status(401).json({ message: "Email o contraseña incorrectos" });
        }

        // Generar el accessToken en lugar del token
        const accessToken = generateToken({
            id: skater.id,
            email: skater.email,
            nombre: skater.nombre
        });

        res.cookie('token', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1 * 60 * 60 * 1000, // 1 hora en milisegundos 
        });

        // Redirección a la página de participantes después del inicio de sesión
        res.redirect('/participantes');
    } catch (error) {
        console.error("Error en el proceso de inicio de sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para manejar el registro de un nuevo skater
export const handleRegistro = async (req, res) => {
    try {
        const { email, nombre, password, repitaPassword, anos_experiencia, especialidad } = req.body;

        // Validaciones de campos obligatorios y contraseñas coincidentes
        if (!email || !nombre || !password || !repitaPassword || !anos_experiencia || !especialidad || !req.files || !req.files.foto) {
            console.error("Todos los campos son obligatorios", { email, nombre, password, repitaPassword, anos_experiencia, especialidad, foto: req.files ? req.files.foto : undefined });
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (password !== repitaPassword) {
            console.error("Las contraseñas no coinciden");
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }

        // Verifica si el skater ya está registrado
        const existingSkater = await skaterModel.findOneByEmail(email);
        if (existingSkater) {
            console.error("El skater ya está registrado");
            return res.status(400).json({ message: "El skater ya está registrado" });
        }

        // Manejo de la carga de la foto
        const foto = req.files.foto;
        const fotoPath = `/assets/img/${nombre}.jpg`;
        foto.mv(path.join(__dirname, '../public', fotoPath), async (err) => {
            if (err) {
                console.error("Error al guardar la foto:", err);
                return res.status(500).json({ message: "Error al guardar la foto" });
            }

            try {
                // Hash de la contraseña
                const hashedPassword = await bcrypt.hash(password, 10);

                // Creación del nuevo skater
                await skaterModel.create({
                    id: nanoid(), // Generar un ID único
                    email,
                    nombre,
                    password: hashedPassword,
                    anos_experiencia: parseInt(anos_experiencia), // Asegúrate de que sea un número entero
                    especialidad,
                    foto: fotoPath,
                    estado: true
                });

                // Redirección a la página de administración después del registro
                res.redirect('/admin');
            } catch (error) {
                console.error("Error al crear skater en la base de datos:", error);
                res.status(500).json({ message: "Error al registrar skater" });
            }
        });
    } catch (error) {
        console.error("Error al registrar skater:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Controlador para manejar la página de administración
export const handleAdmin = async (req, res) => {
    try {
        const skaters = await skaterModel.findAll();
        res.render('admin', { skaters });
    } catch (error) {
        console.error("Error al obtener skaters para la página de administración:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para obtener todos los skaters
export const getAllSkaters = async (req, res) => {
    try {
        const skaters = await skaterModel.findAll();
        res.json(skaters);
    } catch (error) {
        console.error('Error al obtener los skaters:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función para obtener un skater por su ID
export const getSkater = async (req, res) => {
    const { id } = req.params;
    try {
        const skater = await skaterModel.findById(id);
        if (!skater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }
        res.json(skater);
    } catch (error) {
        console.error('Error al obtener el skater:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función para actualizar un skater por su ID
export const updateSkater = async (req, res) => {
    const { id } = req.params; // Obtén el ID del skater a actualizar
    const { nombre, password, repitaPassword, anos_experiencia, especialidad } = req.body; // Obtén los datos actualizados del skater

    // Validaciones de contraseñas coincidentes
    if (password !== repitaPassword) {
        console.error("Las contraseñas no coinciden");
        return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualiza el skater en la base de datos
        const updatedSkater = await skaterModel.update(id, {
            nombre,
            password: hashedPassword,
            anos_experiencia: parseInt(anos_experiencia),
            especialidad
        }, { new: true });

        if (!updatedSkater) {
            return res.status(404).json({ message: "Skater no encontrado" });
        }

        res.status(200).json({ message: "Skater actualizado correctamente", skater: updatedSkater });
    } catch (error) {
        console.error("Error al actualizar el skater:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para eliminar un skater por su ID
export const removeSkater = async (req, res) => {
    const { id } = req.params;
    try {
        const removedSkater = await skaterModel.remove(id);
        if (!removedSkater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }
        res.json({ message: 'Skater eliminado exitosamente', skater: removedSkater });
    } catch (error) {
        console.error('Error al eliminar skater:', error);
        res.status(500).json({ message: 'Error al eliminar skater' });
    }
};



