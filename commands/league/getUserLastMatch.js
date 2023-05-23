const { SlashCommandBuilder, EmbedBuilder, Embed } = require('discord.js');
const fetchPuidBySummonerName = require('../../services/fetchPuidBySummonerName');
const fetchMatchesByPUID = require('../../services/fetchMatchesByPUID');
const fetchMatch = require('../../services/fetchMatch')
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('last-match-stats')
        .setDescription('Estadísticas de la última partida')
        .addStringOption(option =>
            option
                .setName('summoner')
                .setDescription('Nombre de invocador')),
    async execute(interaction) {
        const userIdChatInput = interaction.options.getString('summoner')
        let userPUID = await fetchPuidBySummonerName(userIdChatInput)
        let last20Matches = await fetchMatchesByPUID(userPUID)
        let fetchLastMatch = await fetchMatch(last20Matches[0], userIdChatInput)
        let kills = `${fetchLastMatch.kills}`
        let deaths = `${fetchLastMatch.deaths}`
        let assists = `${fetchLastMatch.assists}`
        let gameMode = `${fetchLastMatch.gameMode}`
        let champion = `${fetchLastMatch.champion}`
        const description = (kills, deaths) => {
            return parseInt(kills) > parseInt(deaths) ? 
            "Que god, quedó con KD positivo cosa que no se ve todos los días así que sorprendente, buen trabajo." 
            : "Eres una basura con ese KD negativo, un minion aportó más que tú al equipo, ya desinstala el juego y ponte a jugar Roblox."
        }
        console.log(description(kills,deaths))
        let image = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${fetchLastMatch.champion}.png`
        let profileIcon = `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/${fetchLastMatch.profileIcon}.png`
        var itemId = ''
        let itemsUrl = (itemId) => `http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${itemId}.png`
        const gameInfo = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Estadísticas de ${bold(userIdChatInput)} en su última partida`)
            .setURL(`https://www.op.gg/summoners/lan/${userIdChatInput}`)
            .setAuthor({ name: userIdChatInput, iconURL: profileIcon, url: `https://www.op.gg/summoners/lan/${userIdChatInput}` })
            .setDescription(description(kills,deaths))
            .setThumbnail(image)
            .addFields(
                { name: bold('Asesinatos'), value: kills, inline: true },
                { name: bold('Muertes'), value: deaths, inline: true },
            )
            .addFields({ name: bold('Asistencias'), value: assists, inline: true })
            .addFields(
                { name: bold('Modo de juego'), value: gameMode, inline: true },
            )
            .setTimestamp()

        const embeds = [
            gameInfo,
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/${userIdChatInput}`).setImage(fetchLastMatch.items[0] != 0 ? itemsUrl(fetchLastMatch.items[0]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'),
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/${userIdChatInput}`).setImage(fetchLastMatch.items[1] != 0 ? itemsUrl(fetchLastMatch.items[1]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'),
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/${userIdChatInput}`).setImage(fetchLastMatch.items[2] != 0 ? itemsUrl(fetchLastMatch.items[2]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'),
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/${userIdChatInput}`).setImage(fetchLastMatch.items[3] != 0 ? itemsUrl(fetchLastMatch.items[3]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'),
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/`).setImage(fetchLastMatch.items[4] != 0 ? itemsUrl(fetchLastMatch.items[4]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'),
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/`).setImage(fetchLastMatch.items[5] != 0 ? itemsUrl(fetchLastMatch.items[5]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png'),
            new EmbedBuilder().setURL(`https://www.op.gg/summoners/lan/`).setImage(fetchLastMatch.items[6] != 0 ? itemsUrl(fetchLastMatch.items[6]) : 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png')
        ]

        await interaction.reply({ embeds })
    },
};