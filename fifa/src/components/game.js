import React, { Component } from 'react';
import Team from './team';
import Input from './input';

export default class Game extends Component {
    componentDidMount() {
        this.setAwayTeamLabelPosition();
    }

    componentDidUpdate() {
        this.setAwayTeamLabelPosition();
    }

    setAwayTeamLabelPosition() {
        if (this.awayTeamLabel) {
            this.awayTeamLabel.style = `
                position: absolute;
                left: ${ this.team2.getLeftPosition() }px;
            `;
        }
    }

    onResultSubmit() {
        this.player1Result.disable();
        this.player2Result.disable();
        this.refs.submit.disabled = true;

        this.props.onGameSubmit(this.props.game.id, this.player1Result.getValue(), this.player2Result.getValue());
    }

    restartGame() {
        this.player1Result.restart();
        this.player2Result.restart();
        this.refs.submit.disabled = false;
    }

    renderGame({ id, team1, team2, homeTeam }) {
        let homePlayer = homeTeam === 0 ? this.props.player1 : this.props.player2;
        let awayPlayer = homeTeam === 1 ? this.props.player1 : this.props.player2;

        return (
            <div className='game'>
                <div className='game--title'>{ `Game #${ id + 1 }` }</div>
                <div className='game--teams'>
                    <Team team={ team1 } />
                    <span className='game--teams-divider'>vs.</span>
                    <Team team={ team2 } ref={ team2 => this.team2 = team2 } />
                </div>
                <div className='game--details'>
                    <span className='game--details-home-team'>Home team: { homePlayer.getName() }</span>
                    <span ref={ awayTeamLabel => this.awayTeamLabel = awayTeamLabel }>Away team: { awayPlayer.getName() }</span>
                    <span><Input type='number' label={ `${ homePlayer.getName() } result` } ref={ player1Result => this.player1Result = player1Result } defaultValue={ 0 } className='input--player1-score' inputClassName='input--player-score' /></span>
                    <span><Input type='number' label={ `${ awayPlayer.getName() } result` } ref={ player2Result => this.player2Result = player2Result } defaultValue={ 0 } inputClassName='input--player-score' /></span>
                    <span><button className='game--details-submit' ref='submit' onClick={ this.onResultSubmit.bind(this) }>Submit result for game { id + 1 }</button></span>
                </div>
            </div>
        );
    }

    render() {
        return this.renderGame(this.props.game);
    }
}