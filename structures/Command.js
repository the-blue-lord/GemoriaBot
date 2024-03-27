const sendErrorEmbed = require("../utilis/sendErrorEmbed");

module.exports = class Command {
    constructor(client) {
        this.name;
        this.description;
        this.options;

        this.enabled;

        this.whitelist;
        this.blacklist;
        this.unlisted;

        this.client = client;
    }

    getData()  {
        const data = {
            name: this.name,
            description: this.description,
            options: this.options
        };

        return data;
    }

    memberIsAllowed(interaction) {
        if(this.whitelist) {
            for(let i = 0; i < this.whitelist.length; i++) {
                if(interaction.member.roles.cache.has(this.whitelist[i])) {
                    return true;
                }
            }
        }

        if(this.blacklist) {
            for(let i = 0; i < this.blacklist.length; i++) {
                if(interaction.member.roles.cache.has(this.blacklist[i])) {
                    sendErrorEmbed(this.client, interaction, "blacklisted_for_command");
                    return false;
                }
            }
        }

        if(!this.unlisted) {
            sendErrorEmbed(this.client, interaction, "unallowed_for_command");
        }

        return this.unlisted;
    }
};