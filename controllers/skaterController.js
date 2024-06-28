// skaterController.js


import { nanoid } from 'nanoid';
import skaterData from '../models/skaterModel.js';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para manejar el inicio de sesión
export const handleLogin = async (req, res) => {
    console.log("Llegó una solicitud POST a /login:", req.body); // Registro de la solicitud POST a /login

    try {
        const { email, password } = req.body;

        // Busca al skater por email en la base de datos
        const skater = await skaterData.findOneByEmail(email);

        if (!skater) {
            return res.status(404).json({ message: "Skater no encontrado" });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, skater.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        // Si las credenciales son válidas, redirige al usuario a /participantes
        res.redirect('/participantes');

    } catch (error) {
        console.error("Error en handleLogin:", error);
        res.status(500).json({ message: "Hubo un problema al iniciar sesión" });
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
        const existingSkater = await skaterData.findOneByEmail(email);
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
                const newSkater = await skaterData.create({
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

// Controlador para manejar la página de participantes
export const participantes = async (req, res) => {
    try {
        const skaters = await skaterData.findAll(); // Ajusta según el método específico en tu modelo
        res.render('participantes', { skaters });
    } catch (error) {
        console.error("Error al obtener datos de skaters:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Controlador para manejar la página de administración
export const handleAdmin = async (req, res) => {
    try {
        const skaters = await skaterData.findAll();
        console.log(skaters); // Verifica que se están obteniendo los datos
        res.render('admin', { skaters });
    } catch (error) {
        console.error("Error al obtener skaters para la página de administración:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para obtener todos los skaters
export const getAllSkaters = async (req, res) => {
    try {
        const skaters = await skaterData.findAll();
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
        const skater = await skaterData.findById(id);
        if (!skater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }
        res.json(skater);
    } catch (error) {
        console.error('Error al obtener el skater:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función para actualizar un skater por ID
export const updateSkater = async (req, res) => {
    const { id } = req.params;
    const { email, nombre, password, anos_experiencia, especialidad, foto, estado } = req.body;
    try {
        const updatedSkater = await skaterData.update({
            id,
            email,
            nombre,
            password,
            anos_experiencia,
            especialidad,
            foto,
            estado
        });
        if (!updatedSkater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }
        res.json({ message: 'Skater actualizado exitosamente', skater: updatedSkater });
    } catch (error) {
        console.error('Error al actualizar el skater:', error);
        res.status(500).json({ message: 'Error al actualizar el skater' });
    }
};

// Función para eliminar un skater por ID
export const removeSkater = async (req, res) => {
    const { id } = req.params;
    try {
        const removedSkater = await skaterData.remove(id);
        if (!removedSkater) {
            return res.status(404).json({ message: 'Skater no encontrado' });
        }
        res.json({ message: 'Skater eliminado exitosamente', skater: removedSkater });
    } catch (error) {
        console.error('Error al eliminar el skater:', error);
        res.status(500).json({ message: 'Error al eliminar el skater' });
    }
};
