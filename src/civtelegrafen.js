let playersMax = 8
let playersRemaining = playersMax

module.exports = robot => {
    robot.respond(/ferdig/i, res => {
        playersRemaining--
        if (playersRemaining > 0) {
            res.reply(`Supert. Da venter vi bare på ${playersRemaining} spillere.`)
        } else {
            res.reply('Hurra! Da er vi klar for neste tur!')
        }
    })

    robot.respond(/status/i, res => {
        res.reply(`Vi venter på ${playersRemaining} spillere.`)
    })

    robot.respond(/(.*) er ute/i, res => {
        playersMax--
        let player = res.match[1]
        res.reply(`Historien vil bevare ${player}s minne, og ære deres kamp.`)
        res.reply(`Da er det bare ${playersMax} spillere igjen.`)
    })

    robot.respond(/reset civ/i, res => {
        playersMax = 8
        playersRemaining = playersMax
        res.reply('BZZT! ...øh... Ok, hvor var vi igjen?')
    })

    robot.respond(/new turn/i, res => {
        playersRemaining = playersMax
        res.reply(`Ny tur er startet!`)
    })
}
