const fs = require("fs")
const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));

const Discord = require("discord.js")

module.exports = {
    config: {
        name: "daily",
        description: "Recibe tu pago diario",
        usage: "daily",
        accesableby: "Members", 
        aliases: ["dly", "daily"]
      },

      run: function (bot, message, args) {
        const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));

          var bDate = bal[message.author.id]

          if (!bDate) {
              bDate = {
                  coins: 0,
                  rep: 0,
                  streak: 1,
                  points: 1

              }
          }

          let dly = 150;
          let bonusDly = 50;

          bDate.streak++

          if (bDate.points >= 10) {
              bDate.coins += parseInt(dly)
              bDate.coins += parseInt(bonusDly)
              bDate.points = 1;

              let bEmbed = new Discord.RichEmbed()
              .setColor("GOLD")
              .setDescription("You have obtained **$" + dly + "** daily coins\nYou have earned **$" + bonusDly + "** bonus for a 10 day streak\n\nCurrently your streak is from: `" + bDate.streak + "`")
              .setTimestamp(new Date)
              .setFooter("User " + message.author.username, message.author.displayAvatarUR)

              message.channel.send(bEmbed)

          } else {
            bDate.coins += dly
            bDate.points++
            
            let dEmbed = new Discord.RichEmbed()
            .setColor("GOLD")
            .setDescription("You have obtained **$" + dly + "** daily coins\n\nCurrently your streak is from: `" + bDate.streak + "`")
            .setTimestamp(new Date)
            .setFooter("User " + message.author.username, message.author.displayAvatarURL)

            message.channel.send(dEmbed)
          }
          

          fs.writeFile("./balance.json", JSON.stringify(bal), function(err) {
              if (err) console.log(err)
          })

      }

}