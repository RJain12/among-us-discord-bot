const devs = ['220275834672381954', '286737962769580032', '220625168228286464'];

function isDev(message) {
	return devs.includes(message.author.id);
}

module.exports = { isDev };