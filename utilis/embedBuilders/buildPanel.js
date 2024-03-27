const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const sendErrorEmbed = require("../sendErrorEmbed");

module.exports = (client, interaction) => {
    const panelEmbed = getPanelEmbed(client, interaction);
    const panelRow = selectMenuRow(client, interaction);

    if(!panelEmbed || !panelRow) return null;

    const panel = {
        embed: panelEmbed,
        row: panelRow
    }

    return panel;
};

function getPanelEmbed(client, interaction) {
    const title = client.language.tickets.panel_title;
    const description = client.language.tickets.panel_message;

    if(!title) {
        sendErrorEmbed(client, interaction, "no_panel_title");
        return null;
    }

    if(!description) {
        sendErrorEmbed(client, interaction, "no_panel_description");
        return null;
    }


    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(client.config.panel.color);

    if(client.config.panel.timestamp) {
        embed.setTimestamp();
    }
    return embed;
}

function selectMenuRow(client, interaction) {
    const row = new ActionRowBuilder();
    const selectMenu = new StringSelectMenuBuilder().setCustomId("ticket_category_select");

    const categories = client.tickets.categories;

    if(!categories) {
        sendErrorEmbed(client, interaction, "no_categories");
        return null;
    }

    categories.forEach((category) => {
        selectMenu.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(category.name)
                .setDescription(category.description)
                .setEmoji(category.emoji)
                .setValue(category.id)
        );
    });

    row.addComponents(selectMenu);

    return row;
}