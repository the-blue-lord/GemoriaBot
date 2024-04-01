const { ChatInputCommandInteraction } = require("discord.js");
const { commandsHandler, askTicketQuestions, createTicket } = require("../../utilis/interactionManager/functionsExporter");

module.exports = class InteractionCreate {
    constructor(client) {
        this.client = client;
    }

    async run(interaction) {
        if(interaction.isChatInputCommand()) {
            commandsHandler(this.client, interaction);
            return;
        }

        if(interaction.isStringSelectMenu()) {
            if(interaction.customId == "ticket_category_select") {
                askTicketQuestions(this.client, interaction);
                return;
            }
        }

        if(interaction.isModalSubmit()) {
            if(interaction.customId.startsWith("asker")) {
                await interaction.deferReply({ephemeral: true});
                createTicket(this.client, interaction);
                return;
            }
        }
    }
};