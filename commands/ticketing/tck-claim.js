const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const getTicketClaimer = require("../../utilis/ticketManager/getTicketClaimer");
const claimTicket = require("../../utilis/ticketManager/claimTicket");

module.exports = class TckClaim extends Command {
    constructor(client) {
        super(client, "tck_claim");
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

        if(getTicketClaimer(channel)) {
            sendErrorEmbed(client, interaction, "ticket_already_claimed");
            return;
        }

        claimTicket(channel, interaction.member, interaction);

        return;

        const emoji = channel.name.split("・")[0];
        const username = channel.name.split("・")[1];
        const helper = interaction.member.user.username;

        const channelName = channel.name + "・" + helper;

        await channel.setName(channelName);

        if(channelName == channel.name) {
            interaction.editReply({
                content: client.language.tickets.ticket_claimed,
                ephemeral: true
            });
        }
        return;
    }
}