const http = require('http');

const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `435445254:AAF6Bx8AEQzPEmAvmzB-gXeIMK7T-zTWAqI`

const bot = new TelegramBot( TOKEN, { polling: true } )

const timeout = 0;

const TIME = 1800000;

const msgs = [
    "desce ai meu parceiro!!",
    "desce ai meu passeiru!!",
    "ai meu passeeeeru!!",
    "sério agora, bora falar sério",
    "hahahahaha! desce ai meu passeru!!",
    "só tô aqui pra causar e manter o bot da ari interagindo, assim o heroku não cai :joy:"
];

const lastMsgs = new Array(msgs.length);

const getRand = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const randomMsg = function(){
    var msg = msgs[getRand(0, msgs.length-1)];
    return msg;
}

const isInHistory = function(theMsg){
    var checkArray = lastMsgs.slice(0);
    return checkArray.filter(function(msg){
        return msg === theMsg;
    }).length > 0;
}

const checkHistory = function(theMsg){
    var msg = randomMsg();
    if(isInHistory(theMsg)){
        console.log("[ERRO]", theMsg, "ESTA NO HISTORICO, checar", msg)
        return checkHistory(msg);
    }else{
        console.log("[OK]", theMsg, "NAO ESTA NO HISTORICO")
        return theMsg;
    }
}

const sendMsg = function(msg, match){
    var text = msg.text.toLowerCase();
    var msgToSend = "VAI TOMAR NO C$ SEU IMITÃO!!";
    if(text.match(/(parceiro|passero|passeiru)/)){
        bot.sendMessage( msg.chat.id, msgToSend);
    }else if(!text.match(/\/start/)){
        msgToSend = checkHistory(randomMsg());
        bot.sendMessage( msg.chat.id, msgToSend);
    }
    lastMsgs[0] = msgToSend;
    for(var i = 0, total = msgs.length - 1; i < total; i++){
        lastMsgs[i+1] = lastMsgs[i];
    }
}

const autoMsg = function(){
    clearTimeout(timeout);
    bot.sendMessage( msg.chat.id, checkHistory(randomMsg()));
    timeout = setTimeout(autoMsg, TIME);
}

bot.onText( /(^\/start|.*)/, sendMsg);
timeout = setTimeout(autoMsg, TIME);
console.log('rodando bot...')

http.createServer(function(){}).listen(process.env.PORT || 6000)