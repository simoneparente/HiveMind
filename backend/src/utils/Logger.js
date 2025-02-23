import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Definizione di __dirname per ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
  static logMessage(message, level = 'INFO', filename = 'logs.txt') {
    const date = new Date(); //Current timestamp
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const timestamp = `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // Format
    const logDirectory = path.resolve(__dirname, '../logs'); // Path to logs directory
    const logFile = path.join(logDirectory, filename); // Path to log file

    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }

    const logEntry = `[${timestamp}] {${level}} ${message}\n`;
    try {
      fs.appendFileSync(logFile, logEntry, 'utf8'); // Aggiungi al file
    } catch (error) {
      console.error('Errore durante la scrittura del log:', error.message);
    }
  }
}

export default Logger;
