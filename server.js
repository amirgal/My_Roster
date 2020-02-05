const express = require('express')
const request = require('request')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get('/teams/:teamName', function(req, res) {
    const {teamName} = req.params
    const teamId = teamToIDs[teamName]

    request('http://data.nba.net/10s/prod/v1/2018/players.json', function(error,result) {
        let players = JSON.parse(result.body).league.standard
        players = players.filter(player => player.teamId == teamId && player.isActive).map(player => {
            return {firstName: player.firstName, lastName: player.lastName, jerseyNum: player.jersey, position: player.pos}
        })

        players.forEach(player => {
            player.img = `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}` 
        })

        res.send(players)
    })
})


const port = 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))