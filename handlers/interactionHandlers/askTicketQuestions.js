const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

module.exports = (client, interaction) => {
    const ticketCategoryId = interaction.values[0];

    const questionsList = client.tickets.categories.find((cat) => cat.id === ticketCategoryId).questions;

    const modal = new ModalBuilder()
        .setCustomId("asker_" + ticketCategoryId)
        .setTitle(client.language.tickets.questionnaire_title);

    for(let i = 0; i < questionsList.length; i++) {
        const input = new TextInputBuilder()
            .setCustomId("modal_question_" + i)
            .setLabel(questionsList[i].title)
            .setPlaceholder(questionsList[i].question)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const row = new ActionRowBuilder().addComponents(input);

        modal.addComponents(row);
    }
    
    
    interaction.showModal(modal);

    return;
};