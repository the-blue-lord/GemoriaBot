const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketClaimer = require("../../utilis/ticketManager/getTicketClaimer");
const claimTicket = require("../../utilis/ticketManager/claimTicket");

module.exports = class TckAssign extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_assign;
        this.optionsData = client.language.commands.tck_assign;

        this.name = "tck-assign";
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
        if(!this.memberIsAllowed(interaction)) return;

        const memberId = interaction.options.get(this.optionsData.user_option.name).value;
        const member = interaction.guild.members.cache.find(m => m.id == memberId);

        const channelId = interaction.options.get(this.optionsData.ticket_option.name)?.value;
        const channel = getTicketChannel(channelId, interaction);

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