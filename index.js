const { Client, Collection } = require("discord.js");

const bot = new Client();
const fs = require("fs")
const dbUser = require("./database.json")

const { token } = require("./config.json")

["aliases", "commands"].forEach(function(x) { bot[x] = new Collection()});
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on("message", function(message) {
    if (message.author.bot) return;

     //         leveling         //

    if (!dbUser[message.author.id]) {
        dbUser[message.author.id] = {
            level: 0,
            exp: 0
        };
      };

      let dbUs = dbUser[message.author.id]
      
      var expRandom = Math.floor(Math.random() * 3) + 1;
      
      dbUs.exp += expRandom

      var nextLevel = dbUs.level * 500;
      if (nextLevel === 0) nextLevel = 100;
      
      
      let estUser = dbUser[message.author.id]
      if (estUser.exp >= nextLevel) {
        estUser.level++
        message.channel.send("You leveled UP!  **Level:** `" + estUser.level + "`")
      };
      
      
      fs.writeFile("./database.json", JSON.stringify(dbUser), function(err) {
        if (err) console.log(err)
      });
     
        
        
     // ----------------------- //
 })

bot.login(token);
