import checkPermission from "../utils/checkPermission";

import { errorEmbed, simpleEmbed, successEmbed } from "../objects/embeds";
import userInfo from "../objects/userInfo";

export default function messageHandler(msg) {
  if (!msg.content.startsWith("!")) {
    return;
  }

  const content = msg.content.slice(1).split(" ");
  const cmd = content.shift();
  const args = content.join(" ");

  switch (cmd) {
    case "userinfo":
      return checkPermission(msg, "verified", () => {
        if (msg.mentions.everyone || msg.mentions.members.size < 1) {
          return msg.channel.send(
            errorEmbed("Please tag a valid member to lookup")
          );
        }
        const members = msg.mentions.members;
        members.forEach((m) => {
          msg.channel.send(userInfo(m));
        });
      });

    case "say":
      msg.delete();
      return checkPermission(msg, "admin", async () => {
        await msg.channel.send(simpleEmbed(args));
      });

    case "success":
      msg.delete();
      return checkPermission(msg, "admin", async () => {
        await msg.channel.send(successEmbed(args));
      });

    case "error":
      msg.delete();
      return checkPermission(msg, "admin", async () => {
        await msg.channel.send(errorEmbed(args));
      });

    case "clear":
      return checkPermission(msg, "admin", async () => {
        if (isNaN(args)) {
          return await msg.channel
            .send(
              errorEmbed("Please enter a valid number of messages to clear")
            )
            .then((m) => {
              m.delete({ timeout: 5000 }).catch();
            })
            .catch((e) => {
              return;
            });
        }
        if (args < 1 || args > 100) {
          return await msg.channel
            .send(errorEmbed("Please enter a number from 1 to 100"))
            .then((m) => {
              m.delete({ timeout: 5000 }).catch();
            })
            .catch(() => {
              return;
            });
        }
        await msg
          .delete()
          .then((message) => {
            message.channel
              .bulkDelete(args)
              .then((m) => {
                return message.channel
                  .send(successEmbed(`Successfully deleted ${m.size} messages`))
                  .then((embed) => {
                    embed.delete({ timeout: 10000 }).catch();
                  });
              })
              .catch(() => {
                message.channel.send(
                  errorEmbed(
                    "Some messages couldn't be removed because of Discord limitations"
                  )
                );
              });
          })
          .catch(() => {
            msg.channel.send(
              errorEmbed(
                "Some messages couldn't be removed because of Discord limitations"
              )
            );
          });
      });
    default:
      return;
  }
}
