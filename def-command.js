const Command = require("../../structures/Command");

module.exports = class DefCommand extends Command {
    constructor(client) {
        super(client);
        this.name = "<command_name>";
        this.description = client.commands.command_path.description;

        const optionData = client.language.commands.command_path;
        this.options = [
            {
                name: optionData.option_path.name,
                description: optionData.option_path.description,
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: "<choice_name>",
                        description: "<choice_description>"
                    }
                ]
            }
        ];

        this.enabled = client.commands.command_path.enabled;

        this.whitelist = client.commands.command_path.whitelist;
        this.blacklist = client.commands.command_path.blacklist;
        this.unlisted = client.commands.command_path.unlisted;

        this.client = client;
    }

    run(client, interaction) {
        if(!this.memberIsAllowed(interaction)) {
            return;
        }

        // Reply to the interaction //

        return;
    }
};