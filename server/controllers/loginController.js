import * as loginService from '../services/loginService.js';
import { logEvent } from '../utils/logger.js';


export const iniciarSesion = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const result = await loginService.login(correo, password);
        logEvent(`Inicio de sesión exitoso para el usuario: ${correo}`);
        res.json(result);
    } catch (error) {
        logEvent(`Error de inicio de sesión para el usuario: ${correo} - ${error.message}`);
        res.status(401).json({ error: error.message });
    }
};
