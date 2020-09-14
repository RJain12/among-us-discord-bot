const { embedColor, footerImg, footerTxt,important } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'locate',
	description: 'Locate a user',
	cooldown: 3
};

module.exports.run = async (client, message, args) => {
  message.reply(`The user is in: <#${message.mentions.members.first().voice.channelID}>`);
}