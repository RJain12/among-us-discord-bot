const { footerTxt, footerImg, embedColor } = require('../config.js');
const Discord = require("discord.js-light");
const shardReady = async (client, id) => {
  client.user.setPresence({
    status: 'online',
    activity: {
      name: `AMONG US | am!help`,
      type: 'WATCHING'
    }
  });
}

const msg = async (message, client, prefix, util) => {
  if (message.author.bot) return;
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
module.exports = { shardReady, msg };
