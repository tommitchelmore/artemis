import {MessageEmbed, GuildMember, PartialGuildMember} from "discord.js";
import {errorEmbed} from "./embeds";
import {Embeds} from "../config";

export default function userInfo(member: GuildMember | PartialGuildMember) {
  try {
    return new MessageEmbed()
        .setTitle(
            `Information for ${member.displayName} *(${member.user.username}#${member.user.discriminator})*`
        )
        .setDescription(`ID: ${member.user.id}`)
        .setThumbnail(
            member.user.displayAvatarURL({format: "png", dynamic: true, size: 128})
        )
        .setColor(Embeds.color)
        .addField("Roles", member.roles.cache.filter((role) => {
          return role.name !== '@everyone';
        }).map(role => role.name).join(", "))
        .addField("Joined at", member.joinedAt, true)
        .addField("On discord since", member.user.createdAt, true)
        .addField(
            "Last message",
            member.lastMessage ? member.lastMessage.content : "N/A",
            false
        )
        .setFooter(Embeds.footer, Embeds.thumb);
  } catch (e) {
    if (e instanceof RangeError) {
      return errorEmbed(`There was an error checking the information of \`${member.displayName}\``);
    }
  }
}
