"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramApi = require("node-telegram-bot-api");
const parser_1 = __importDefault(require("./utils/parser"));
const token = '5481929133:AAEYBNRp169TL2tN57MuWVliD2KdlldIX5M';
const bot = new TelegramApi(token, { polling: true });
bot.setMyCommands([
    { command: '/start', description: 'Hello message' },
    { command: '/info', description: 'Terms of using' }
]);
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg);
    if (text == '/start') {
        return bot.sendMessage(chatId, "Hello! My name is callculator of big numbers. Write your example and get an answer.");
    }
    if (text == '/info') {
        return bot.sendMessage(chatId, "If you wanna use calculator just write a statment in format x + y (or x+y). \nAvalible operations:\n+\n-\n*\n/ (division with remainder) \n// (division without remainder)\n% (remainder of division\n** or ^ (power)\n√\nAlso sorry, but numbers higher then 2^53 (or 9007199254740992), woun't have anfractional part 😒.");
    }
    yield bot.sendMessage(chatId, 'One moment pls, i am thinking🙇');
    let parserMessage = (0, parser_1.default)(text);
    console.log(parserMessage);
    return bot.sendMessage(chatId, (0, parser_1.default)(text));
}));
