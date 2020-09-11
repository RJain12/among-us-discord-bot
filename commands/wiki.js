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
    if (args.length < 1) {message.reply('Please specify a search term for the Among Us Wiki, e.g. `am!wiki Ejection`.'); return;}
    message.channel.send(`https://among-us-wiki.fandom.com/wiki/${args}`);
	}
	catch (err) {
		message.reply('Please give me the `EMBED LINKS` permission.');
		console.error(`INV0: ${err}`);
	}
};