const fs = require("fs")
const Discord = require("discord.js")
const dbUser = JSON.parse(fs.readFileSync("./database.json", "utf8"))

module.exports = {
  config: {
    name: "level",
    description: "Observa tu actual nivel",
    usage: "level",
    accesableby: "Members",
    aliases: ["level", "status"]
  },

  run: function(bot, message, args) {
    const dbUser = JSON.parse(fs.readFileSync("./database.json", "utf8"))

    if (!dbUser[message.author.id]) {
        dbUser[message.author.id] = {
        level: 0,
          exp: 0
        }

    }

    let dbUs = dbUser[message.author.id]
    var nextLevel = dbUs.level * 500;

    var nextLevelXP = nextLevel - dbUs.exp
        
    const embed = new Discord.RichEmbed()
    .setColor("GOLD")
    .addField("**Level**", dbUs.level)
    .addField("**XP**", dbUs.exp)
    .setFooter(nextLevelXP + "XP para el siguiente nive", message.author.displayAvatarURL)
    message.channel.send(embed)
}


}
