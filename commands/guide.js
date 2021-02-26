const { embedColor, footerImg, footerTxt, important } = require('../config.js');
const Discord = require('discord.js-light');

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
            { name: '<:report:780281460837449771> Full Guide', value: '[Click Here](https://steamcommunity.com/sharedfiles/filedetails/?id=2220357997)', inline: true },
            { name: '<:black_crewmate_knife:780619179593695303> Crewmate', value: '[Click Here](https://www.bluestacks.com/blog/game-guides/among-us/amongus-crewmate-guide-en.html)', inline: true },
            { name: '<:vent:780281601992818719> Impostor', value: '[Click Here](https://steamcommunity.com/sharedfiles/filedetails/?id=2220357997)', inline: true },
            { name: 'Important Links', value: important }
        )
        .setTimestamp()
        .setFooter(footerTxt, footerImg);
    message.reply(embed)
}
