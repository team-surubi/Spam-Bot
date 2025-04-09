javascript
// Importamos las librerías necesarias
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Creamos el cliente de WhatsApp
const client = new Client();

// Evento cuando se genera el código QR
client.on('qr', (qr) => {
    // Genera y muestra el código QR en la terminal
qrcode.generate(qr, { small: true });
    console.log("Escanea el código QR con tu WhatsApp para vincular.");
});

// Evento cuando el bot está listo
client.on('ready', () => {
    console.log('¡Bot conectado y listo!');
});

// Evento para escuchar los mensajes entrantes
client.on('message', message => {
    console.log(`Mensaje recibido: ${message.body}`);
    // Aquí puedes agregar la lógica para los comandos o funciones de tu bot
});

// Inicializa el cliente de WhatsApp
client.initialize();

javascript
const client = new Client({
    puppeteer: { headless: true },
    session: fs.existsSync('./sessions/whatsapp-session.json') ? require('./sessions/whatsapp-session.json') : undefined,
});

client.on('authenticated', (session) => {
    // Guarda la sesión autenticada
    fs.writeFileSync('./sessions/whatsapp-session.json', JSON.stringify(session));
});
