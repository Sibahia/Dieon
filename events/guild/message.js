const { prefix } = require("../../config.json")
const dbUser = require("../../database.json")
const fs = require("fs")

module.exports = async function(bot, message) {

    if (message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    

  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
  if(commandfile) commandfile.run(bot, message, args)

}