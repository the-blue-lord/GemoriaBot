const sendErrorEmbed = require("../sendErrorEmbed");

module.exports = async (channel, interaction) => {
    if(channel.parentId != interaction.client.tickets.closed_category_id) {
        sendErrorEmbed(interaction.client, interaction, "unclosed_ticket");
        return;
    }

    const newChannelName = channel.name.split(interaction.client.tickets.closed_emoji)[1];
    console.log(newChannelName);

    await channel.setName(newChannelName);

    if(channel.name != newChannelName) return;

    if(
        channel
        .guild
        .members
        .cache
        .find(
            m => m.user.username
                .toLowerCase()
                .replaceAll(" ", "-")
                .replaceAll(".", "-") == channel.name.split("・")[1]
        )
        .roles
        .cache
        .find(
            r => r.id == interaction.client.tickets.priority_role
        )
    ) await channel.setParent(interaction.client.tickets.priority_category_id);
    else await channel.setParent(interaction.client.tickets.category_id);

    interaction.reply({
        content: interaction.client.language.tickets.ticket_reopened,
        ephemeral: true
    });
    
    return;
};