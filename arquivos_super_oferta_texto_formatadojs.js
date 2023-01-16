// Invocamos o leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
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

// Funil que apresenta textos formatados

const delay = ms => new Promise(res => setTimeout(res, ms));

// Site para conferir formatação no whatsapp: https://faq.whatsapp.com/539178204879377/?locale=pt_BR
// Site para pegar Emojis: https://getemoji.com/

client.on('message', async msg => {

    if (msg.body === 'MANDA O TEXTO') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'Vou te um texto sem formatação:');
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'Agora vou te mandar o mesmo texto formatado:');
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, '_Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua._ 😇 \n\n Ut enim ad minim veniam, ~quis nostrud exercitation~ ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\n *Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.* \n\n\n ```Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.```');
        }
});