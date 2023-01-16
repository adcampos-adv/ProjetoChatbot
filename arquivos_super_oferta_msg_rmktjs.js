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

// Envio de Conteudo a uma Lista de Numeros

const delay = ms => new Promise(res => setTimeout(res, ms));


client.on('message', async msg => {

    if (msg.body === 'Manda a ruim 👹') {
        // Direct send a new message to specific id
        let chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(3000);
        client.sendMessage(msg.from, 'Direto ao ponto 😰');
        //chat.sendStateRecording();
        //await delay(5000);
        //const ruim = MessageMedia.fromFilePath('./ruim.opus'); // arquivo de audio
        //client.sendMessage(msg.from, ruim, {sendAudioAsVoice: true}); // enviando audio
        await delay(3000);
        client.sendMessage(msg.from, new Buttons('Entendeu?', 
                                                [{id:'customId',body:'Sim, agora a boa 😇'}], 
                                                '👨‍💻', 'Escolha abaixo 👇'));
        }

    if (msg.body === 'Manda a BOA 😇' || msg.body === 'Sim, agora a boa 😇') {
        // Direct send a new message to specific id
        let chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(3000);
        client.sendMessage(msg.from, 'Perfeito! Vamos falar de coisa boa então 🤘');
        //chat.sendStateRecording();
        //await delay(5000);
        //const boa1 = MessageMedia.fromFilePath('./boa1.opus'); // arquivo de audio
        //client.sendMessage(msg.from, boa1, {sendAudioAsVoice: true}); // enviando audio
        await delay(3000);
        client.sendMessage(msg.from, 'E digo mais...');
        //await delay(5000);
        //const boa2 = MessageMedia.fromFilePath('./boa2.opus'); // arquivo de audio
        //client.sendMessage(msg.from, boa2, {sendAudioAsVoice: true}); // enviando audio
        await delay(3000);
        client.sendMessage(msg.from, new Buttons('Agora vai, né?!', 
                                                [{id:'customId',body:'Manda o link pra comprar 💪'},
                                                {body:'Manda a ruim 👹'}], 
                                                '👨‍💻', 'Escolha abaixo 👇'));
        }

    if (msg.body !== null && (msg.body === 'Manda o link pra comprar 💪')) {
        const chat = await msg.getChat();
        await msg.react('👍');
        chat.sendStateTyping();
        await delay(2000);
        client.sendMessage(msg.from, 'Remarketing feito com sucesso! 😎 \n\n *E... em breve será você*');
        await delay(2000);
        client.sendMessage(msg.from, 'Para adquirir o seu plano completo com os códigos, guia e suporte por 14 dias por apenas 47R$, basta clicar no link abaixo');
        await delay(2000);
        client.sendMessage(msg.from, 'https://go.perfectpay.com.br/PPU38CL93SF');
        await delay(2000);
        client.sendMessage(msg.from, 'Já reservei o seu acesso, seja rápido para não perder a condição especial 💆‍♂️');
        await delay(2000);
        client.sendMessage(msg.from, new Buttons('=)', [{id:'customId',body:'Fale com o Johnny L'}], 'Ainda com duvida?', '👇'));
    }

});