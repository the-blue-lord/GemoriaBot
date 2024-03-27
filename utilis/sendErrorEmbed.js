const { EmbedBuilder } = require("discord.js");

module.exports = (client, interaction, errorId) => {
    const error = client.errors.embeds.find((e) => e.id == errorId);
    let color = "#ff0000";
    if(error.color) color = error.color;

    const embed = new EmbedBuilder()
        .setTitle(error.title)
        .setDescription(error.description)
        .setFooter({ text: client.errors.footer })
        .setColor(color);
    
    if(error.timestamp) embed.setTimestamp();
    
    interaction.reply({
        embeds: [embed],
        ephemeral: true
    });

    return;
}