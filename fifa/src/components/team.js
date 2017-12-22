import React, { Component } from 'react';
import Stars from './stars';
import * as Utils from '../modules/utils';

export default class Team extends Component {
    buildTeam(team) {
        if (team.type === 'club') {
            this.buildClub(team);
        } else {
            this.buildNationalTeam(team);
        }
    }

    buildClub({ name, logo, league }) {
        let country = Utils.getCountry(league.country);

        this.teamLogoSrc = logo;
        this.teamLogoClassName = 'team--logo';
        this.teamName = name;
        this.teamLeagueImage = <img className='team--details-league' src={ country.flag } alt={ `${ league.name } (${ country.name })` } title={ `${ league.name } (${ country.name })` } />;
    }
    
    buildNationalTeam({ name, flag, type }) {
        this.teamLogoSrc = flag;
        this.teamLogoClassName = 'team--logo team--logo-national-team';
        this.teamName = `${ name } (${ type.charAt(0).toUpperCase() }${ type.substring(1) })`;
        this.teamLeagueImage = <span />;
    }

    getLeftPosition() {
        return this.item.getBoundingClientRect().left;
    }

    render() {
        let team = this.props.team;
        this.buildTeam(team);

        return (
            <span key={ team.id } className='team' ref={ item => this.item = item }>
                <img alt={ team.name } src={ this.teamLogoSrc } className={ this.teamLogoClassName } title={ team.name } />
                <span className='team--details'>
                    { this.teamName }
                    { this.teamLeagueImage }
                    <Stars count={ team.stars } />
                </span>
            </span>
        );
    }
}