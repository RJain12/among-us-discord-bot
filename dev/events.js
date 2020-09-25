const { footerTxt, footerImg, embedColor } = require('../config.js');
const Discord = require("discord.js");
const shardReady = async (client, id) => {
  client.user.setPresence({
    status: 'online',
    activity: {
      name: `AMONG US | am!help`,
      type: 'WATCHING'
    }
  });
}

const exit = async (code, client) => {
  try {
    console.info(`Disconnecting from Discord. All shards turning off.`);
    const status = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setAuthor(`Disconnecting from process with code ${code}.`, footerImg)
      .setDescription('<:cancel:730661815670800434> Bot process turning off!')
      .setAuthor('Among Us Status')
      .addFields([{ name: `All Shards`, value: `Offline` }])
      .setTimestamp()
      .setFooter(footerTxt, footerImg)
    let channel = client.channels.cache.get('729788794299220060')
    channel.bulkDelete(5)
    channel.send(status)
  } catch (error) {
    console.error(error)
  }
}

const guildCreate = async (guild, client, embedColor, footerImg, footerTxt) => {
  const joinMessage = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setAuthor('Nice to meet you!', footerImg)
    .setDescription(`Hello, I was added to your server, **${guild.name}**`)
    .addFields([
      { name: 'Get Started!', value: 'Type: `am!help`' }
    ])
    .setTimestamp()
    .setFooter(footerTxt, footerImg)
  guild.owner.send(joinMessage)
  client.shard.broadcastEval(`this.channels.cache.get('730172463467593770').send('I was just added to **${guild.name}** which has \`${guild.memberCount}\` members.')`);
}

const voiceUp = async (oldState, newState) => {
  if (newState.channel) {
    newState.setMute(false, 'unmuted');
  }
  if (oldState.channel) {
    if (oldState.channel.name.toLowerCase().includes(`privatevc ${oldState.member.id}`)) {
      oldState.channel.delete();
      oldState.member.send(`Closed private vc!`)
    }
  }
};

const msg = async (message, client, prefix, util) => {
  if (message.author.bot) return;
  if ((message.content.toLowerCase().includes('discord.gg/') || message.content.toLowerCase().includes('discordapp.com/invite/')) && message.channel.id == '753869012827504680') {
    const invitesLinks = message.content.split('.gg');
    invitesLinks.forEach(inv => {
      const code = inv.substr(0, 7);
      if (code.startsWith('/')) {
        const inviteCodeFromIt = code.slice(1);
        message.guild.fetchInvites().then(
          invites => {
            const isInviteValid = invites.find(inVC => inVC == inviteCodeFromIt);
            if (!isInviteValid) {
                message.delete().then(message.reply(`**Other invite links are not allowed**. Please only post invites to THIS server's VC. If you DID post that, make sure the BEGINNING of your message is the invite link, and then any message after it. Thanks!`))
            }
          }
        )
      }
    })
  }
  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  try {
    if (!prefixRegex.test(message.content.toLowerCase())) return;
    const content = message.content.toLowerCase()
    const [, matchedPrefix] = content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (command.guildOnly && message.channel.type !== 'text') {
      return;
    }
    if (command.dev && !util.isDev(message)) {
      return message.reply('you are not a developer.')
    }
    if (command.admin && !util.isAdmin(message)) {
      return message.reply('you must have `ADMINISTRATOR` to run this command.')
    }
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait \`${timeLeft.toFixed(1)}s\` before using the \`${command.name}\` command again.`);
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    const botPerms = ['EMBED_LINKS'];
    if (!message.channel) { return message.reply('Please use me in a Discord Server. I cannot run in DMs.') }
    if (!message.guild.me.hasPermission(botPerms)) {
      return message.reply(`I need permissions: ${botPerms.join(', ')} to work here. You could alternatively just give me \`ADMINISTRATOR\`.`);
    }
    command.run(client, message, args);
  } catch (error) {
    console.error(`MSG0: ${error}`);
    message.reply(`please report this error code, \`MSG0\`, in my support server. You can join by doing: \`${prefix} invite\`.`);
  }

}
module.exports = { shardReady, voiceUp, msg, guildCreate, exit };
