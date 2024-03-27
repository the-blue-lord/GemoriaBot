const fs = require("fs");

module.exports = (client, interaction) => {
    if(!interaction.isChatInputCommand) return;

    const commandsFolders = fs.readdirSync("./commands");
    
    commandsFolders.forEach((commandFolder) => {
        const commands = fs.readdirSync("./commands/" + commandFolder);
        const jsCommands = commands.filter((c) => c.split(".").pop() === "js");

        jsCommands.forEach((command) => {
            if(interaction.commandName + ".js" == command) {
                const commandClass = require("../../commands/" + commandFolder + "/" + command);
                const commandObject = new commandClass(client);
                commandObject.run(client, interaction);
            }
        });
    });
};