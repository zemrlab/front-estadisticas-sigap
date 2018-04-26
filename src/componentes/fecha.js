import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Fecha extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateFormat : "DD/MM/YYYY"
        };
    }

    render(){
        return <DatePicker selected={moment.unix(this.props.startDate)} onChange={this.props.handleChange} dateFormat={this.state.dateFormat}/>
    }
}

export default Fecha;
