const { ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const sendSuccessEmbed = require("../sendSuccessEmbed");

module.exports = async (client, member, ticketCategory, interaction) => {
    const authorizedRoles = client.tickets.authorized_roles;
    let userIsVip = false;
    if(member.roles.cache.find((r) => r.id == client.tickets.priority_role)) userIsVip = true;

    let emoji = ticketCategory.emoji;
    if(userIsVip) emoji = emoji + client.tickets.priority_emoji;
    const ticketChannelName = emoji + "・" + member.user.username;

    const guild = client.guilds.cache.get(client.config.general.guild);

    const channel = await guild.channels.create({
        name: ticketChannelName,
        type: ChannelType.GuildText
    });

    if(userIsVip)  await channel.setParent(client.tickets.priority_category_id);
    else await channel.setParent(client.tickets.category_id);

    await channel.permissionOverwrites.create(guild.roles.everyone, { ViewChannel: false });
    await channel.permissionOverwrites.create(client.user, { ViewChannel: true });
    await channel.permissionOverwrites.create(member.user, { ViewChannel: true });
    await authorizedRoles.forEach(async (role) => {
        await channel.permissionOverwrites.create(role, { ViewChannel: true });
    });

    const row = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
            .setLabel("Ticket")
            .setURL("https://discord.com/channels/" + client.config.general.guild + "/" + channel.id)
            .setStyle(ButtonStyle.Link)
        );

    const successVariables = [
        {
            placeholder: "<ticket-channel>",
            value: "<#" + channel.id + ">"
        }
    ];

    sendSuccessEmbed(client, interaction, "ticket_created", [row], successVariables);

    return channel;
};