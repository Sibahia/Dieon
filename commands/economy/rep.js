/*const fs = require("fs")
const ppc = require("../profile.json")

exports.run = function(client, message, args) {

    if(![message.author.id]) {
        [message.author.id] = {
            rep: 0
        }
    }

    let usuario = message.mentions.users.first()
    if (!usuario) return message.channel.send("Menciona a el usuario para la reputación")

    for(var i = 0; i < length; i++)

}*/

const fs = require("fs")
const Discord = require("discord.js")
const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));

module.exports = {
  config: {
    name: "rep",
    description: "Dale tu punto de reputación a otra persona",
    usage: "rep",
    accessableby: "Members",
    aliases: ["rep"]
  },

  run: async function(bot, message, args) {


    const bal = JSON.parse(fs.readFileSync("./balance.json", "utf8"));

    let wUser = message.mentions.users.first()
        const embed = new Discord.RichEmbed()
      .setColor('PURPLE')
      .setDescription("Usa: s!rep <@user>")
      .setFooter("Aliases: " + "")
   if (!wUser) return message.channel.send(embed)
    if (wUser.id == message.author.id) return message.channel.send("Eeeeeh, no seas travieso e.e")
  
    if(!bal[wUser.id])  {
      bal[wUser.id] = {
        sekos: 0,
        rep: 0
      }
   }
  
   bal[wUser.id].rep++;
  
    fs.writeFile("./balance.json", JSON.stringify(bal), (err) => {
      if (err) console.log(err)
    });
  
           
    message.channel.send("Has dado **1** punto de reputación a " + wUser)
  
  }
}
