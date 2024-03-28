module.exports = (channel) => {
    const claimer = channel.name.split("・")[2] || false;

    return claimer;
};