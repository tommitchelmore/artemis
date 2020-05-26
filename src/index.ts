import {Client, MessageEmbed} from "discord.js";
import * as env from "dotenv";

import messageHandler from "./handlers/messageHandler";
import guildMemberAddHandler from "./handlers/guildMemberAddHandler";
import {Messages, Guild, Embeds, Settings} from "./config";

const client = new Client();

if (Settings.useDotEnv) {
    console.log("Loading environment from .env...")
    env.config();
}
console.log("Loading environment from system...")

client.on("ready", () => {
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

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("QuietRoom bot successfully started");
  })
  .catch((err) => {
    console.log("There was an error logging in to discord:");
    console.log(err);
  });

export { client };
