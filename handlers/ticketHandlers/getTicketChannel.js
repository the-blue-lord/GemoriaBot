module.exports = (channelId, interaction) => {
    let ticketChannelId = channelId || interaction.channel.id;

    const channel = interaction.guild.channels.cache.find(c => c.id == ticketChannelId);

    const channelIsTicket = [
        interaction.client.tickets.category_id,
        interaction.client.tickets.priority_category_id,
        interaction.client.tickets.closed_category_id
    ].includes(channel.parentId);

    const ticketChannel = channelIsTicket ? channel : "no_ticket_channel";

    return ticketChannel;
};