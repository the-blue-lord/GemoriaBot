const sendSuccessEmbed = require("../sendSuccessEmbed");

module.exports = async (channel, helper, interaction) => {
    const newChannelName = channel.name + "・" + helper.user.username;

    await channel.setName(newChannelName);

    if(newChannelName != channel.name) return;

    sendSuccessEmbed(interaction.client, interaction, "ticket_claimed", [
        {
            placeholder: "<user-claimer>",
            value: "<@" + helper.id + ">"
        },
        {
            placeholder: "<ticket-channel>",
            value: "<#" + channel.id +">"
        }
    ]);

    return;
};