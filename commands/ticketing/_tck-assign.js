const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");

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
    }

    run(client, interaction) {
        // run some deep shit here //
    }
};