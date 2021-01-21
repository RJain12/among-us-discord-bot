const { embedColor, footerImg, footerTxt } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'wiki',
	description: 'Search the Among Us Fandom Wiki',
  usage: '[search term]',
	cooldown: 3
};

module.exports.run = async (client, message, args) => {
try {
    message.reply('Wiki command is disabled for maintenance.')
    return;
    if (message.mentions.everyone) {message.reply('Do not ping everyone.'); return;}
    if (message.content.includes('@')) {message.reply('Do not ping roles or users.'); return;}
    if (args.length < 1) {message.reply('Please specify a search term for the Among Us Wiki, e.g. `am!wiki Impostor`.'); return;}
    message.channel.send(`https://among-us-wiki.fandom.com/wiki/${String(message.content).slice(8).replace(" ", "_")}`);
	}
	catch (err) {
		message.reply('Please give me the `EMBED LINKS` permission.');
		console.error(`INV0: ${err}`);
	}
};
