const Settings = {
    //Use system environment variables instead of ".env"
    useEnv: false
}
const Guild = "GUILD ID"
const Roles = {
    admin: "ADMIN ID",
    verified: "VERIFIED ID"
}
const Channels = {
    system: "SYSTEM CHANNEL - PRIVATE",
    botSpam: "BOT COMMANDS CHANNEL"
}
const Embeds = {
    color: "#1F0D57",
    success: "#22BB33",
    warning: "#BB2124",
    footer: "Footer text",
    thumb: "BOT LOGO URL"
}
const Messages =  {
    //These update EXISTING messages on every restart
    welcome_unverified: {
        id: "MESSAGE ID",
        channel: "CHANNEL ID",
        title: "Welcome",
        content: "Welcome to the quiet room. This server follows a strict whitelist procedure and thus you are currently in limbo while your account is processed."
    },
    welcome_verified: {
        id: "MESSAGE ID",
        channel: "CHANNEL ID",
        title: "Welcome",
        content: "Welcome to the quiet room, intended as a calm space for discussion, positivity and acceptance. I'm Artemis, please make sure you read the rules and my available commands."
    },
    rules: {
        id: "MESSAGE ID",
        channel: "CHANNEL ID",
        title: "Rules",
        content: "Simply put there's 3 main rules: don't be obnoxious, be kind and respect peoples' spaces, and don't send invites to people without permission. Aside from those, I ask that you keep content to the relevant text channels although it's not hugely important."
    },
    commands: {
        id: "MESSAGE ID",
        channel: "CHANNEL ID",
        title: "Commands",
        content:
            "**!userinfo <user>:** get some basic information about someone\n" +
            "**!command2:** second command, etc\n" +
            "**!command3:** third command, etc\n"
    }
}

export { Guild, Roles, Channels, Embeds, Messages, Settings }