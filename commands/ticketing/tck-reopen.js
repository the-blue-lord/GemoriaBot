const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../structures/Command");
const getTicketChannel = require("../../handlers/ticketHandlers/getTicketChannel");
const sendErrorEmbed = require("../../handlers/embedHandlers/sendErrorEmbed");
const reopenTicket = require("../../handlers/ticketHandlers/reopenTicket");

module.exports = class TckReopen extends Command {
    constructor(client) {
        super(client, "tck_reopen");
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

        reopenTicket(channel, interaction);

        return;
    }
};