const Command = require("../../structures/Command");
const { ApplicationCommandOptionType } = require("discord.js");

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
        // run some deep shit here //
    }
}