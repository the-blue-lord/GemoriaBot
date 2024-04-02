const sendSuccessEmbed = require("../embedHandlers/sendSuccessEmbed");

module.exports = (channel, interaction) => {
    channel.delete();

    if(channel.id == interaction.channel.id) return;

    sendSuccessEmbed(interaction.client, interaction, "ticket_deleted", [
        {
            placeholder: "<ticket-channel>",
            value: "<#" + channel.id + ">"
        }
    ]);

    return;
}