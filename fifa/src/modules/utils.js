let FifaData = require('./fifaData');
let worldXITeamId = 756;

module.exports = {
    filterTeams: (teamsType, teamsLevel, allowWorldXI) => {
        let fifaData = new FifaData();
        let key = `${ JSON.stringify(teamsType) }_${ JSON.stringify(teamsLevel) }_${ allowWorldXI }`;
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

        if (allowWorldXI === 'no') {
            teams = teams.filter(team => {
                return team.id !== worldXITeamId;
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