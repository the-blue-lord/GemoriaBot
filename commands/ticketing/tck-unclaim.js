const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");
const getTicketChannel = require("../../utilis/ticketManager/getTicketChannel");
const getTicketClaimer = require("../../utilis/ticketManager/getTicketClaimer");
const unclaimTicket = require("../../utilis/ticketManager/unclaimTicket");

module.exports = class TckUnclaim extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_unclaim;
        this.optionsData = client.language.commands.tck_unclaim;

        this.name = "tck-unclaim";
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

    async run(client, interaction) {
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const channelId = interaction.options.get(this.optionsData.ticket_option.name)?.value;
        const channel = getTicketChannel(channelId, interaction);

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

        interaction.reply({
            content: client.language.tickets.ticket_unclaimed,
            ephemeral: true
        });
    }
};