// Cuando se reciba el código QR, lo mostramos para que el usuario lo escanee.
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR con WhatsApp');
});

// Cuando el cliente está listo, se realiza la autenticación
client.on('ready', () => {
    console.log('¡Bot está listo!');
});

// Función para enviar spam (reenvío de mensajes o stickers)
async function startSpam(message, interval, duration) {
    let timeElapsed = 0;

    const intervalId = setInterval(async () => {
        try {
            if (message.hasMedia) {
                // Si el mensaje es un sticker o tiene un archivo, lo reenviamos
                await message.forward(message.from);
            } else {
                // Si es un mensaje normal, lo reenviamos
                await client.sendMessage(message.from, message.body);
            }
        } catch (error) {
            console.log('Error al reenviar el mensaje:', error);
        }

        timeElapsed += interval;
        if (timeElapsed >= duration) {
            clearInterval(intervalId);  // Detenemos el spam después de la duración especificada
            console.log('El spam ha terminado.');
        }
    }, interval);
}

// Manejo de mensajes para el comando !spam
javascript
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
// Cuando se reciba el código QR, lo mostramos para que el usuario lo escanee.
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR con WhatsApp');
});

// Cuando el cliente está listo, se realiza la autenticación
client.on('ready', () => {
    console.log('¡Bot está listo!');
});

// Función para enviar spam (reenvío de mensajes o stickers)
async function startSpam(message, interval, duration) {
    let timeElapsed = 0;

    const intervalId = setInterval(async () => {
        try {
            if (message.hasMedia) {
                // Si el mensaje es un sticker o tiene un archivo, lo reenviamos
                await message.forward(message.from);
            } else {
                // Si es un mensaje normal, lo reenviamos
                await client.sendMessage(message.from, message.body);
            }
        } catch (error) {
            console.log('Error al reenviar el mensaje:', error);
        }

        timeElapsed += interval;
        if (timeElapsed >= duration) {
            clearInterval(intervalId);  // Detenemos el spam después de la duración especificada
            console.log('El spam ha terminado.');
        }
    }, interval);
}

// Manejo de mensajes para el comando !spam
client.on('message', async (msg) => {
    // Verificamos si el mensaje contiene el comando "!spam"
    if (msg.body.startsWith('!spam')) {
        // El comando debe ser seguido de un tiempo en segundos y el tipo de mensaje
        const args = msg.body.split(' ');

        if (args.length < 3) {
            // Si no se pasan suficientes parámetros, respondemos pidiendo los datos correctos
            await client.sendMessage(msg.from, 'Por favor, usa el comando correctamente: `!spam <duración en segundos> <mensaje|sticker>`');
            return;
        }

        const duration = parseInt(args[1]);  // Duración del spam en segundos
        const messageType = args[2];  // Tipo de mensaje a enviar ('mensaje' o 'sticker')

        if (isNaN(duration) || duration <= 0) {
            await client.sendMessage(msg.from, 'La duración debe ser un número positivo.');
            return;
        }

        // Escucha la respuesta del usuario (el mensaje o sticker que se va a reenviar)
        client.on('message', async (response) => {
            // Si la respuesta del usuario es un mensaje o un sticker
            if (messageType === 'mensaje' && response.from === msg.from) {
await startSpam(response, 500, duration * 1000);  // Spam cada 0.5s durante la duración en milisegundos
            } else if (messageType === 'sticker' && response.hasMedia) {
                await startSpam(response, 500, duration * 1000);  // Spam de sticker cada 0.5s durante la duración en milisegundos
            }
        });

        await client.sendMessage(msg.from, 'Esperando tu respuesta para reenviar el mensaje o sticker...');
    }
});

// Inicializamos el cliente
client.initialize();
