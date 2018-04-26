import React, {Component} from 'react';
import {Bar, Line, Pie, Doughnut, Radar} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            "chartData" : props.chartData,
            "grafico" : props.grafico
        };
    }

    static defaultProps = {
        displayTitle : true,
        textTitle : "Titulo",
        displayLegend : true,
        legendPosition : 'right'
    }

    render(){
        const graf = this.state.grafico;
        return (
            <div className="chart">
                {graf === '1' ? (
                    <div className="verBar">
                        <Bar
                            data={this.state.chartData}
                            options={{
                                title : {
                                    display : this.props.displayTitle,
                                    text : this.props.textTitle,
                                    fontSize : 25
                                },
                                legend :{
                                    display : this.props.displayLegend,
                                    position : this.props.legendPosition
                                }
                            }}
                        />
                    </div>
                ) :(null)}
                {graf === '2' ? (
                    <div className="verBar">
                        <Pie
                            data={this.state.chartData}
                            options={{
                                title : {
                                    display : this.props.displayTitle,
                                    text : this.props.textTitle,
                                    fontSize : 25
                                },
                                legend :{
                                    display : this.props.displayLegend,
                                    position : this.props.legendPosition
                                }
                            }}
                        />
                    </div>
                ) :(null)}
                {graf === '3' ? (
                    <div className="verBar">
                        <Line
                            data={this.state.chartData}
                            options={{
                                title : {
                                    display : this.props.displayTitle,
                                    text : this.props.textTitle,
                                    fontSize : 25
                                },
                                legend :{
                                    display : this.props.displayLegend,
                                    position : this.props.legendPosition
                                }
                            }}
                        />
                    </div>
                ) :(null)}
                {graf === '4' ? (
                    <div className="verBar">
                        <Doughnut
                            data={this.state.chartData}
                            options={{
                                title : {
                                    display : this.props.displayTitle,
                                    text : this.props.textTitle,
                                    fontSize : 25
                                },
                                legend :{
                                    display : this.props.displayLegend,
                                    position : this.props.legendPosition
                                }
                            }}
                        />
                    </div>
                ) :(null)}
                {graf === '5' ? (
                    <div className="verBar">
                        <Radar
                            data={this.state.chartData}
                            options={{
                                title : {
                                    display : this.props.displayTitle,
                                    text : this.props.textTitle,
                                    fontSize : 25
                                },
                                legend :{
                                    display : this.props.displayLegend,
                                    position : this.props.legendPosition
                                }
                            }}
                        />
                    </div>
                ) :(null)}
            </div>
        )
    }
}

export default Chart;
