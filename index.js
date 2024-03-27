const fs = require("fs");
require("dotenv").config();

const BotClient = require("./structures/BotClient");

// Client init //
const client = new BotClient();
client.login(process.env.TOKEN);

// Handlers init //
const handlers = fs.readdirSync("./handlers");
const jsHandlers = handlers.filter((h) => h.split(".").pop() === "js");
jsHandlers.forEach((handler) => {
    require("./handlers/" + handler).init(client);
});