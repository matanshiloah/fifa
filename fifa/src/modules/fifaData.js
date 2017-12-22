let clubsData = require('../resources/assets/clubs');
let leaguesData = require('../resources/assets/leagues');
let countriesData = require('../resources/assets/countries');
let instance = null;

module.exports = class FifaData {
    constructor() {
        if (!instance) {
            this.initializeCache();
            this.buildData();
            instance = this;
        }

        return instance;
    }

    initializeCache() {
        this.cache = {};
    }

    buildData() {
        this.initializeData();
        this.countries = this.buildCountries();
        this.teams.clubs = this.buildClubs();
    }

    initializeData() {
        this.countries = {};
        this.teams = {
            clubs: {},
            men: {},
            women: {}
        };
    }

    buildCountries() {
        let countries = {};
        let nationalTeamTypes = [ 'men', 'women' ];

        Object.keys(countriesData.countries).map(countryId => {
            let flag = require(`../resources/images/flags/flag_${ countryId }.png`);
            let country = countriesData.countries[countryId];

            if (country.hasOwnProperty('national_teams')) {
                nationalTeamTypes.map(type => {
                    if (country.national_teams.hasOwnProperty(type)) {
                        let stars = country.national_teams[type].stars;

                        this.teams[type][stars] = this.teams[type][stars] || [];
                        this.teams[type][stars].push(this.buildNationalTeam(country, flag, type));
                    }

                    return true;
                });
            }

            country.flag = flag;
            delete country.national_teams;
            countries[country.id] = country;

            return true;
        });

        return countries;
    }

    buildNationalTeam(country, flag, type) {
        return {
            name: country.name,
            id: country.national_teams[type].id,
            stars: country.national_teams[type].stars,
            type: type,
            flag: flag
        };
    }

    buildClubs() {
        let clubs = {};

        Object.keys(clubsData.clubs).map(clubId => {
            let club = clubsData.clubs[clubId];

            if (club.hasOwnProperty('deprecated') && club.deprecated === true) {
                return false;
            }

            let league = leaguesData.leagues[club.league];

            clubs[club.stars] = clubs[club.stars] || [];
            club.type = 'club';
            club.logo = require(`../resources/images/clubs/logo_${ clubId }.png`);
            club.league = {
                name: league.name,
                country: league.country
            };
            clubs[club.stars].push(club);
            
            return true;
        });

        return clubs;
    }

    insertToCache(key, data) {
        this.cache[key] = data;
    }

    getFromCache(key) {
        return this.cache[key] || null;
    }
}