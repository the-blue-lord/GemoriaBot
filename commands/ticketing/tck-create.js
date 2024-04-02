const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../structures/Command.js");
const createTicketChannel = require("../../handlers/ticketHandlers/createTicketChannel.js");

module.exports = class TckCreate extends Command {
    constructor(client) {
        super(client, "tck_create");

        this.options.find(option => option.id == "cat").choices = [];
        client.tickets.categories.forEach(category => {
            this.options.find(option => option.id == "cat").choices.push({
                name: category.name,
                value: category.id
            });
        });
    }

    async run(client, interaction) {
        await interaction.deferReply({ephemeral: true});
        
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const member = this.getUserOptionValue(interaction);
        const ticketCategory = this.getCategoryOptionValue(interaction);

        createTicketChannel(client, member, ticketCategory, interaction);

        return;
    }
};