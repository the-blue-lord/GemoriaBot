module.exports = (channel, interaction) => {
    channel.delete();

    if(channel.id != interaction) {
        interaction.editReply({
            content: "The ticket was deleted successfully!",
            ephemeral: true
        });
    }

    return;
}