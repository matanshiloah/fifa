let FifaData = require('./fifaData');
let worldXITeamId = 756;
let adidasAllStarTeamId = 831;
let mlsAllStarsTeamId = 832;

module.exports = {
    filterTeams: (teamsType, teamsLevel, allowAllStars) => {
        let fifaData = new FifaData();
        let key = `${ JSON.stringify(teamsType) }_${ JSON.stringify(teamsLevel) }_${ allowAllStars }`;
        let teams = fifaData.getFromCache(key);

        if (teams !== null) {
            return teams;
        }

        teams = [];
        for (let type in teamsType) {
            if (teamsType[type] === true) {
                for (let level in teamsLevel) {
                    if (teamsLevel[level] === true) {
                        teams = teams.concat(fifaData.teams[type][level] || []);
                    }
                }
            }
        }

        if (allowAllStars === 'no') {
            teams = teams.filter(team => {
                return (team.id !== worldXITeamId && team.id !== adidasAllStarTeamId && team.id !== mlsAllStarsTeamId);
            });
        }

        fifaData.insertToCache(key, teams);

        return teams;
    },
    drawNumber: (from, to) => {
        return from + Math.floor(Math.random() * (to - from));
    },
    getCountry: countryId => {
        let fifaData = new FifaData();

        return fifaData.countries[countryId];
    }
};