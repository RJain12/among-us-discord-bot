const { prefix, important, embedColor, footerImg, footerTxt } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'unmute',
	description: 'Unmutes everyone in your VC.',
	cooldown: 0
};

module.exports.run = async (client, message, args) => {
  if (message.guild.id !== '753867179048304750') {return;};
  if (!message.member.roles.cache.has('754063974034702407') && !message.member.roles.cache.has('754424770681897002')){
    message.author.send('You do not have access to create Private VCs. <:report:753870901749088256> This is exclusive for our Nitro Boosters.\nVisit <#754030174277861467> for more information.');
    message.delete()
    return;
  };

  if (!message.member.voice.channel){
    message.delete();
    message.author.send('You are not currently in a voice chat.');
    return;
  };

  if (!message.member.voice.channel.permissionsFor(message.author.id)){
    message.delete();
    message.author.send('This command ONLY works in Private Voice Chats.');
    return;
  };
  message.delete()
  message.member.voice.channel.members.forEach(member => {member.voice.setMute(false,'unmuted all')})
};
