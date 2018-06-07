import React, { Component } from 'react';
import Warper from "./Warper";
import Popup from "reactjs-popup";

class ToolTipPositions extends Component{
    constructor(props){
        super(props);
    }

    crearInputsCheckers(){
        const objs = [];
        objs.push(
            <div key={0}>
                <label>TODOS</label>
                <input type="checkbox" onChange={this.props.updateTodos(this.props.todos)} defaultChecked={this.props.todos}/>
            </div>
        );
        for(var i in this.props.conceptsData){
            objs.push(
                <div key={i+1}>
                    <label>{this.props.conceptsData[i]["label"]}</label>
                    <input type="checkbox" onChange={this.props.updateVerdades(i)} defaultChecked={this.props.verdades[i].value}/>
                </div>
            );
        }
        return objs;
    }

    render(){
        return(
        <div>
            <Popup trigger={<button className="btn btn-info btn-block">Escoger conceptos</button>} position="right top" on="hover">
                <div className="card">
                    <br></br>
                    <div className="content">
                        {this.crearInputsCheckers()}
                    </div>
                    <br></br>
                </div>
            </Popup>
        </div>
        );
    }
}

const Card = ({ title }) => (
    <div className="card">
        <div className="content">
            {this.state.child}
        </div>
    </div>
);

export default ToolTipPositions;
