import {MessageEmbed} from "discord.js";
import {Embeds} from "../config";

export default function avatarEmbed(name: string, url: string) {
    return new MessageEmbed()
        .setTitle(`Avatar link for ${name}`)
        .setDescription(`[${url}](${url})`)
        .setThumbnail(url)
        .setColor(Embeds.color)
        .setFooter(Embeds.footer, Embeds.thumb);
}