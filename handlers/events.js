const fs = require("fs");

// Events init //
const eventFolders = fs.readdirSync("./events");
module.exports.init = (client) => {
    eventFolders.forEach((eventFolder) => {
        const events = fs.readdirSync("./events/" + eventFolder);
        const jsEvents = events.filter((e) => e.split(".").pop() == "js");

        jsEvents.forEach((event) => {
            const eventClass = require("../events/" + eventFolder + "/" + event);
            const eventObject = new eventClass(client);
            const eventName = event.split(".")[0];

            client.on(eventName, (...args) => eventObject.run(...args));
        });
    });
};