import {MessageReaction, PartialUser, User} from "discord.js";
import {Channels, Guild, Roles} from "../config";
import {client} from "../index";
import {errorEmbed, successEmbed, welcomeEmbed} from "../objects/embeds";

export default async function reactHandler(reaction: MessageReaction, user: User | PartialUser) {
    if (reaction.partial) {
        try {
            await reaction.fetch()
        } catch (e) {
            await reaction.message.channel.send("Error");
        }
    }
    if (reaction.message.channel.id != Channels.system || user.bot) {
        return
    }
    if (reaction.emoji.name === "✅" || reaction.emoji.name === "❎") {
        const id = reaction.message.content
        const accept = reaction.emoji.name === "✅"
        try {
            let member = client.guilds.resolve(Guild).members.resolve(id);
            if (accept) {
                await member.roles.add(Roles.verified);
                // @ts-ignore
                await member.createDM().then(dm => {
                    dm.send(successEmbed("Your application to join the Quiet Room has been accepted!"))
                }).catch()
                // @ts-ignore
                await client.guilds.resolve(Guild).channels.cache.get(Channels.general).send(welcomeEmbed(member.displayName)).catch(console.error)
            } else {
                await member.createDM().then(dm => {
                    dm.send(errorEmbed("Your application to join the Quiet Room has been denied.  This may be the result of using an unauthorized invite link.")).then(() => {
                        member.ban({reason: "Unverified user"});
                    })
                }).catch()

            }
            await reaction.message.delete();
        } catch (e) {
            console.log(e);
        }
    }
    return;
}