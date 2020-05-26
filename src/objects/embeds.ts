import { MessageEmbed } from "discord.js";
import { Embeds } from "../config";

function simpleEmbed(msg: string) {
  return new MessageEmbed()
    .setColor(Embeds.color)
    .setTitle("Notice from Artemis")
    .setDescription(msg)
    .setThumbnail(Embeds.thumb)
    .setFooter(Embeds.footer, Embeds.thumb);
}

function successEmbed(msg: string) {
  return new MessageEmbed()
    .setColor(Embeds.success)
    .setTitle(msg)
    .setFooter(Embeds.footer, Embeds.thumb);
}

function errorEmbed(msg: string) {
  return new MessageEmbed()
    .setColor(Embeds.warning)
    .setTitle(msg)
    .setFooter(Embeds.footer, Embeds.thumb);
}

function permissionEmbed() {
  return new MessageEmbed()
    .setColor(Embeds.warning)
    .setTitle("Insufficient permissions")
    .setDescription("You do not have permission to execute that command.")
    .setFooter(Embeds.footer, Embeds.thumb);
}

function joinPrivateEmbed() {
  return new MessageEmbed()
      .setColor(Embeds.color)
      .setTitle("Thank you for joining")
      .setDescription("Thank you for joining the quiet room.  Your account is currently in limbo awaiting to be accepted or denied.")
      .setThumbnail(Embeds.thumb)
      .setFooter(Embeds.footer, Embeds.thumb);
}

export { simpleEmbed, successEmbed, errorEmbed, permissionEmbed, joinPrivateEmbed };
