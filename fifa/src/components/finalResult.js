import React, { Component } from 'react';

export default class FinalResult extends Component {
    isDraw() {
        return this.props.finalResult.isDraw;
    }

    isGoalsDifferenceEqual() {
        return this.props.finalResult.winner === 0;
    }

    getWinner() {
        return this.props.finalResult.winner > 0 ? this.props.player1 : this.props.player2;
    }

    announceWinner() {
        if (this.isDraw() && this.isGoalsDifferenceEqual()) {
            return `${ this.props.player1 } and ${ this.props.player2 } have finished in a draw |:`;
        }

        return `${ this.getWinner() } is the winner ${ !this.isDraw() ? '' : 'by goals difference' } (:`;
    }

    render() {
        return (
            <div>
                <div className='finalResult--winnerAnnouncment'>
                    { this.announceWinner() }
                </div>
                <div className='finalResult--continue'>
                    <button className='finalResult--continue-btn' onClick={ this.props.reload }>Continue</button>
                </div>
            </div>
        );
    }
}