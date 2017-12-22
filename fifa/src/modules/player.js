let POINTS = {
    win: 3,
    draw: 1,
    lost: 0
};

module.exports = class Player {
    constructor(name) {
        this.name = name;
        this.initializeResults();
    }

    initializeResults() {
        this.points = 0;
        this.goals = {
            scored: 0,
            against: 0
        };
    }

    getName() {
        return this.name;
    }

    getPoints() {
        return this.points;
    }

    getGoalsScored() {
        return this.goals.scored;
    }

    getGoalsAgainst() {
        return this.goals.against;
    }

    getGoalsDiff() {
        return this.goals.scored - this.goals.against;
    }

    onGameEnd(goalsScored, goalsAgainst) {
        goalsScored = parseInt(goalsScored, 10);
        goalsAgainst = parseInt(goalsAgainst, 10);

        this.setGoals(goalsScored, goalsAgainst);
        this.setPoints(goalsScored - goalsAgainst);
    }

    setGoals(goalsScored, goalsAgainst) {
        this.goals.scored += goalsScored;
        this.goals.against += goalsAgainst;
    }

    setPoints(goalsDiff) {
        if (goalsDiff > 0) {
            this.points += POINTS.win;
        } else if (goalsDiff < 0) {
            this.points += POINTS.lost;
        } else {
            this.points += POINTS.draw;
        }
    }

    restart() {
        this.initializeResults();
    }
}