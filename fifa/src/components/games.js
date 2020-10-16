import React, { Component } from 'react';
import Game from './game';
import * as Utils from '../modules/utils';
let Player = require('../modules/player');

export default class Games extends Component {
    constructor(props) {
        super(props);

        this.initializeGames();
        this.setPlayers(props.settings);
    }

    initializeGames() {
        this.resultsSubmitted = 0;
        this.gameRefs = [];
        this.teams = [];
        this.games = [];
    }

    setPlayers({ player1, player2 }) {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
    }

    drawGames(numberOfGames, teamsType, teamsLevel, compareLevels, compareTypes, useOnce, allowAllStars) {
        this.teams = Utils.filterTeams(teamsType, teamsLevel, allowAllStars);

        if (!this.canDrawGames(useOnce, numberOfGames)) {
            this.onDrawGamesFailure();

            return;
        }

        for (let i = 0; i < numberOfGames; i++) {
            let team1Index, team2Index;

            do {
                team1Index = Utils.drawNumber(0, this.teams.length);
                team2Index = Utils.drawNumber(0, this.teams.length);
            } while (this.isGameInvalid(team1Index, team2Index, compareLevels, compareTypes, useOnce));

            this.games.push({
                id: i,
                team1: this.teams[team1Index],
                team2: this.teams[team2Index],
                homeTeam: Math.round(Math.random() * 10) % 2
            });
        }
    }

    canDrawGames(useOnce, numberOfGames) {
        if (useOnce === 'no') {
            return this.teams.length >= 2;
        }

        return this.teams.length >= numberOfGames * 2;
    }

    onDrawGamesFailure() {
        setTimeout(() => {
            window.alert('Error: There are not at least two teams matching your settings');
            this.props.onReturnClicked();
        }, 0);
    }

    isGameInvalid(team1Index, team2Index, compareLevels, compareTypes, useOnce) {
        if (team1Index === team2Index) {
            return true;
        }

        let team1 = this.teams[team1Index], team2 = this.teams[team2Index];

        return this.areLevelsInvalid(compareLevels, team1, team2) || this.areTypesInvalid(compareTypes, team1, team2) || this.hasTeamBeenUsed(useOnce, team1) || this.hasTeamBeenUsed(useOnce, team2);
    }

    areLevelsInvalid(compareLevels, team1, team2) {
        return compareLevels === 'yes' && team1.stars !== team2.stars;
    }

    areTypesInvalid(compareTypes, team1, team2) {
        return compareTypes === 'yes' && team1.type !== team2.type;
    }

    hasTeamBeenUsed(useOnce, team) {
        if (useOnce !== 'yes') {
            return false;
        }

        for (var i = 0; i < this.games.length; i++) {
            if (this.games[i].team1.id === team.id || this.games[i].team2.id === team.id) {
                return true;
            }
        }

        return false;
    }

    onAllGamesSubmit() {
        let player1Points = this.player1.getPoints(), player2Points = this.player2.getPoints();
        let isDraw = player1Points === player2Points, winner = 0;

        if (isDraw) {
            winner = this.player1.getGoalsDiff() - this.player2.getGoalsDiff();
        } else {
            winner = player1Points - player2Points;
        }

        this.props.onSumbit(isDraw, winner);
    }

    onGameSubmit(id, homeTeamResult, awayTeamResult) {
        this.games[id].team1Result = this.games[id].homeTeam === 0 ? homeTeamResult : awayTeamResult;
        this.games[id].team2Result = this.games[id].homeTeam === 1 ? homeTeamResult : awayTeamResult;

        this.player1.onGameEnd(this.games[id].team1Result, this.games[id].team2Result);
        this.player2.onGameEnd(this.games[id].team2Result, this.games[id].team1Result);
        
        if (++this.resultsSubmitted === this.games.length) {
            this.onAllGamesSubmit();
        } else {
            this.refs.player1Result.innerText = `(${ this.player1.getPoints() } points)`;
            this.refs.player2Result.innerText = `(${ this.player2.getPoints() } points)`;
            this.refs.gamesSubmitted.innerText = this.resultsSubmitted;
        }
    }

    renderGames({ numberOfGames, teamsType, teamsLevel, compareLevels, compareTypes, useOnce, allowAllStars }) {
        this.drawGames(numberOfGames, teamsType, teamsLevel, compareLevels, compareTypes, useOnce, allowAllStars);

        return this.games.map(game => {
            return <Game key={ game.id } game={ game } player1={ this.player1 } player2={ this.player2 } onGameSubmit={ this.onGameSubmit.bind(this) } ref={ game => this.gameRefs.push(game) } />;
        });
    }

    onRedrawGamesClicked() {
        this.restartScreen();
        this.setState({
            redraw: Math.random()
        });
    }

    restartScreen() {
        let gameRefs = this.gameRefs;

        this.initializeGames();
        this.restartPlayers();
        this.refs.player1Result.innerText = `(${ this.player1.getPoints() } points)`;
        this.refs.player2Result.innerText = `(${ this.player2.getPoints() } points)`;
        this.refs.gamesSubmitted.innerText = this.resultsSubmitted;

        gameRefs.forEach(game => {
            if (game) {
                game.restartGame();
            }
        });
    }

    restartPlayers() {
        this.player1.restart();
        this.player2.restart();
    }

    render() {
        return (
            <div>
                <div className='games--details'>
                    <div className='games--details-player1'>
                        { `Player 1: ${ this.player1.getName() }` }
                        <span className='games--details-player1points' ref='player1Result'>{ `(${ this.player1.getPoints() } points)` }</span>
                    </div>
                    <div className='games--details-player2'>
                        { `Player 2: ${ this.player2.getName() }` }
                        <span className='games--details-player2points' ref='player2Result'>{ `(${ this.player2.getPoints() } points)` }</span>
                    </div>
                    <div className='games--details-resultsCounter'>
                        Games submitted:
                        <span className='games--details-submittedResults' ref='gamesSubmitted'>{ `${ this.resultsSubmitted }` }</span>
                        <span>{ `/${ this.props.settings.numberOfGames }` }</span>
                    </div>
                    <div className='games--actions games--actions-redraw'>
                        <button className='games--actions-redraw-btn' onClick={ this.onRedrawGamesClicked.bind(this) }>Redraw games</button>
                    </div>
                    <div className='games--actions games--actions-back'>
                        <button className='games--actions-back-btn' onClick={ this.props.onReturnClicked }>Back to settings</button>
                    </div>
                </div>
                <div>{ this.renderGames(this.props.settings) }</div>
            </div>
        );
    }
}