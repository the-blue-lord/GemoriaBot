const Command = require("../../structures/Command.js");
const buildPanel = require("../../utilis/embedBuilders/buildPanel.js");

module.exports = class TckPanel extends Command {
    constructor(client) {
        super(client, "tck_panel");
    }

    async run(client, interaction) {
        await interaction.deferReply();

        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        const panel = buildPanel(client, interaction);

        if(!panel) return;

        interaction.editReply({
            embeds: [panel.embed],
			components: [panel.row],
            ephemeral: false
        });
        
        return;
    }
};