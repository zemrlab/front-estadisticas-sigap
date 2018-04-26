import React, { Component } from 'react';
import './App.css';
import Chart from './componentes/chart.js'
import Fecha from './componentes/fecha.js'

class App extends Component {

    constructor(){
        super();
        this.state = {
            chartData : {},
            isLoaded: false,
            infoType : "monto",
            titulo: 'Monto acumulado por concepto',
            fechaInicio : '1420329600',
            fechaFin : '1420588800'
        }
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this)
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this)
    }

    handleChangeFechaInicio(date){
        this.setState({
            fechaInicio : date.unix()
        });
    }

    handleChangeFechaFin(date){
        this.setState({
            fechaFin : date.unix()
        });
    }

    componentDidMount(){
        var url = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
        this.getChartData(encodeURI(url));
    }

    onChangeFechaMounted(){
        var url = '';
        if(this.state.infoType === "monto"){
            url = 'https://back-estadisticas.herokuapp.com/apiController/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
            this.setState({
                isLoaded : false,
                infoType : "importes",
                titulo : "Importes por concepto"
            });
            this.getChartData(encodeURI(url));
        }
        else{
            url = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
            this.setState({
                isLoaded : false,
                infoType : "monto",
                titulo : "Monto acumulado por concepto"
            });
            this.getChartData(encodeURI(url));
        }
    }

    getChartData(url = 'https://back-estadisticas.herokuapp.com/apiController/importe'){
        fetch(url)
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            result['datasets'][0]['backgroundColor'] = 'rgba(54, 162, 235, 0.6)';
            this.setState({
                chartData : result,
                isLoaded : true,
            });
        })
    }

    onClickPreventDefault(e) {
        e.preventDefault();
    }

    submitDatesFunction(){
        this.setState({
            isLoaded : false,
            infoType : "monto"
        });
        this.getChartData('https://back-estadisticas.herokuapp.com/apiController/importe/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin);
    }

    render() {
        return (
            <div className="App">
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="panel col-md-2">
                                <form onSubmit={this.onClickPreventDefault}>
                                    <div className="form-group">
                                        <label>Fecha inicial</label>
                                        <Fecha startDate={this.state.fechaInicio} handleChange={this.handleChangeFechaInicio}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha final</label>
                                        <Fecha startDate={this.state.fechaFin} handleChange={this.handleChangeFechaFin}/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"  onClick={this.submitDatesFunction.bind(this)} className="btn btn-primary">Generar</button>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="btn btn-default" onClick={this.onChangeFechaMounted.bind(this)}>Monto/Importes</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tablero col-md-10">
                                {this.state.isLoaded ? <Chart chartData={this.state.chartData} legendPosition="bottom" textTitle={this.state.titulo}/> : <div>Esperando recurso...</div>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
