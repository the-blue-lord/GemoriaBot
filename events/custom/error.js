const sendErrorEmbed = require("../../utilis/sendErrorEmbed");

module.exports = class Error {
    constructor(client) {
        this.client = client;
    }

    run(client, interaction, errorId){
        sendErrorEmbed(client, interaction, errorId);
        return;
    }
}