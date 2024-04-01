const Command = require("../../structures/Command");

module.exports = class Ping extends Command{
    constructor(client) {
        super(client, "ping");
    }

    run(client, interaction) {
        interaction.deferReply({ephemeral: true});
        if(!this.memberIsAllowed(interaction)) {
            return;
        }
        
        interaction.editReply("Pong!");
        return;
    }
};