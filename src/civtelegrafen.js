// Description:
//   Keep track of remaining players in Civilization V
//
// Commands:
//   hubot ferdig - Tell hubot you are done with your turn
//   hubot [spiller] er ferdig - Tell hubot [spiller] is done with their turn
//   hubot ikke ferdig - Tell hubot you are not done with your turn after all
//   hubot [spiller] er ikke ferdig - Tell hubot [spiller] is not done with their turn after all
//   hubot ny tur - Tell hubot it's the next turn already
//   hubot status - Hubot will tell you the turn status
//   hubot [spiller] er ute - Tell hubot a player has left/lost the game
//   hubot jeg er ute - Tell hubot you have left/lost the game
//   hubot civ add [player list] - Add a space separated list of usernames as players
//   hubot civ clear - Reset hubot's memory for Civilization

module.exports = robot => {

    let players = {}

    const playersRemaining = () => {
        return Object.keys(players).filter(player => {
            return !players[player].done
        })
    }

    const playerList = () => {
        return Object.keys(players)
    }

    const nextTurn = () => {
        for (let player in players) {
            players[player].done = false
        }
    }

    const listify = array => {
        return array.map(item => {
            return '@' + item
        }).join(', ')
    }

    const stripName = name => {
        if (name[0] === '@')
            name = name.slice(1, name.length)
        return name
    }

    // hubot [spiller] er ferdig
    robot.respond(/(.*)ferdig/i, res => {
        let player
        let modifiers = []
        let modifier = res.match[1]

        if (modifier) {
            modifiers = modifier.trim().split(' ')
            player = modifiers[0]
            player = stripName(player)
            if (player === 'jeg')
                player = res.message.user.name
        } else {
            player = res.message.user.name
        }

        if (modifier &&
            modifiers &&
            modifiers[modifiers.length - 1] === 'ikke') {

            players[player].done = false

            let remaining = playersRemaining().length
            let unit = (remaining == 1) ? 'spiller' : 'spillere'
            res.reply(`Ok. Da venter vi på ${remaining} ${unit}.`)

        } else {

            players[player].done = true

            if (playersRemaining().length > 0) {
                let remaining = playersRemaining().length
                let unit = (remaining == 1) ? 'spiller' : 'spillere'
                res.reply(`Supert. Da venter vi bare på ${remaining} ${unit}.`)
            } else {
                nextTurn()
                res.send('@channel: Hurra! Da er vi klar for neste tur!')
            }
        }

    })

    // hubot next turn
    robot.respond(/ny tur/i, res => {
        nextTurn()
        res.reply('Hurra! Da er vi visst klare for neste tur!')
    })

    // hubot status
    robot.respond(/status/i, res => {
        if (playerList().length == 0)
            return res.send('Jeg mangler spillere. Legg til noen, da vel.')

        let remaining = playersRemaining().length
        let unit = (remaining == 1) ? 'spiller' : 'spillere'

        res.send(`${playerList().length} spillere kjemper om verdensherredømme.`)
        res.send(`Vi venter på ${remaining} ${unit} denne turen.`)
        res.send(`Disse er ikke ferdig: ${listify(playersRemaining())}`)
    })

    // hubot [spiller] er ute
    robot.respond(/(.*) er ute/i, res => {
        let player = res.match[1]
        player = stripName(player)
        if (player === 'jeg')
            player = res.message.user.name

        delete players[player]

        res.send(`Historien vil bevare ${player}s minne, og ære deres kamp!`)
        res.send(`Da er det ${playerList().length} spillere igjen.`)
    })

    // hubot civ add [player list]
    robot.respond(/civ add (.*)/i, res => {
        let playersString = res.match[1]
        for (let player of playersString.trim().split(' ')) {
            players[player] = players[player] || {
                done: false
            }
        }

        res.reply(`Ok, da har vi følgende spillere: ${listify(playerList())}`)
    })

    // hubot civ clear
    robot.respond(/civ clear/i, res => {
        players = {}

        res.reply('BZZT! ...øh... Ok, hvor var vi igjen?')
    })
}
