const { ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const sendSuccessEmbed = require("../sendSuccessEmbed");

module.exports = async (client, member, ticketCategory, interaction) => {
    const categoryEmoji = ticketCategory.emoji;

    const memberIsVip = member.roles.cache.find((r) => r.id == client.tickets.priority_role);
    const vipEmoji = memberIsVip ? client.tickets.priority_emoji : "";

    const ticketChannelName = categoryEmoji + vipEmoji + "・" + member.user.username;

    const guild = client.guilds.cache.get(client.config.general.guild);

    const channel = await guild.channels.create({
        name: ticketChannelName,
        type: ChannelType.GuildText
    });

    if(memberIsVip) await channel.setParent(client.tickets.priority_category_id);
    else await channel.setParent(client.tickets.category_id);

    await channel.permissionOverwrites.create(guild.roles.everyone, { ViewChannel: false });
    await channel.permissionOverwrites.create(client.user, { ViewChannel: true });
    await channel.permissionOverwrites.create(member.user, { ViewChannel: true });
    await client.tickets.authorized_roles.forEach(async (role) => {
        await channel.permissionOverwrites.create(role, { ViewChannel: true });
    });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel("Ticket")
                .setURL("https://discord.com/channels/" + client.config.general.guild + "/" + channel.id)
                .setStyle(ButtonStyle.Link)
        );

    sendSuccessEmbed(client, interaction, "ticket_created", [
        {
            placeholder: "<ticket-channel>",
            value: "<#" + channel.id + ">"
        }
        ], [row]);

    return channel;
};