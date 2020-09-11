const { embedColor, footerImg, footerTxt,important } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'guide',
	description: 'Among Us Guide.',
	aliases: ['strategy'],
	cooldown: 3,
};

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(embedColor)
		.setAuthor('Tips & Tricks. Strategy.', footerImg)
    .addFields(
      { name: '<:report:753870901749088256> Full Guide', value: '[Click Here](https://steamcommunity.com/sharedfiles/filedetails/?id=2220357997)', inline:true},
		  { name: '<:crewmate_red:753870543479898192> Crewmate', value: '[Click Here](https://www.bluestacks.com/blog/game-guides/among-us/amongus-crewmate-guide-en.html)', inline:true },
      { name: '<:vent:753871189906292772> Impostor', value: '[Click Here](https://steamcommunity.com/sharedfiles/filedetails/?id=2220357997)', inline:true},
		  { name: 'Important Links', value: important }
		)
		.setTimestamp()
		.setFooter(footerTxt, footerImg);
  message.reply(embed)
}