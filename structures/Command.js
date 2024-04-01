const sendErrorEmbed = require("../utilis/sendErrorEmbed");

module.exports = class Command {
    constructor(client, commandId) {
        this.command = client.commands.find(command => command.id == commandId);

        this.name = this.command.name;
        this.description = this.command.description;

        this.options = this.command.options;

        this.enabled = this.command.enabled;

        this.whitelist = this.command.whitelist;
        this.blacklist = this.command.blacklist;
        this.unlisted = this.command.unlisted;

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

    getUserOptionValue(interaction) {
        const memberOption = this.options.find(option => option.id == "mbr");
        const memberId = interaction.options.get(memberOption?.name)?.value;
        const member = interaction.guild.members.cache.find(member => member.id == memberId);

        return member;
    }

    getChannelOptionValue(interaction) {
        const channelOption = this.options.find(option => option.id == "chn");
        const channelId = interaction.options.get(channelOption?.name)?.value;
        const channel = interaction.guild.channels.cache.find(channel => channel.id == channelId);

        return channel;
    }

    getCategoryOptionValue(interaction) {
        const categoryOption = this.options.find(option => option.id == "cat");
        const categoryId = interaction.options.get(categoryOption?.name)?.value;
        const category = interaction.client.tickets.categories.find(category => category.id == categoryId);

        return category;
    }
};