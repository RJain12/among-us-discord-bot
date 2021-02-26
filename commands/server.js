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
    .setAuthor('Play Among Us with Others!', footerImg)
    .setDescription(`[Join the Among Us Cafe Discord Server](https://dsc.gg/crewmate)!`)
  message.reply(embed)
};
