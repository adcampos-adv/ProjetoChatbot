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

async function MsgAgendada(date,number) {
    const currentTime = Date.now();
    const wakeUpTime = date.getTime();
    const timeUntilWakeUp = wakeUpTime - currentTime;
  
    await new Promise(resolve => setTimeout(resolve, timeUntilWakeUp));
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        client.sendMessage(number, 'Opa fii, beleza? Johnny aqui pra te dizer que você está na minha *lista de remarketing*. kkkk 🙈');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(number, 'Isso significa que eu consegui entregar aos meus alunos mais uma funcionalidade');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(number, 'Maaas... como nem tudo são flores. Tenho uma notícia ruim para te dar 😰');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(number, '*E uma noticia boa também* kk 🥳');
        await delay(3000); //Delay de 3 segundos
        client.sendMessage(number, new Buttons('Qual vai primeiro?', 
                                                [{id:'customId',body:'Manda a BOA 😇'},
                                                {body:'Manda a ruim 👹'}], 
                                                '😲', 'Escolha abaixo 👇'));
    console.log('Enviei ao numero: '+number);
    await delay(3000); //delay de 3 segundos
  }

client.on('message', async msg => {

    if (msg.body === 'ATIVA RMKT') {
        // Direct send a new message to specific id
        let chat = await msg.getChat();
        client.sendMessage(msg.from, 'Lista de remarketing em processamento.');
        chat.sendSeen();
        const wakeUpDate = new Date('December 25, 2022 00:00:00');
        const numbers = ['5511yyyyyyyyyyy', '5511yyyyyyyyyyy', '5511yyyyyyyyyyy', '5511yyyyyyyyyyy'];
        
        for (const number of numbers) {
            MsgAgendada(wakeUpDate,number);
          }
        await delay(3000);  
        client.sendMessage(msg.from, 'Lista carregada!');
        }

});