import React, { Component } from 'react';

class Checkerbox extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo : props.titulo,
            checked : props.checked,
            id : props.id,
            cambio : props.cambio
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck() {
        this.cambio(this.id);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.state.titulo}</label>
                <input type="checkbox" onChange={this.cambio} defaultChecked={this.state.checked}/>
            </div>
        );
    }
}

export default Checkerbox;
