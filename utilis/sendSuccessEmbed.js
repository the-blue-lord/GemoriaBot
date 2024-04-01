const { EmbedBuilder } = require("discord.js");

module.exports = (client, interaction, successId, components = [], variables = []) => {
    const success = client.successes.embeds.find(success => success.id == successId);
    const color = success.color || "#00ff00";

    let embedDescription = success.description;

    variables.forEach(variable => {
        embedDescription = embedDescription.replaceAll(variable.placeholder, variable.value);
    });

    const embed = new EmbedBuilder()
        .setTitle(success.title)
        .setDescription(embedDescription)
        .setFooter({text: client.successes.footer})
        .setColor(color);

    if(success.timestamp) embed.setTimestamp();



    interaction.editReply({
        embeds: [embed],
        components: components
    });
};