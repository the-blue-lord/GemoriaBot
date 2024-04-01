const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../structures/Command");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const reopenTicket = require("../../utilis/ticketManager/reopenTicket");

module.exports = class TckReopen extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_reopen;
        this.optionsData = client.language.commands.tck_reopen;

        this.name = "tck-reopen";
        this.description = this.commandData.description;

        this.options = [
            {
                name: this.optionsData.ticket_option.name,
                description: this.optionsData.ticket_option.description,
                type: ApplicationCommandOptionType.Channel,
                required: false
            }
        ];

        this.enabled = this.commandData.enabled;

        this.whitelist = this.commandData.whitelist;
        this.blacklist = this.blacklist;
        this.unlisted = this.commandData.unlisted;

        this.client = client;
    }

    run(client, interaction) {
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const channelId = interaction.options.get(this.optionsData.ticket_option.name)?.value;
        const channel = getTicketChannel(channelId, interaction);

        if(channel == "no_ticket_channel") {
            sendErrorEmbed(client, interaction, "no_ticket_channel");
            return;
        }

        reopenTicket(channel, interaction);

        return;
    }
};