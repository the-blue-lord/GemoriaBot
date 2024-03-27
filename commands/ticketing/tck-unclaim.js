const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");
const sendErrorEmbed = require("../../utilis/sendErrorEmbed");

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

        let channelId = interaction.options.get(this.optionsData.ticket_option.name)?.value;
        if(!channelId) channelId = interaction.channel.id;
        const channel = interaction.guild.channels.cache.find((c) => c.id == channelId);

        if(channel.parentId != client.tickets.category_id && channel.parentId != client.tickets.priority_category_id) {
            sendErrorEmbed(client, interaction, "no_ticket_channel");
            return;
        }

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