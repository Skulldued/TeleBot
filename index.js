const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const dotenv = require("dotenv");

dotenv.config();

/*
 Process is a global object inside that env file exist 
 */

const Token = process.env.BOOT_TOKEN;

/**
 * polling:true ---->This will check in telegram bot is there message comming or not and this process is occur continously. This is a configurable Object
 */

const bot = new TelegramBot(Token, { polling: true });

bot.on("message", (msg) => {
  const text = msg.text;
  console.log("Message recieved", text);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "You Said: " + text);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello I am Bot How Can I Help You?");
});

bot.onText(/\/joke/, async (msg) => {
  const joke = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );

  const setup = joke.data.setup;
  const punchline = joke.data.punchline;
  
  bot.sendMessage(msg.chat.id, setup + " " + punchline);
});
