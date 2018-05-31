import React, { Component } from 'react';
import Checkerbox from './componentes/checkerbox.js';

class CheckList extends Component{

    constructor(props){
        super(props);
        this.state = {
            conceptsData : props.conceptsData
        }
    }

}

export default CheckList;
