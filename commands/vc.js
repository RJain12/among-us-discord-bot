module.exports = {
	name: 'vc',
	description: 'Private VC Creation.',
	usage: ''
};

module.exports.run = async (client, message, args) => {
  if (message.guild.id !== '753867179048304750' || message.channel.id == '754486510518140998') {return;};
  if (!message.member.roles.cache.has('754063974034702407') && !message.member.roles.cache.has('754424770681897002')){
    message.reply('you do not have access to create Private VCs. <:report:753870901749088256> This is exclusive for our Nitro Boosters.\nVisit <#754030174277861467> for more information.');
    return;
  };
  const newTag = String(message.author.tag).replace('#', '').toLowerCase();
  if(message.guild.channels.cache.find(channel => channel.name === newTag)){message.reply(`You already have a private VC created: #${newTag}. Please delete it before creating a new one.\n To delete the VC, right click and press \`Delete Channel\`.`);return;}
  message.guild.channels.create(newTag, {
    type: 'voice',
    topic: `${message.author.tag}'s private voice channel.`,
    bitrate: `64000`,
    userLimit: `10`,
    parent: message.guild.channels.cache.get('754446220168134787'),
    permissionOverwrites: [
      {
        id: message.author.id,
        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'CONNECT']
      },
      {
        id: message.guild.roles.everyone,
        deny: ['CONNECT', 'VIEW_CHANNEL']
      }
    ],
  }).then(c=>message.reply(`I created channel <#${c.id}>. Invite your friends by right clicking and pressing 'Create Invite'. Have fun!\n **Do not rename the channel, otherwise it will be auto-deleted.**`))
};

/**
 * ,

 */