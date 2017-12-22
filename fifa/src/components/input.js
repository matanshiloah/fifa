import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.defaultValue = props.defaultValue;
        this.buildInput(props);
    }

    buildInput({ type, values }) {
        switch (type) {
            case 'select':
                this.setSingleValue();
                this.getValue = this.getSingleValue.bind(this);
                this.renderInput = this.renderSelect.bind(this, values);
                break;
            case 'checkbox':
                this.setMultipleValue();
                this.getValue = this.getMultipleValue.bind(this);
                this.renderInput = this.renderCheckbox.bind(this, values);
                break;
            case 'text':
                this.setSingleValue();
                this.getValue = this.getSingleValue.bind(this);
                this.renderInput = this.renderText.bind(this);
                break;
            case 'number':
                this.setSingleValue();
                this.getValue = this.getSingleValue.bind(this);
                this.renderInput = this.renderNumber.bind(this);
                break;
            case 'radio':
                this.setSingleValue();
                this.getValue = this.getSingleValue.bind(this);
                this.renderInput = this.renderRadio.bind(this, values);
                break;
            default:
                this.getValue = () => {};
                this.renderInput = () => { return <span /> };
                break;
        }
    }

    setMultipleValue() {
        this.value = {};

        Object.keys(this.defaultValue).map(key => {
            this.value[key] = true;

            return true;
        });
    }

    setSingleValue() {
        this.value = this.defaultValue;
    }

    getMultipleValue() {
        for (let value in this.value) {
            if (this.value[value]) {
                return this.value;
            }
        }

        return this.defaultValue;
    }

    getSingleValue() {
        return this.value || this.defaultValue;
    }

    onValueChange(event) {
        this.value = event.target.value;
    }

    onMultipleChoicesChange(event) {
        this.value = this.value || {};

        this.value[event.target.value] = event.target.checked === undefined || event.target.checked;
    }

    renderSelect(values) {
        return (
            <select className='input--type-select' onChange={ this.onValueChange.bind(this) } defaultValue={ this.defaultValue }>
                {
                    values.map(value => {
                        return <option key={ value.value } value={ value.value }>{ value.value }</option>
                    })
                }
            </select>
        );
    }

    renderCheckbox(values) {
        return (
            <span>
                {
                    values.map(value => {
                        return (
                            <span className='input--type-checkbox-boxesContainer' key={ value.value }>
                                <input className='input--type-checkbox-singleBox' key={ value.value } type='checkbox' value={ value.value } onChange={ this.onMultipleChoicesChange.bind(this) } defaultChecked={ this.defaultValue[value.value] === true } />{ value.label || value.value }
                            </span>
                        )
                    })
                }
            </span>
        );
    }

    renderText() {
        return <input type='text' onChange={ this.onValueChange.bind(this) } defaultValue={ this.defaultValue } maxLength={ 10 } />
    }

    renderNumber() {
        return <input type='number' className={ `input--type-number ${ this.props.inputClassName }` } ref='score' onChange={ this.onValueChange.bind(this) } defaultValue={ this.defaultValue } />
    }

    renderRadio(values) {
        return (
            <span>
                {
                    values.map(value => {
                        return (
                            <span className='input--type-radio-radiosContainer' key={ value.value }>
                                <input className='input--type-radio-singleRadio' key={ value.value } type='radio' name={ this.props.label } value={ value.value } onChange={ this.onValueChange.bind(this) } defaultChecked={ this.defaultValue === value.value } />{ value.label || value.value }
                            </span>
                        )
                    })
                }
            </span>
        );
    }

    disable() {
        this.refs.score.disabled = true;
    }

    restart() {
        this.refs.score.disabled = false;
        this.refs.score.value = this.defaultValue;
    }

    render() {
        return (
            <div className={ `input ${ this.props.className }` }>
                <span className='input--label'>{ `${ this.props.label }:` }</span>
                { this.renderInput() }
            </div>
        );
    }
}