module.exports = (channel, interaction) => {
    channel.delete();

    interaction.reply({
        content: "The ticket was deleted successfully!",
        ephemeral: true
    });

    return;
}