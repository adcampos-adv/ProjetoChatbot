// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons

const client = new Client({
    puppeteer: {
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    }
});

// entao habilitamos o usuario a acessar o serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certin
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo para fazer a nossa magica =)
client.initialize();

// Enviar Video

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {

    if (msg.body === 'MANDA O VIDEO') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'Vou te mandar um vídeo');
        await delay(3000); //delay de 3 segundos
        const vid = MessageMedia.fromFilePath('./vid.mp4'); // arquivo do video
        client.sendMessage(msg.from, vid, {caption: 'Super-Combo'});
        }
});