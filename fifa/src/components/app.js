import React, { Component } from 'react';
import Settings from './settings';
import Games from './games';
import FinalResult from './finalResult';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.setInitialState();
    }

    setInitialState() {
        this.state = {
            status: 'settings'
        };
    }

    onSettingsSubmit(settings) {
        this.setState({
            status: 'games',
            settings: settings
        });
    }

    onAllGamesSubmit(isDraw, winner) {
        this.setState({
            status: 'final result',
            finalResult: {
                isDraw: isDraw,
                winner: winner
            }
        });
    }

    reload() {
        this.setState({
            status: 'settings'
        });
    }

    renderPage() {
        switch (this.state.status) {
            case 'settings':
                return <Settings ref={ (settings) => this.settings = settings } onSubmit={ this.onSettingsSubmit.bind(this)  } />;
            case 'games':
                return <Games settings={ this.state.settings } ref={ games => this.games = games } onSumbit={ this.onAllGamesSubmit.bind(this) } onReturnClicked={ this.reload.bind(this) } />;
            case 'final result':
                return <FinalResult finalResult={ this.state.finalResult } player1={ this.state.settings.player1 } player2={ this.state.settings.player2 } reload={ this.reload.bind(this) } />;
            default:
                return <div />;
        }
    }

    render() {
        return (
            <div>
                <h1 className='app--header'>{ this.state.status }</h1>
                { this.renderPage() }
            </div>
        );
    }
}