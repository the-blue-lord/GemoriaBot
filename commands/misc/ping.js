const Command = require("../../structures/Command");

module.exports = class Ping extends Command{
    constructor(client) {
        super(client);

        this.commandData = client.commands.ping;

        this.name = "ping";
        this.description = this.commandData.description;
        this.options = [];

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
        
        interaction.reply("Pong!");
        return;
    }
};