const Discord = require("discord.js")

module.exports = {
    config: {
        name: "server info",
        description: "Obten las estadisticas e información de un servidor",
        usage: "serverinfo",
        accesableby: "Members",
        aliases: ["serverinfo", "server-info", "info-server", "infoserver"]

    },
    run: function(bot, message, args) {

        let guild = message.guild;

        let h = guild.members.filter(h => !h.user.bot).size;
        let b = guild.members.filter(b => b.user.bot).size
        let all = guild.members.size

        let nVeri = guild.verificationLevel
        let lVeri = ["None", "Low", "Medium", "Safe", "Extreme"]

        let region = guild.region

        if (guild.region == "us-central") region = "🇺🇸 `Central américa`"
        if (guild.region == "us-east") region = "🇺🇸 `América del Este`"
        if (guild.region == "us-south") region = "🇧🇷 `América del Sur`"
        if (guild.region == "us-west") region = "🇺🇸 `América del Oeste`"
        if (guild.region == "brazil") region = "🇧🇷	`Brasil`"
        if (guild.region == "singapore") region = "🇸🇬 `Singapore`"
        if (guild.region == "eu-central") region = "🇪🇺 `Europa Central`"
        if (guild.region == "eu-west") region = "🇪🇺 `Europa Oriental`"
        if (guild.region == "hongkong") region = "🇭🇰 `Hong Kong`"
        if (guild.region == "japan") region = "🇯🇵 `Japón`"
        if (guild.region == "russia") region = "🇷🇺 `Rusia`"
        if (guild.region == "southafrica") region = "🇿🇦 `Sur Africa`"
        if (guild.region == "sidney") region = "🇦🇺 `Sidney`"

        var iEmbed = new Discord.RichEmbed()
        .addField("Name Server", guild.name)
        .addField("Server ID", guild.id)
        .addField("Server Region", region)
        .addField("Server Created", guild.createdAt.toDateString())
        .addField("Owner", guild.owner.user.tag)
        .addField("Joined at", guild.member(message.author).joinedAt)
        .addField("Members [" + all + "]", "Humans: " + h + " Bots: " + b)
        .addField("Verified [" + nVeri + "]", lVeri[nVeri])
        message.channel.send(iEmbed)

    }

}