import React, { Component } from 'react';
import Popup from "reactjs-popup";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ToolTipPositions extends Component{
    constructor(props){
        super(props);
    }

    crearGroupCheckers(){
        const objs = [];
        for(var i in this.props.conceptsData){
            objs.push(<label key={i}><Checkbox value={this.props.conceptsData[i]["label"]}/>{this.props.conceptsData[i]["label"]}</label>);
        }
        return objs;
    }

    render(){
        return(
            <div>
                <Popup trigger={<button className="btn btn-info btn-block"><b>Escoger conceptos</b></button>} position="right top" on="hover">
                    <div className="card">
                        {this.props.todos===true ?
                            (<button className="btn btn-info btn-block" onClick={this.props.todosChanged}><b>Marcar todos</b></button>)
                            :((<button className="btn btn-info btn-block" onClick={this.props.ningunoChanged}><b>Desmarcar todos</b></button>))
                        }
                        <br></br>
                        <CheckboxGroup
                            checkboxDepth={2} // This is needed to optimize the checkbox group
                            name="conceptos"
                            value={this.props.conceptos}
                            onChange={this.props.conceptosChanged}
                        >
                            {this.crearGroupCheckers()}
                        </CheckboxGroup>
                        <br></br>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default ToolTipPositions;
