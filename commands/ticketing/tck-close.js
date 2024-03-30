const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const closeTicket = require("../../utilis/ticketManager/closeTicket");

module.exports = class TckClose extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_close;
        this.optionsData = client.language.commands.tck_close;

        this.name = "tck-close";
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
        this.blacklist = this.commandData.blacklist;
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

        closeTicket(channel, interaction);

        return;
    }
}