const { bold } = require('discord.js');
const sendMessageIfInGame = require('../services/fetchPlayerInMatch')
let encryptedSummoners = [
	{ "id": 'OaynHhNKfcMSh7PD_huC-VtaiYoD0fyZd7261RCzOssYLw', name: 'SERGITRON', inMatch: false, alreadyDetected: false },
	{ "id": 'DvnjLX_IXH7tyLIFHdxU_-hd6AOgO6cz-430He-I03c_MA', name: 'NoobyMarksman', inMatch: false, alreadyDetected: false },
	{ "id": 'U8aUnn9O4sJ7OY_w-Q7j37Sg60T9RX9YzsVqJ2fSeVFBug', name: 'CarlosOmega04', inMatch: false, alreadyDetected: false },
	{ "id": 'srI1u5JF9P77Fu8fRG0S0rm9n7oWM7p_1cqW1623nNVNyjs', name: 'MAESTRO DEL AIRE', inMatch: false, alreadyDetected: false },
	{ "id": '__-8CQf_2dCknIkBJAfIz3QWTkiX-8oecxWj-oCm9YCeH74', name: 'cachorrololxd', inMatch: false, alreadyDetected: false },
	{ "id": '2kNGQqZL7CZXId-ysCAujhj8sVXMl_U4qh41eLqatptU', name: 'Racxaz', inMatch: false, alreadyDetected: false },
	{ "id" : '__-8CQf_2dCknIkBJAfIz3QWTkiX-8oecxWj-oCm9YCeH74', name: 'Tender', inMatch: false, alreadyDetected: false}
  ];
  
async function getPlayerInMatch(client) {
	const channelId = '410620538164346890';
	const channel = client.channels.cache.get(channelId);
	await sendMessageIfInGame(encryptedSummoners)
	encryptedSummoners.map((player) => {
		if (player.inMatch && !player.alreadyDetected) {
			channel.send(`${bold(player.name)} entró a partida, si no invitaste y vas andar de sordo mejor ni te conectes we, al chile.`)
			player.alreadyDetected = true
		}
		else if (!player.inMatch) {
			player.alreadyDetected = false
		}
	})

	setTimeout(() => {
		// Call the function again after the timeout
		getPlayerInMatch(client);
	  }, 30000); // Repeat after 5 seconds
}

module.exports = getPlayerInMatch