const { ApplicationCommandOptionType } = require("discord.js");
const Command = require("../../structures/Command.js");
const createTicketChannel = require("../../utilis/ticketManager/createTicketChannel.js");

module.exports = class TckCreate extends Command {
    constructor(client) {
        super(client);

        this.commandData = client.commands.tck_create;
        this.optionsData = client.language.commands.tck_create;

        this.name = "tck-create";
        this.description = this.commandData.description;

        
        this.options = [
            {
                name: this.optionsData.user_option.name,
                description: this.optionsData.user_option.description,
                type: ApplicationCommandOptionType.User,
                required: true
            },
            {
                name: this.optionsData.category_option.name,
                description: this.optionsData.category_option.description,
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: []
            }
        ];

        this.enabled = this.commandData.enabled;

        this.whitelist = this.commandData.whitelist;
        this.blacklist = this.commandData.blacklist;
        this.unlisted = this.commandData.unlisted;

        this.client = client;

        client.tickets.categories.forEach((c) => {
            this.options[1].choices.push({
                name: c.name,
                value: c.id
            });
        });
    }

    run(client, interaction) {
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const memberId = interaction.options.get(this.optionsData.user_option.name).value;
        const member = interaction.guild.members.cache.find((m) => m.id == memberId);

        const ticketCategoryId = interaction.options.get(this.optionsData.category_option.name).value;
        const ticketCategory = client.tickets.categories.find((c) => c.id == ticketCategoryId);

        createTicketChannel(client, member, ticketCategory, interaction);

        return;
    }
};