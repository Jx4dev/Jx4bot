const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Load data from JSON file
let data = {};
const dataFilePath = './data.json';

try {
  const rawData = fs.readFileSync(dataFilePath);
  data = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading data file:', error);
}

const botToken = '7162252584:AAHmv730VbGMJmyQuFgdiytTiYHJezOKQGM';
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const reply = 'Welcome to the extreme bot!';

  bot.sendMessage(chatId, reply);
});

bot.onText(/\/hello/, (msg) => {
  const chatId = msg.chat.id;
  const reply = 'Hello, brave soul!';

  bot.sendMessage(chatId, reply);
});

bot.onText(/\/save (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const key = match[1];

  // Save data to JSON file
  data[chatId] = key;
  fs.writeFileSync(dataFilePath, JSON.stringify(data));

  const reply = `Saved "${key}" for future use.`;
  bot.sendMessage(chatId, reply);
});

bot.onText(/\/retrieve/, (msg) => {
  const chatId = msg.chat.id;
  const key = data[chatId] || 'No data found.';

  const reply = `Retrieved: "${key}"`;
  bot.sendMessage(chatId, reply);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const reply = 'Sorry, I am an extreme bot and cannot process your command.';

  bot.sendMessage(chatId, reply);
});

console.log('Extreme bot activated!');