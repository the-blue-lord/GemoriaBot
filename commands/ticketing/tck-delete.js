const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const getTicketChannel = require("../../handlers/ticketHandlers/getTicketChannel");
const sendErrorEmbed = require("../../handlers/embedHandlers/sendErrorEmbed");
const deleteTicket = require("../../handlers/ticketHandlers/deleteTicket");

module.exports = class TckDelete extends Command {
    constructor(client) {
        super(client, "tck_delete");
    }

    async run(client, interaction) {
        await interaction.deferReply({ephemeral: true});
        
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const channel = getTicketChannel(this.getChannelOptionValue(interaction)?.id, interaction);

        if(channel == "no_ticket_channel") {
            sendErrorEmbed(client, interaction, "no_ticket_channel");
            return;
        }

        deleteTicket(channel, interaction);

        return;
    }
}