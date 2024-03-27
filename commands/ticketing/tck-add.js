const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketChannel = require("../../utilis/getTicketChannel");

module.exports = class TckAdd extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_add;
        this.optionsData = client.language.commands.tck_add;

        this.name = "tck-add";
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

        //let channelId = interaction.options.get(this.optionsData.ticket_option.name)?.value;
        //if(!channelId) channelId = interaction.channel.id;
        //const channel = interaction.guild.channels.cache.find((c) => c.id == channelId);

        if(channel == "no_ticket_channel") {
            sendErrorEmbed(client, interaction, "no_ticket_channel");
            return;
        }

        channel.permissionOverwrites.create(member, { ViewChannel: true });

        interaction.reply({
            content: client.language.tickets.user_added,
            ephemeral: true
        });

        return;
    }
};