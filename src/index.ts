const TelegramApi = require("node-telegram-bot-api")
import parser from "./utils/parser"
const token: string = '5481929133:AAEYBNRp169TL2tN57MuWVliD2KdlldIX5M'

const bot = new TelegramApi(token, {polling: true})
bot.setMyCommands([
    {command: '/start', description: 'Hello message'},
    {command: '/info', description: 'Terms of using'}
])
bot.on("message", (msg: any) => {
    let text: string = msg.text
    const chatId: number = msg.chat.id
    console.log(msg)
    if (text == '/start'){
        return bot.sendMessage(chatId, "Hello! My name is callculator of big numbers. Write your example and get an answer.")
    }
    if (text == '/info'){
        return bot.sendMessage(chatId, "If you wanna use calculator just write a statment in format x + y (or x+y). \nAvalible operations:\n+\n-\n*\n/ (division with remainder) \n// (division without remainder)\n% (remainder of division\n** or ^ (power)\n√\nAlso sorry, but numbers higher then 2^53 (or 9007199254740992), woun't have anfractional part and if you calculating numbers smaller then 0.0000001 you may not get correct answer 😒.")
    }
    text = text.split(' ').join('`')
    return bot.sendMessage(chatId, parser(text))
})