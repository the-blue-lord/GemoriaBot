const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const getTicketChannel = require("../../handlers/ticketHandlers/getTicketChannel");
const sendErrorEmbed = require("../../handlers/embedHandlers/sendErrorEmbed");
const closeTicket = require("../../handlers/ticketHandlers/closeTicket");

module.exports = class TckClose extends Command {
    constructor(client) {
        super(client, "tck_close");
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

        closeTicket(channel, interaction);

        return;
    }
}