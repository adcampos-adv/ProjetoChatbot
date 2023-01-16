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

// Funil que envia lista

//Limitação: Não funciona em Whatsapp Business enquanto servidor.

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {

    if (msg.body === 'MANDA A LISTA') {
        const chat = await msg.getChat();
        chat.sendStateTyping(); // Simulando Digitação
        await delay(1000); //delay de 1 segundo
        client.sendMessage(msg.from, 'Vou te mandar o nosso cardápio:');
        await delay(1000); //delay de 1 segundo
        let sections = [
            {
                title: 'Pizzaria Sabore',
                rows: [
                    {title:'Portuguesa', description: 'Queijo, Ervilhas, Lombo'},
                    {title:'Frango com Catupity', description: 'Frango e Catupiry'},
                    {title:'Especial', description: 'Frango, Ervilhas, 4 queijos'},
                    {title:'Quatro Queijos', description: 'Muitos Queijos'},
                    {title:'Bacon com Queijo', description: 'Queijo, bacon e oregano'},
                    {title:'Americana', description: 'Tomate, queijo, presunto, azeitonas'},
                    {title:'Mexicana', description: 'Pimenta, queijo nacho, guacamole'},
                ]
            }
        ];
        let list = new List('Conheça nosso cardápio', 'Clique Aqui!', sections, 'Pizzaria Sabore', 'custom footer, google.com');
        await client.sendMessage(msg.from, list);
        }

        if (msg.body === 'Portuguesa\nQueijo, Ervilhas, Lombo') {
            const chat = await msg.getChat();
            chat.sendStateTyping(); // Simulando Digitação
            await delay(1000); //delay de 1 segundo
            client.sendMessage(msg.from, 'Você escolheu uma deliciosa Pizza Portuguesa, boa escolha!');
            }

        if (msg.body === 'Frango com Catupity\nFrango e Catupiry') {
            const chat = await msg.getChat();
            chat.sendStateTyping(); // Simulando Digitação
            await delay(1000); //delay de 1 segundo
            client.sendMessage(msg.from, 'Você escolheu uma deliciosa Pizza de Frango com Catupiry, boa escolha!');
            }
});