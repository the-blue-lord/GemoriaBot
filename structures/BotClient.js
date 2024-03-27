const fs = require("fs");
const yaml = require("yaml");
require("dotenv").config();

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

        const partialConfig = yaml.parse(fs.readFileSync("./configs/config.yml", "utf8"));
        partialConfig.general.token = process.env.TOKEN;
        partialConfig.general.guild = process.env.GUILD_ID;
        partialConfig.general.client = process.env.CLIENT_ID;

        this.commands = yaml.parse(fs.readFileSync("./configs/commands.yml", "utf8"));
        this.config = partialConfig;
        this.errors = yaml.parse(fs.readFileSync("./configs/errors.yml", "utf8"));
        this.language = yaml.parse(fs.readFileSync("./configs/language.yml", "utf8"));
        this.permissions = yaml.parse(fs.readFileSync("./configs/permissions.yml", "utf8"));
        this.tickets = yaml.parse(fs.readFileSync("./configs/tickets.yml", "utf8"));
    }

    init() {
        super.login(this.config.general.token);
    }
};
