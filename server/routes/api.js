const express = require("express");
const router = express.Router();
const request = require('request')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const dreamTeam = []

router.get('/teams/:teamName', function(req, res) {
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

router.put('/team',(req,res) => {
    const team = req.query
    teamToIDs[team.teamName] = team.teamId 
    res.end()
})

router.get('/dreamTeam', (req,res) => {
    res.send(dreamTeam)
})

router.post('/roster',(req,res) => {
    const player = req.body
    dreamTeam.length < 5 ? dreamTeam.push(player) : res.end()
    res.end()
})

module.exports = router;