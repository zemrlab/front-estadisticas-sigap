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
            fechaFin : '1420588800',
            grafico : '1',
            anio : '2015',
            opcion : 'fecha'
        };
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this);
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this);
        this.handleChangeGrafico = this.handleChangeGrafico.bind(this);
        this.handleChangeAnio = this.handleChangeAnio.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
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

    handleChangeGrafico(event) {
        this.setState({grafico: event.target.value});
    }

    handleChangeAnio(event) {
        this.setState({anio: event.target.value});
    }

    handleChangeOpcion(event) {
        this.setState({opcion: event.target.value});
    }

    componentDidMount(){
        var url = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
        this.getChartData(encodeURI(url));
    }

    onChangeTipoMounted(){
        var url = '';
        if(this.state.opcion === 'fecha'){
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
        else{
            if(this.state.infoType === "monto"){
                url = 'https://back-estadisticas.herokuapp.com/apiController/devolverAnioCantidad?year='+this.state.anio;
                this.setState({
                    isLoaded : false,
                    infoType : "importes",
                    titulo : "Importes durante el año"
                });
                this.getChartData(encodeURI(url));
            }
            else{
                url = 'https://back-estadisticas.herokuapp.com/apiController/devolverAnioImporte/?year='+this.state.anio;
                this.setState({
                    isLoaded : false,
                    infoType : "monto",
                    titulo : "Montos durante el año"
                });
                this.getChartData(encodeURI(url));
            }
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

    submitYearFunction(){
        this.setState({
            isLoaded : false,
            infoType : "monto"
        });
        this.getChartData('https://back-estadisticas.herokuapp.com/apiController/devolverAnioImporte/?year='+this.state.anio);
    }

    render() {

        const op = this.state.opcion;
        return (
            <div className="App">
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="panel col-md-2">
                                <form className="opciones-formulario" onSubmit={this.onClickPreventDefault}>
                                    <div className="form-group">
                                        <label>Filtro:</label>
                                        <select className="form-control" value={this.state.opcion} onChange={this.handleChangeOpcion}>
                                            <option value="fecha">POR FECHAS</option>
                                            <option value="year">POR AÑO</option>
                                        </select>
                                    </div>
                                </form>

                                <form className="formularios" onSubmit={this.onClickPreventDefault}>

                                    {op === 'fecha' ? (
                                        <div>
                                            <div className="form-group">
                                                <label>Fecha inicial:</label>
                                                <Fecha startDate={this.state.fechaInicio} handleChange={this.handleChangeFechaInicio}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Fecha final:</label>
                                                <Fecha startDate={this.state.fechaFin} handleChange={this.handleChangeFechaFin}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Tipo de grafica:</label>
                                                <select className="form-control" value={this.state.grafico} onChange={this.handleChangeGrafico}>
                                                    <option value="1">BARRAS</option>
                                                    <option value="2">PIZZA</option>
                                                    <option value="3">LINEAS</option>
                                                    <option value="4">DONUT</option>
                                                    <option value="5">RADAR</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit"  onClick={this.submitDatesFunction.bind(this)} className="btn btn-primary">Generar</button>
                                            </div>
                                        </div>
                                    ):(null)}

                                    {op === 'year' ? (
                                        <div>
                                            <div className="form-group">
                                                <label>Año a buscar:</label>
                                                <input type="text" className="form-control" value={this.state.anio} onChange={this.handleChangeAnio} />
                                            </div>
                                            <div className="form-group">
                                                <label>Tipo de grafica:</label>
                                                <select className="form-control" value={this.state.grafico} onChange={this.handleChangeGrafico}>
                                                    <option value="1">BARRAS</option>
                                                    <option value="2">PIZZA</option>
                                                    <option value="3">LINEAS</option>
                                                    <option value="4">DONUT</option>
                                                    <option value="5">RADAR</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" onClick={this.submitYearFunction.bind(this)} className="btn btn-primary">Generar</button>
                                            </div>
                                        </div>
                                    ) : (null)}
                                </form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="btn btn-default" onClick={this.onChangeTipoMounted.bind(this)}>Monto/Importes</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tablero col-md-10">
                                {this.state.isLoaded ? <Chart chartData={this.state.chartData} grafico={this.state.grafico}  legendPosition="bottom" textTitle={this.state.titulo}/> : <div>Esperando recurso...</div>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
