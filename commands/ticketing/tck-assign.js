const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketClaimer = require("../../utilis/ticketManager/getTicketClaimer");
const claimTicket = require("../../utilis/ticketManager/claimTicket");

module.exports = class TckAssign extends Command {
    constructor(client) {
        super(client, "tck_assign");
    }

    async run(client, interaction) {
        await interaction.deferReply({ephemeral: true});
        
        if(!this.memberIsAllowed(interaction)) return;

        const member = this.getUserOptionValue(interaction);
        const channel = getTicketChannel(this.getChannelOptionValue(interaction)?.id, interaction);

        if(channel == "no_ticket_channel") {
            sendErrorEmbed(client, interaction, "no_ticket_channel");
            return;
        }

        if(getTicketClaimer(channel)) {
            sendErrorEmbed(client, interaction, "ticket_already_claimed");
            return;
        }

        claimTicket(channel, member, interaction);

        return;
    }
};