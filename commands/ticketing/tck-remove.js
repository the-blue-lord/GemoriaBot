const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../handlers/embedHandlers/sendErrorEmbed");
const getTicketChannel = require("../../handlers/ticketHandlers/getTicketChannel");
const sendSuccessEmbed = require("../../handlers/embedHandlers/sendSuccessEmbed");

module.exports = class TckRemove extends Command {
    constructor(client) {
        super(client, "tck_remove");
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

        const authorizedRoles = client.tickets.authorized_roles;
        let memberCanBeRemoved = true;

        for(let i = 0; i < authorizedRoles.length; i++) {
            if(member.roles.cache.find((r) => r.id == authorizedRoles[i])) {
                memberCanBeRemoved = false;
                break;
            }
        }

        if(!memberCanBeRemoved) {
            sendErrorEmbed(client, interaction, "member_unremovable");
            return;
        }

        await channel.permissionOverwrites.create(member, { ViewChannel: false });

        sendSuccessEmbed(client, interaction, "ticket_user_removed", [
            {
                placeholder: "<user-removed>",
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