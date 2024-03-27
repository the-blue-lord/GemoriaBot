const fs = require("fs");
const yaml = require("yaml");

const { Client, GatewayIntentBits, Partials } = require("discord.js");

module.exports = class BotClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.MessageContent
            ],

            partials: [
                Partials.Message,
                Partials.Channel,
                Partials.Reaction,
                Partials.User,
                Partials.GuildMember
            ]
        });

        this.commands = yaml.parse(fs.readFileSync("./configs/commands.yml", "utf8"));
        this.config = yaml.parse(fs.readFileSync("./configs/config.yml", "utf8"));
        this.errors = yaml.parse(fs.readFileSync("./configs/errors.yml", "utf8"));
        this.language = yaml.parse(fs.readFileSync("./configs/language.yml", "utf8"));
        this.permissions = yaml.parse(fs.readFileSync("./configs/permissions.yml", "utf8"));
        this.tickets = yaml.parse(fs.readFileSync("./configs/tickets.yml", "utf8"));
    }

    init() {
        super.login(this.config.general.token);
    }
};
