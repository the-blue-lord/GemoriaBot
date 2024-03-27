const Command = require("../../structures/Command.js");
const buildPanel = require("../../utilis/embedBuilders/buildPanel.js");

module.exports = class TckPanel extends Command {
    constructor(client) {
        super(client);
        this.name = "tck-panel";
        this.description = client.commands.tck_panel.description;
        this.options = [];

        this.enabled = client.commands.tck_panel.enabled;

        this.whitelist = client.commands.tck_panel.whitelist;
        this.blacklist = client.commands.tck_panel.blacklist;
        this.unlisted = client.commands.tck_panel.unlisted;

        this.client = client;
    }

    run(client, interaction) {
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const panel = buildPanel(client, interaction);

        if(!panel) return;

        interaction.reply({
            embeds: [panel.embed],
			components: [panel.row],
        });
        return;
    }
};