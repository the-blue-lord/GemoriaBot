const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../handlers/embedHandlers/sendErrorEmbed");
const getTicketChannel = require("../../handlers/ticketHandlers/getTicketChannel");
const sendSuccessEmbed = require("../../handlers/embedHandlers/sendSuccessEmbed");

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

        await channel.permissionOverwrites.create(member, { ViewChannel: true });

        sendSuccessEmbed(client, interaction, "ticket_user_added", [
            {
                placeholder: "<user-added>",
                value: "<@" + member.id + ">"
            },
            {
                placeholder: "<ticket-channel>",
                value: "<#" + channel.id + ">"
            }
        ]);

        return;
    }
};