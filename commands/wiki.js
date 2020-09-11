const { embedColor, footerImg, footerTxt } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'wiki',
	description: 'Search the Among Us Fandom Wiki',
	cooldown: 3,
};

module.exports.run = async (client, message, args) => {
	try {
    if (!args) {message.reply('Please specify a search term for the Among Us Wiki, e.g. `am!wiki mira hq`.'); return;}
    let ourstr = String(args);
    ourstr = ourstr.replace(' ', '_')
		message.channel.send(`https://among-us-wiki.fandom.com/wiki/${ourstr}`);
	}
	catch (err) {
		message.reply('Please give me the `EMBED LINKS` permission.');
		console.error(`INV0: ${err}`);
	}
};