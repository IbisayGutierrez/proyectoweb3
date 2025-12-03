import fs from 'fs';
import path from 'path';

const logFile = path.resolve('logs', 'access.log');// Ruta al archivo de log

// Función para registrar un evento en el archivo de log

export const logEvent = (message) => {// Registrar un evento en el archivo de log
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;// Formatear el mensaje con la fecha y hora actual
  fs.appendFileSync(logFile, logMessage);// Escribir el mensaje en el archivo de log
};