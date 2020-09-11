const { embedColor, footerImg, footerTxt,important } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'maps',
	description: 'Among Us Maps.',
	aliases: ['map'],
	cooldown: 3,
};

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor(embedColor)
		.setAuthor('All Among Us Maps', footerImg)
    .addFields(
      { name: '<:report:753870901749088256> The Skeld', value: '[Click Here](https://u.cubeupload.com/SuperInky/skeldmapguidev2.png)', inline: true},
		  { name: '<:crewmate_red:753870543479898192> Mira HQ', value: '[Click Here](https://i.redd.it/8i1kd1mp9ij51.png)', inline: true},
      { name: '<:vent:753871189906292772> Polus', value: '[Click Here](https://cdn.discordapp.com/attachments/754031126149988453/754033354852270190/POLUS_MAP_GUIDE.png)', inline:true},
		  { name: 'Important Links', value: important }
		)
		.setTimestamp()
		.setFooter(footerTxt, footerImg);
  message.reply(embed)
}