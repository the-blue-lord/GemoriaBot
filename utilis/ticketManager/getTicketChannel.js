module.exports = (channelId, interaction) => {
    let ticketChannelId = channelId || interaction.channel.id;

    const channel = interaction.guild.channels.cache.find(c => c.id == ticketChannelId);

    const channelIsTicket = channel.parentId == interaction.client.tickets.category_id || channel.parentId == interaction.client.tickets.priority_category_id;

    const ticketChannel = channelIsTicket ? channel : "no_ticket_channel";

    return ticketChannel;
};