import { GuildMember, PartialGuildMember } from "discord.js";
import {Channels, Guild, Messages} from "../config";
import { client } from "../index";
import userInfo from "../objects/userInfo";
import {joinPrivateEmbed} from "../objects/embeds";

export default function guildMemberAddHandler (
  member: GuildMember | PartialGuildMember
) {
  member.user.createDM().then(channel => {
    channel.send(joinPrivateEmbed()).catch()
  })
  // @ts-ignore
  client.guilds.resolve(Guild).channels.cache.get(Channels.system).send({content: member.id}).then(msg => {
    msg.react('✅').then(() => {
      msg.react('❎').catch();
    }).catch();
  })
}
