module.exports = (channel, client) => {
    console.log(channel.permissionOverwrites.cache);
    const overwrittenIds = [];
    Array.from(channel.permissionOverwrites.cache).forEach(permission => {
        const permissionId = permission[0];
        if(permissionId != channel.guild.roles.everyone.id && permissionId != client.user.id && !client.tickets.authorized_roles.includes(permissionId))
            overwrittenIds.push(permissionId);
    });

    return overwrittenIds;
}