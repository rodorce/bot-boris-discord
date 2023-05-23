const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const filterChampionsByTag = require('../../services/filterChampionByTag');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-champ')
        .setDescription('Selecciona un campeón al azar de acuerdo a tu rol'),
    async execute(interaction) {
        const fighter = new ButtonBuilder()
            .setCustomId('fighter')
            .setLabel('Luchador')
            .setStyle(ButtonStyle.Primary);

        const assassin = new ButtonBuilder()
            .setCustomId('assassin')
            .setLabel('Asesino')
            .setStyle(ButtonStyle.Primary);

        const mage = new ButtonBuilder()
            .setCustomId('mage')
            .setLabel('Mago')
            .setStyle(ButtonStyle.Primary);

        const support = new ButtonBuilder()
            .setCustomId('support')
            .setLabel('Soporte')
            .setStyle(ButtonStyle.Primary);

        const tank = new ButtonBuilder()
            .setCustomId('tank')
            .setLabel('Tanque')
            .setStyle(ButtonStyle.Primary);

        const marksman = new ButtonBuilder()
            .setCustomId('marksman')
            .setLabel('Tirador')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(fighter, assassin, mage, support, tank);

        const collectorFilter = i => i.user.id === interaction.user.id;

        const response = await interaction.reply({
            embed: `Escoge una posición para generar un campeón al azar`,
            components: [
                {
                    type: 1,
                    components: [fighter, assassin, mage, support, tank]
                },
                {
                    type: 1,
                    components: [marksman]
                }
            ],
        });

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId === 'fighter') {
                let fighter = await filterChampionsByTag('Fighter')
                await confirmation.update({ content: `${fighter}`, components: [] });
            }
            else if (confirmation.customId === 'assassin') {
                let assassin = await filterChampionsByTag('Assassin')
                await confirmation.update({ content: `${assassin}`, components: [] });
            }
            else if (confirmation.customId === 'mid') {
                let mage = await filterChampionsByTag('Mage')
                await confirmation.update({ content: `${mage}`, components: [] });
            }
            else if (confirmation.customId === 'support') {
                let support = await filterChampionsByTag('Support')
                await confirmation.update({ content: `${support}`, components: [] });
            }
            else if (confirmation.customId === 'tank') {
                let tank = await filterChampionsByTag('Tank')
                await confirmation.update({ content: `${tank}`, components: [] });
            }
            else if (confirmation.customId === 'marksman') {
                let marksman = await filterChampionsByTag('Marksman')
                await confirmation.update({ content: `${marksman}`, components: [] });
            }
        }
        catch (e) {
            await interaction.editReply({ content: 'No escogiste nada, ni para dar clic sirves.', components: [] });
        }
    },
};