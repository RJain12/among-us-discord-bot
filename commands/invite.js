const { embedColor, footerImg, footerTxt } = require('../config.js');
const Discord = require('discord.js-light');

module.exports = {
	name: 'invite',
	description: 'Invite the bot to your Discord server.',
	cooldown: 3,
};

module.exports.run = async (_, message, __) => {
	try {
		const helpEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setAuthor('Invite Among Us to your Discord server!', footerImg)
			.addFields(
				{ name: '<:YTtools:715769246050680863> Invite Me', value: '[Get Among Us in Your Server!](https://discord.com/api/oauth2/authorize?client_id=758054448047063191&permissions=8&scope=bot)', inline: true },
				{ name: '<:cash:729800059952037909> Support Server', value: '[Join for Help!](https://discord.gg/2nX2eaX)', inline: true },
			)
			.setTimestamp()
			.setFooter(footerTxt, footerImg);
		message.channel.send(helpEmbed);
	}
	catch (err) {
		message.reply('Please give me the `EMBED LINKS` permission.');
		console.error(`INV0: ${err}`);
	}
};