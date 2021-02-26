const fs = require('fs');
const Discord = require('discord.js-light');
const { prefix } = require('./config.js');
const util = require('./dev/util.js');

const client = new Discord.Client({
    cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    disabledEvents: ['messageUpdate', 'messageDelete', `messageDeleteBulk`, `messageReactionAdd`, `guildMemberAdd`, `guildMemberUpdate`, `guildMemberRemove`, `typingStart`]
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};
client.cooldowns = new Discord.Collection();

const { shardReady, msg } = require('./dev/events.js');
client.on('shardReady', async (id) => { shardReady(client, id) });
client.on('message', async (message) => { msg(message, client, prefix, util) });
client.on("error", (e) => console.error(`${e}`));
client.on("warn", (w) => console.warn(`${w}`));
client.on("debug", (e) => console.info(e));
process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection`, error));

client.login(process.env.TOKEN).catch(console.error);