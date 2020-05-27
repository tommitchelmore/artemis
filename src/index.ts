import {Client, MessageEmbed} from "discord.js";
import * as env from "dotenv";
import * as Sentry from "@sentry/node";

import messageHandler from "./handlers/messageHandler";
import guildMemberAddHandler from "./handlers/guildMemberAddHandler";
import {Messages, Guild, Embeds, Settings, Channels} from "./config";
import reactHandler from "./handlers/reactHandler";

if (Settings.useDotEnv) {
    console.log("Loading environment from .env")
    env.config();
} else {
    console.log("Loading environment from system")
}

if (process.env.SENTRY) {
    Sentry.init({ dsn: process.env.SENTRY });
    console.log("Using Sentry for error tracking")
} else {
    console.log("Running without Sentry error tracking")
}

const client = new Client();

client.on("ready", () => {
    // @ts-ignore
    client.channels.cache.get(Channels.system).messages.fetch().catch(console.error)
    for (let i in Messages) {
       // @ts-ignore
        client.guilds.resolve(Guild).channels.cache.get(Messages[i].channel).messages.fetch(Messages[i].id).then(msg => {
            msg.edit(new MessageEmbed()
                .setTitle(Messages[i].title)
                .setDescription(Messages[i].content)
                .setColor(Embeds.color)
                .setFooter(Embeds.footer, Embeds.thumb)
                .setThumbnail(Embeds.thumb)
            )
        })
    }
})

client.on("message", (msg) => messageHandler(msg));
client.on("guildMemberAdd", (member) => guildMemberAddHandler(member));
client.on("messageReactionAdd", (reaction, user) => reactHandler(reaction, user))

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("Artemis initialized - listening for events");
  })
  .catch((err) => {
    console.log("There was an error logging in to discord:");
    console.log(err);
  });

export { client, Sentry };
