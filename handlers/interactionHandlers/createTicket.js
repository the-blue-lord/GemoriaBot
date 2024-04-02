const { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const createTicketChannel = require("../../handlers/ticketHandlers/createTicketChannel");

module.exports = async (client, interaction) => {
    const ticketCategoryId = interaction.customId.split("asker_")[1];
    const ticketCategory = client.tickets.categories.find((c) => c.id == ticketCategoryId);

    createTicketChannel(client, interaction.member, ticketCategory, interaction);

    return;
};