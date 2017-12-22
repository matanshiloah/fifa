import React, { Component } from 'react';
let starImagePath = require('../resources/images/star.png');

export default class Stars extends Component {
    constructor(props) {
        super(props);

        this.isInt = Number.isInteger(props.count);
        this.stars = this.buildStars(props.count);
    }

    buildStars(count) {
        let starsArr = [];

        for (let i = 1; i <= count; i++) {
            starsArr.push(this.buildStar(i, false));
        }

        if (!this.isInt) {
            starsArr.push(this.buildStar(count + 1, true));
        }

        return starsArr;
    }

    buildStar(key, isHalf) {
        return <img key={ key } className={ `stars--img ${ isHalf ? 'stars--img-half' : '' }` } src={ starImagePath } alt='star' />;
    }

    render() {
        return (
            <span className='stars' title={ `${ this.props.count } stars` }>
                { this.stars.map(star => { return star; }) }
            </span>
        );
    }
}