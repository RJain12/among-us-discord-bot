module.exports = {
  name: 'vc',
  description: 'Private VC Creation.',
  usage: ''
};

module.exports.run = async (client, message, args) => {
  if (message.guild.id !== '753867179048304750' || message.channel.id == '754486510518140998') { return; };
  if (!message.member.roles.cache.has('754063974034702407') && !message.member.roles.cache.has('754424770681897002')) {
    message.reply('you do not have access to create Private VCs. <:report:753870901749088256> This is exclusive for our Nitro Boosters.\nVisit <#754030174277861467> for more information.');
    return;
  };

  const filter = m => m.author.id == message.author.id
  message.react('✅');
  message.channel.send(`What is the code for your lobby?\nType **cancel** to cancel.`).then(() => {
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(collected => {
        if (collected.first().content.toLowerCase() == 'cancel') { message.reply('Cancelled creation!'); return; }
        message.channel.send('Please respond with either **NA** / **EU** / **AS**.\nType **cancel** to cancel.')
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
          .then(collected2 => {
            if (collected.first().content.toLowerCase() == 'cancel') { message.reply('Cancelled creation!'); return; }
            message.guild.channels.create(`${collected2.first().content.toUpperCase()} // ${collected.first().content.toUpperCase()} PrivateVC ${message.author.id}`, {
              type: 'voice',
              topic: `${message.author.tag}'s private voice channel.`,
              bitrate: `64000`,
              userLimit: `10`,
              parent: message.guild.channels.cache.get('754446220168134787'),
              permissionOverwrites: [
                {
                  id: message.author.id,
                  allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'CONNECT', 'MOVE_MEMBERS', 'MUTE_MEMBERS']
                }
              ],
            })
            message.reply(`I just created a Private VC for you, called **${collected2.first().content.toUpperCase()} // ${collected.first().content.toUpperCase()}**.\nYou have permissions to edit the channel.\nTell friends to join the **Private Waiting Room**, and you can move them into your VC.\nPlease do not create more than 1 voice channel at a time.\n\nHave fun!`)
          })
          .catch(collected => {
            message.reply('You did not respond in time. Cancelled!');
          });
      })
      .catch(collected => {
        message.reply('You did not respond in time. Cancelled!');
      });
  });
};