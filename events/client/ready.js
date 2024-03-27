module.exports = class Ready {
    constructor(client) {
        this.client = client;
    }

    run(client) {
        console.log("The bot is online");
    }
}