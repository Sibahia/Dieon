module.exports = function(bot) {

    let prompt = process.openStdin()
    prompt.addListener("data", function(res) {
        let x = res.toString().trim().split(/ +/g)
        bot.channels.get("638363719901904905").send(x.join(" "))
    })
}