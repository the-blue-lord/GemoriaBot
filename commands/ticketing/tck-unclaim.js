const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const getTicketClaimer = require("../../utilis/ticketManager/getTicketClaimer");
const unclaimTicket = require("../../utilis/ticketManager/unclaimTicket");

module.exports = class TckUnclaim extends Command {
    constructor(client) {
        super(client, "tck_unclaim");
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

        if(!getTicketClaimer(channel)) {
            sendErrorEmbed(client, interaction, "ticket_not_claimed");
            return;
        }

        unclaimTicket(channel, interaction);

        return;

        if(!channel.name.split("・")[2]) {
            sendErrorEmbed(client, interaction, "ticket_not_claimed");
            return;
        }

        const emoji = channel.name.split("・")[0];
        const username = channel.name.split("・")[1];

        const channelName = emoji + "・" + username;

        await channel.setName(channelName);

        if(channelName != channel.name) {
            // send error message
            return;
        }

        interaction.editReply({
            content: client.language.tickets.ticket_unclaimed,
            ephemeral: true
        });
    }
};