const { prefix, important, embedColor, footerImg, footerTxt } = require('../config.js');
const Discord = require('discord.js-light');

module.exports = {
	name: 'server',
	description: 'Join the Official Server for the Among Us Discord Bot!',
	cooldown: 3
};


module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setAuthor('Among Us Discord Server', footerImg)
    .setDescription(`Join the Among Us Discord Server!`)
    .setTimestamp()
    .setFooter(footerTxt, footerImg);
  message.reply(embed)
  message.channel.send('https://dsc.gg/crewmate')
};
