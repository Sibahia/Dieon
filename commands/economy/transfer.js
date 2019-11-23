const fs = require("fs")
const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));
const Discord = require("discord.js")
const { prefix } = require("../../config.json")

module.exports = {
    config: {
        name: "transfer",
        description: "Realiza una transacción",
        usage: "transfer",
        accesableby: "Members", 
        aliases: ["transfer"]
      },

      run: function(bot, message, args) {
        const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));

          var hEmbed = new Discord.RichEmbed()
          .setColor("PURPLE")
          .setAuthor("Help Command", bot.user.displayAvatarURL)
          .setDescription("Use: " + prefix + "`transfer <user> <count>`")
          .setFooter("You can only use numbers")

          var uEmbed = new Discord.RichEmbed()
          .setColor("PURPLE")
          .setAuthor("Help Command", message.author.displayAvatarURL)
          .setDescription("Use: `<@user | ID>`")
          .setTimestamp(new Date())
          .setFooter("User " + message.author.username, message.author.displayAvatarURL)

          var tUser = message.mentions.members.first() || message.guild.members.get(args[0])
            if (!tUser) return message.channel.send(uEmbed);

            if (!bal[tUser.id]) {
                bal[tUser.id] = {
                    coins: 0,
                    rep: 0,
                    streak: 0,
                    points: 0
            }
          }

          let tCount = args.slice(1).join(" ")
          if (!tCount || isNaN(tCount)) return message.channel.send(hEmbed);
          if (tCount > bal[message.author.id].coins) return message.channel.send("Insufficient money.")

         bal[message.author.id].coins -= parseInt(tCount)
         bal[tUser.id].coins += parseInt(tCount)

         fs.writeFile("./balance.json", JSON.stringify(bal), function(err) {
           if (err) console.log(err)
         })
         
         let tEmbed = new Discord.RichEmbed()
         .setColor("ORANGE")
         .setDescription("You have transferred **+$" + tCount + "** to " + tUser.user.username + "\n\nYou have been removed **-$" + tCount + "**")
         .setTimestamp(new Date)
         .setFooter("User " + message.author.username, message.author.displayAvatarURL)
         message.channel.send(tEmbed)

      }
}