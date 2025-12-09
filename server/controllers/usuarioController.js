import * as usuarioService from '../services/usuariosService.js';

// Controlador para manejar las peticiones HTTP relacionadas con usuarios

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarioService.getUsuarioPorId(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json({ message: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Actualizar un usuario existente
export const actualizarUsuario = async (req, res) => {
    try {
        await usuarioService.actualizarUsuario(req.params.id, req.body);
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Cambiar contraseña de un usuario
export const cambiarContrasena = async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password || password.trim() === '') {
            return res.status(400).json({ error: 'La contraseña es requerida' });
        }
        
        await usuarioService.cambiarContrasena(req.params.id, password);
        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
};

// Eliminar un usuario (desactivar)
export const eliminarUsuario = async (req, res) => {
    try {
        await usuarioService.eliminarUsuario(req.params.id);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
