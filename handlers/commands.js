const fs = require("fs");
const {REST, Routes} = require("discord.js");

// Commands init //
module.exports.init = async (client) => {
    const commandsFolders = fs.readdirSync("./commands");

    const commandsData = [];
    
    commandsFolders.forEach((commandFolder) => {
        const commands = fs.readdirSync("./commands/" + commandFolder);
        const jsCommands = commands.filter((c) => c.split(".").pop() === "js");

        jsCommands.forEach((command) => {
            const commandClass = require("../commands/" + commandFolder + "/" + command);
            const commandObject = new commandClass(client);

            commandsData.push(commandObject.getData());
        });
    });

    const rest = new REST().setToken(client.config.general.token);
    await rest.put(
        Routes.applicationGuildCommands(client.config.general.client, client.config.general.guild),
        {body: commandsData}
    );
};