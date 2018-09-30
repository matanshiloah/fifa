import React, { Component } from 'react';
import Input from './input';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.buildValues();
    }

    buildValues() {
        this.buildDefaultValues();
        this.buildNumberOfGamesValues();
        this.buildTeamsTypeValues();
        this.buildTeamsLevelValues();
        this.buildCompareTypesValues();
        this.buildCompareLevelsValues();
        this.buildAllowAllStarsValues();
    }

    buildDefaultValues() {
        this.defaults = {
            player1: 'Player 1',
            player2: 'Player 2',
            numberOfGames: 1,
            teamsType: { 'clubs': true },
            teamsLevel: { 5: true },
            compareTypes: 'yes',
            compareLevels: 'yes',
            allowAllStars: 'yes'
        };
    }

    buildNumberOfGamesValues() {
        this.numberOfGamesValues = [ 
            { value: 1 }, 
            { value: 3 }, 
            { value: 5 }, 
            { value: 7 } 
        ];
    }

    buildTeamsTypeValues() {
        this.teamsTypeValues = [ 
            { value: 'clubs', label: 'Clubs' }, 
            { value: 'men', label: 'National teams - men' }, 
            { value: 'women', label: 'National teams - women' } 
        ];
    }

    buildTeamsLevelValues() {
        this.teamsLevelValues = [
            { value: 0.5 },
            { value: 1 },
            { value: 1.5 },
            { value: 2 },
            { value: 2.5 },
            { value: 3 },
            { value: 3.5 },
            { value: 4 },
            { value: 4.5 },
            { value: 5 },
        ];
    }

    buildCompareTypesValues() {
        this.compareTypesValues = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ];
    }

    buildCompareLevelsValues() {
        this.compareLevelsValues = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ];
    }

    buildAllowAllStarsValues() {
        this.allowAllStarsValues = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
        ];
    }

    onSubmit() {
        this.props.onSubmit({
            player1: this.player1.getValue(),
            player2: this.player2.getValue(),
            numberOfGames: this.numberOfGames.getValue(),
            teamsType: this.teamsType.getValue(),
            teamsLevel: this.teamsLevel.getValue(),
            compareTypes: this.compareTypes.getValue(),
            compareLevels: this.compareLevels.getValue(),
            allowAllStars: this.allowAllStars.getValue()
        });
    }

    render() {
        return (
            <div>
                <Input type='text' label='Player 1' defaultValue={ this.defaults.player1 } ref={ player1 => this.player1 = player1 } />
                <Input type='text' label='Player 2' defaultValue={ this.defaults.player2 } ref={ player2 => this.player2 = player2 } />
                <Input type='select' values={ this.numberOfGamesValues } label='Number of games' defaultValue={ this.defaults.numberOfGames } ref={ numberOfGames => this.numberOfGames = numberOfGames } />
                <Input type='checkbox' values={ this.teamsTypeValues } label='Teams type' defaultValue={ this.defaults.teamsType } ref={ teamsType => this.teamsType = teamsType }  />
                <Input type='checkbox' values={ this.teamsLevelValues } label='Teams level' defaultValue={ this.defaults.teamsLevel } ref={ teamsLevel => this.teamsLevel = teamsLevel } />
                <Input type='radio' values={ this.compareTypesValues } label='Compare types' defaultValue={ this.defaults.compareTypes } ref={ compareTypes => this.compareTypes = compareTypes } />
                <Input type='radio' values={ this.compareLevelsValues } label='Compare levels' defaultValue={ this.defaults.compareLevels } ref={ compareLevels => this.compareLevels = compareLevels } />
                <Input type='radio' values={ this.allowAllStarsValues } label='Allow all stars' defaultValue={ this.defaults.allowAllStars } ref={ allowAllStars => this.allowAllStars = allowAllStars } />
                <button className='settings--submit' onClick={ this.onSubmit.bind(this) }>Draw games</button>
            </div>
        );
    }
}