import { Message } from "discord.js";

import { permissionEmbed } from "../objects/embeds";
import { Roles } from "../config";

export default function (
  msg: Message,
  role: "verified" | "admin",
  callback?: any
) {
  switch (role) {
    case "admin":
      if (msg.member.roles.cache.some((r) => r.id === Roles.admin)) {
        try {
          return callback();
        } catch (e) {
          return true;
        }
      } else {
        msg.channel.send(permissionEmbed()).catch();
        return false;
      }
    case "verified":
      if (
        msg.member.roles.cache.some((r) => r.id === Roles.verified)
      ) {
        if (!callback) {
          return true;
        }
        return callback();
      } else {
        if (!callback) {
          return false;
        }
        return msg.channel.send(permissionEmbed());
      }
  }
}
