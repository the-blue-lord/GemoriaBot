const sendSuccessEmbed = require("../sendSuccessEmbed");

module.exports = async (channel, interaction) => {
    const newChannelName = channel.name.split("・")[0] + "・" + channel.name.split("・")[1];

    await channel.setName(newChannelName);

    if(newChannelName != channel.name) return;

    sendSuccessEmbed(interaction.client, interaction, "ticket_unclaimed", [
        {
            placeholder: "<ticket-channel>",
            value: "<#" + channel.id + ">"
        }
    ]);

    return;
};