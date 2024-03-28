const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");

module.exports = class TckRemove extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_remove;
        this.optionsData = client.language.commands.tck_remove;

        this.name = "tck-remove";
        this.description = this.commandData.description;

        this.options = [
            {
                name: this.optionsData.user_option.name,
                description: this.optionsData.user_option.description,
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: this.optionsData.ticket_option.name,
                description: this.optionsData.ticket_option.description,
                type: ApplicationCommandOptionType.Channel,
                required: false
            }
        ];

        this.enabled = this.commandData.enabled;

        this.whitelist = this.commandData.whitelist;
        this.blacklist = this.commandData.blacklist;
        this.unlisted = this.commandData.unlisted;

        this.client = client;
    }

    run(client, interaction) {
        if(!this.memberIsAllowed(interaction)) {
            return;
        }
        
        const memberId = interaction.options.get(this.optionsData.user_option.name).value;
        const member = interaction.guild.members.cache.find((m) => m.id == memberId);

        const channelId = interaction.options.get(this.optionsData.ticket_option.name)?.value;
        const channel = getTicketChannel(channelId, interaction);

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

        channel.permissionOverwrites.create(member, { ViewChannel: false });

        interaction.reply({
            content: client.language.tickets.user_removed,
            ephemeral: true
        });

        return;
    }
};