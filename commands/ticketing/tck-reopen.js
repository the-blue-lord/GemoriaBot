const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../structures/Command");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const reopenTicket = require("../../utilis/ticketManager/reopenTicket");

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