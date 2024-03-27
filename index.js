/*

continuare da:

"./commands/ticketing/tck-add.js"

*/

const fs = require("fs");
const yaml = require("yaml");

const BotClient = require("./structures/BotClient");

// Token acquisition //
const config = yaml.parse(fs.readFileSync('./configs/config.yml', 'utf8'));
const TOKEN = config.general.token;

// Client init //
const client = new BotClient();
client.login(TOKEN);

// Handlers init //
const handlers = fs.readdirSync("./handlers");
const jsHandlers = handlers.filter((h) => h.split(".").pop() === "js");
jsHandlers.forEach((handler) => {
    require("./handlers/" + handler).init(client);
});