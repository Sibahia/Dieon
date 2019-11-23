/*const { readdirSync } = require("fs")

module.exports = function(bot) {

    const load = function(dirs) {
        const events = readdirSync("./events/" + dirs + "/").filter(function(d) {
            d.endsWith(".js")
        });

            for (let file of events) {
                const evt = require("../events/" + dirs + "/" + file)
                let eName = file.split(".")[0]
                bot.on(eName, evt.bind(null, bot))
            };
    };
    
    ["client", "guild"].forEach(function(x) {
        load(x)})

}*/
  
const { readdirSync } = require("fs")

module.exports = (bot) => {
    const load = dirs => {    
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            bot.on(eName, evt.bind(null, bot));
          };
        };
        ["client", "guild"].forEach(x => load(x));
};