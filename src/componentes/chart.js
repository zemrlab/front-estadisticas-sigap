import React, {Component} from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import ReactFC from 'react-fusioncharts';

Charts(FusionCharts);
OceanTheme(FusionCharts);



class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData : props.chartData,
            type : props.grafico,
            width: 1200,
            height: 700,
            dataFormat: 'json',
            dataSource: {
                chart: {
                    "formatNumberScale" : "0",
                    "palettecolors": props.paleta,
                    "baseFont": "Arial",
                    "baseFontSize": "16",
                    caption: props.titulo,
                    subcaption : "      ",
                    captionFontSize: "24",
                    numberPrefix: 'S/ ',
                    theme: 'ocean',
                    "exportEnabled": "1",
                    "usePlotGradientColor": props.grad,
                    "plotGradientColor":"#ffffff"
                },
                data:
                    props.chartData,

            },
        };
        this.handleChangeTipo = this.handleChangeTipo.bind(this);
    }

    handleChangeTipo(tipo){
        this.setState({
            type : tipo
        });
    }


    static defaultProps = {
        displayTitle : true,
        textTitle : "Titulo",
        displayLegend : true,
        legendPosition : 'right'
    }



    render(){
        return (
          <div>
          <ReactFC {...this.state} />

        </div>
        )
    }
}

export default Chart;
