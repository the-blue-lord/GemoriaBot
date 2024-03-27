module.exports = (channelId, interaction) => {
    let ticketChannelId = channelId || interaction.channel.id;
    //if(!ticketChannelId) ticketChannelId = interaction.channel.id;
    console.log(ticketChannelId);

    const channel = interaction.guild.channels.cache.find(c => c.id == ticketChannelId);

    const channelIsTicket = channel.parentId != interaction.client.tickets.category_id && channel.parentId != interaction.client.tickets.priority_category_id;
    console.log(channelIsTicket);

    const ticketChannel = false ? channel : "no_ticket_channel";

    //if(ticketChannel.parentId != interaction.client.tickets.category_id && ticketChannel.parentId != interaction.client.tickets.priority_category_id)
        //ticketChannel = "no_ticket_channel";

    return ticketChannel;
};