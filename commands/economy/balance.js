const Discord = require("discord.js")
const fs  = require("fs")
const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));

module.exports = {
config: {
  name: "balance",
  description: "Observa tu estado de economía actual",
  usage: "balance",
  accesableby: "Members", 
  aliases: ["bal", "balance",]
},

  run: function(bot, message, args) {
    const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));
  
    let user = message.mentions.users.first() || message.author
    
    if (!bal[user.id]) {
      bal[user.id] = {
        coins: 0,
        rep: 0,
        streak: 0,
        points: 0
      }
    }

    var bDate = bal[user.id]
    
    const embed = new Discord.RichEmbed()
    .setColor('PURPLE')
    .setDescription("Rep: " + bDate.rep + "\nCoins: " + bDate.coins)
    .setFooter("Balance de " + user.tag, user.displayAvatarURL)
    
    
    message.channel.send(embed)
    
    fs.writeFile("./balance.json", JSON.stringify(bal), function(err) {
      if (err) console.log(err)
    })
  }
}


/*exports.help = {
  name: 'balance',
  aliases: ['bal', 'balance']
};*/

/*const balance = require("../balance.json")
const config = require("discord.js")
const fs = require("fs")
const Discord = require("discord.js")

exports.run = (client, message, args) => {

balance[message.mentions.users.first() || message.author] = {
    level: 0,
    cent: 0,
    zafiro: 0
}

let user = message.mentions.users.first() || message.author;
let cent = balance[message.mentions.users.first() || message.author].cen
let zafiro = balance[message.mentions.users.first() || message.author].zafiro

const embed = new Discord.RichEmbed()
.setColor(config.colorT)
.setThumbnail(user.avatarURL)
.setDescription("Cent : " + cent + " \n Zafiro : " + zafiro)

message.channel.send(embed)

}*/