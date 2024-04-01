const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");

module.exports = class TckAdd extends Command {
    constructor(client) {
        super(client, "tck_add");
    }

    async run(client, interaction) {
        await interaction.deferReply({ephemeral: true});
        
        if(!this.memberIsAllowed(interaction)) {
            return;
        }
        
        const member = this.getUserOptionValue(interaction);
        const channel = getTicketChannel(this.getChannelOptionValue(interaction)?.id, interaction);

        if(channel == "no_ticket_channel") {
            sendErrorEmbed(client, interaction, "no_ticket_channel");
            return;
        }

        channel.permissionOverwrites.create(member, { ViewChannel: true });

        interaction.editReply({
            content: client.language.tickets.user_added,
            ephemeral: true
        });

        return;
    }
};