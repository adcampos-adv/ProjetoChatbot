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

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil Base Projeto

client.on('message', async msg => {

    if (msg.body === 'ATIVAR FUNIL BASICO') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        msg.reply('Olá! Seja muito bem vindo. Você entrou no Funil Basico do treinamento Chatbot projetado pelo Johnny'); //Primeira mensagem de texto
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'Você vai ter contato com as funcionalidades básicas do nosso projeto e poderá ver o quanto é fácil criar seus próprios funis personalizados ao seu negócio.');
        await delay(3000); //delay de 3 segundos
        client.sendMessage(msg.from, 'Agora vamos testar os botões. 😎');
        client.sendMessage(msg.from, new Buttons('Olha que bacana', [{id:'customId',body:'Bacana demais!!'},{body:'Eu concordo, mto mesmo..'}, {body:'Olha o terceiro botao'}], 'Vamos lá...', 'Escolha abaixo 👇'));

    }
    
    if (msg.body !== null && msg.body === 'Bacana demais!!') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); //Simulando digitação
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Você escolheu a opção Bacana demais. Isso é muito bom, pois na prática você vai se comunicar com seus clientes exatamente desta maneira.');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Agora eu vou te mandar um audio gravado mas enviado como se fosse fresquinho!!');
        chat.sendStateRecording(); //Simulando audio gravando
        await delay(5000); //Delay de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio_base.ogg'); // Arquivo de audio em ogg gravado
        client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando o audio1
        await delay(4000); //Delay de 4 segundos
        client.sendMessage(msg.from, 'Agora quero te mandar uma imagem');
        await delay(3000); //Delay de 3 segundos
        const img1 = MessageMedia.fromFilePath('./imagem_base.png'); // arquivo em imagem
        client.sendMessage(msg.from, img1, {caption: 'Olha que legal'}); //Enviando a imagem
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Prontinho! Agora use a sua criatividade para criar sequencias de respostas com audios, botões e imagens. O céu é o limite');
    }

    if (msg.body !== null && msg.body === 'Eu concordo, mto mesmo..') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); //Simulando digitação
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Você escolheu a opção Eu concordo, mto mesmo.. Isso é muito bom, pois na prática você vai se comunicar com seus clientes exatamente desta maneira.');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Agora eu vou te mandar um audio gravado mas enviado como se fosse fresquinho!!');
        chat.sendStateRecording(); //Simulando audio gravando
        await delay(5000); //Delay de 5 segundos
        const formal1 = MessageMedia.fromFilePath('./audio_base.ogg'); // Arquivo de audio em ogg gravado
        client.sendMessage(msg.from, formal1, {sendAudioAsVoice: true}); // enviando o audio1
        await delay(4000); //Delay de 4 segundos
        client.sendMessage(msg.from, 'Agora quero te mandar uma imagem');
        await delay(3000); //Delay de 3 segundos
        const img1 = MessageMedia.fromFilePath('./imagem_base.png'); // arquivo em imagem
        client.sendMessage(msg.from, img1, {caption: 'Olha que legal'}); //Enviando a imagem
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(msg.from, 'Prontinho! Agora use a sua criatividade para criar sequencias de respostas com audios, botões e imagens. O céu é o limite');
    }
    
});
