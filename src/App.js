import React, { Component } from 'react';
import './App.css';
import Chart from './componentes/chart.js'
import Fecha from './componentes/fecha.js'
import BtnExport from './componentes/btn-export';
import Tabla from './componentes/tabla';
import {Tabs, Tab} from 'react-bootstrap-tabs';

class App extends Component {

    constructor(){
        super();
        this.state = {
            chartData : {},
            isChartLoaded: false,
            tableData: {},
            isTableLoaded: false,
            infoType : "importes",
            titulo: 'REPORTE ESTADISTICO DE IMPORTES POR CONCEPTO',
            subtitulo: 'DEL 03/01/2015 AL 06/01/2015',
            fechaInicio: '1420243200',
            fechaFin: '1420502400',
            grafico : 'column2d',
            anio : '2015',
            opcion : 'fecha',
            colores : "",
            grad : "0",
            prefijo : "S/",
            listaConceptos : ""
        };
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this);
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this);
        this.handleChangeGrafico = this.handleChangeGrafico.bind(this);
        this.handleChangeGrad = this.handleChangeGrad.bind(this);
        this.handleChangeAnio = this.handleChangeAnio.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.handleChangeColores = this.handleChangeColores.bind(this);
        this.handleChangeInfoType = this.handleChangeInfoType.bind(this);
        this.handleChangePrefijo = this.handleChangePrefijo.bind(this);
        this.handleChangeListaConceptos = this.handleChangeListaConceptos.bind(this);
    }

    handleChangeFechaInicio(date){
        this.setState({
            fechaInicio : date.unix()
        });
        console.log(this.state.fechaInicio);
    }

    handleChangeFechaFin(date){
        this.setState({
            fechaFin : date.unix()
        });
        console.log(this.state.fechaInicio);
    }

    handleChangeGrafico(event) {
        this.setState({
            grafico: event.target.value
        });
        console.log(this.state.grafico);
    }

    handleChangeGrad(event) {
        this.setState({
            grad: event.target.value
        });
        console.log(this.state.grad);
    }

    handleChangeAnio(event) {
        this.setState({
            anio: event.target.value
        });
        console.log(this.state.anio);
    }

    handleChangeOpcion(event) {
        this.setState({
            opcion: event.target.value
        });
        console.log(this.state.opcion);
    }

    handleChangeColores(event) {
        this.setState({
            colores: event.target.value
        });
        console.log(this.state.colores);
    }

    handleChangeInfoType(event){
        if(this.state.infoType === "operaciones"){
            this.setState({
                prefijo : "S/"
            })
        }else{
            this.setState({
                prefijo : ""
            })
        }
        this.setState({
            infoType : event.target.value
        });
        console.log(this.state.infoType);
        console.log(this.state.prefijo);
    }

    handleChangePrefijo(event){
        this.setState({
            infoType : event.target.value
        });
        console.log(this.state.prefijo);
    }

    handleChangeListaConceptos(event){
        this.setState({
            listaConceptos : event.target.value
        });
        console.log(this.state.listaConceptos);
    }

    componentDidMount(){
        var urlChart = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
        var urlTable = 'https://back-estadisticas.herokuapp.com/ApiController/tablaFechas/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
        this.getChartData(encodeURI(urlChart));
        this.getTableData(encodeURI(urlTable));
    }

    generarGrafica(){
        var urlChart = '';
        if(this.state.opcion === 'fecha'){
            if(this.state.infoType === "operaciones"){
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
                var fi = new Date(this.state.fechaInicio*1000);
                var ff = new Date(this.state.fechaFin*1000);
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO DE NUMERO DE OPERACIONES POR CONCEPTO',
                    subtitulo : ("DEL "+
                    (fi.getUTCDate()<=9 ? ("0"+fi.getUTCDate()) : (fi.getUTCDate()))
                    +"/"+(fi.getUTCDate()<=8 ? ("0"+(fi.getUTCMonth()+1)) : (fi.getUTCMonth()+1))
                    +"/"+fi.getUTCFullYear()
                    +" AL "+
                    (ff.getUTCDate()<=9 ? ("0"+ff.getUTCDate()) : (ff.getUTCDate()))
                    +"/"+(ff.getUTCDate()<=8 ? ("0"+(ff.getUTCMonth()+1)) : (ff.getUTCMonth()+1))
                    +"/"+ff.getUTCFullYear())
                });
                this.getChartData(encodeURI(urlChart));
            }
            else{
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin;
                fi = new Date(this.state.fechaInicio*1000);
                ff = new Date(this.state.fechaFin*1000);
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO DE NUMERO DE IMPORTES POR CONCEPTO',
                    subtitulo : ("DEL "+
                    (fi.getUTCDate()<=9 ? ("0"+fi.getUTCDate()) : (fi.getUTCDate()))
                    +"/"+(fi.getUTCDate()<=8 ? ("0"+(fi.getUTCMonth()+1)) : (fi.getUTCMonth()+1))
                    +"/"+fi.getUTCFullYear()
                    +" AL "+
                    (ff.getUTCDate()<=9 ? ("0"+ff.getUTCDate()) : (ff.getUTCDate()))
                    +"/"+(ff.getUTCDate()<=8 ? ("0"+(ff.getUTCMonth()+1)) : (ff.getUTCMonth()+1))
                    +"/"+ff.getUTCFullYear())
                });
                this.getChartData(encodeURI(urlChart));
            }
        }
        else{
            if(this.state.infoType === "operaciones"){
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/devolverAnioCantidad?year='+this.state.anio;
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO DE NUMERO DE OPERACIONES POR CONCEPTO',
                    subtitulo : ("DURANTE EL AÑO " + this.state.anio)
                });
                this.getChartData(encodeURI(urlChart));
            }
            else{
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/devolverAnioImporte/?year='+this.state.anio;
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO DE IMPORTES POR CONCEPTO',
                    subtitulo : ("DURANTE EL AÑO " + this.state.anio)
                });
                this.getChartData(encodeURI(urlChart));
            }
        }
    }

    getChartData(urlChart){
        fetch(urlChart)
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            result['datasets'][0]['backgroundColor'] = 'rgba(54, 162, 235, 0.6)';

            var chartData1=[];

            for(var i in result.labels)
            {
              chartData1.push({
                label: result['labels'][i],
                value: result['datasets'][0]['data'][i]
              });
            }
            console.log(chartData1);

            this.setState({
                chartData : chartData1 ,
                isChartLoaded : true,

            });
        })
    }

    getTableData(urlTable) {
        fetch(urlTable)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                this.setState({
                    tableData: result,
                    isTableLoaded: true,
                });
            })
    }

    onClickPreventDefault(e) {
        e.preventDefault();
    }


    submitDatesFunction(){
        var fi = new Date(this.state.fechaInicio*1000);
        var ff = new Date(this.state.fechaFin*1000);
        this.setState({
            isChartLoaded : false,
            isTableLoaded : false,
            titulo : ("IMPORTES POR CONCEPTO DEL "+
            (fi.getUTCDate()<=9 ? ("0"+fi.getUTCDate()) : (fi.getUTCDate()))
            +"/"+(fi.getUTCDate()<=8 ? ("0"+(fi.getUTCMonth()+1)) : (fi.getUTCMonth()+1))
            +"/"+fi.getUTCFullYear()
            +" AL "+
            (ff.getUTCDate()<=9 ? ("0"+ff.getUTCDate()) : (ff.getUTCDate()))
            +"/"+(ff.getUTCDate()<=8 ? ("0"+(ff.getUTCMonth()+1)) : (ff.getUTCMonth()+1))
            +"/"+ff.getUTCFullYear())
        });
        this.getChartData('https://back-estadisticas.herokuapp.com/apiController/importe/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin);
        this.getTableData('https://back-estadisticas.herokuapp.com/ApiController/tablaFechas/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin);
    }

    submitYearFunction(){
        this.setState({
            isChartLoaded : false,
            isTableLoaded : false,
            titulo : ("IMPORTES DURANTE EL AÑO " + this.state.anio)
        });
        this.getChartData('https://back-estadisticas.herokuapp.com/apiController/devolverAnioImporte/?year='+this.state.anio);
        this.getTableData('https://back-estadisticas.herokuapp.com/ApiController/tablaYear/?year='+this.state.anio);
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
                                <hr></hr>
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
                                                    <option value="line">LINE</option>
                                                    <option value="area2d">AREA 2D</option>
                                                    <option value="column2d">BARRAS 2D</option>
                                                    <option value="column3d">BARRAS 3D</option>
                                                    <option value="pie2d">PIE 2D</option>
                                                    <option value="pie3d">PIE 3D</option>
                                                    <option value="doughnut2d">DONUT 2D</option>
                                                    <option value="doughnut2d">DONUT 3D</option>
                                                    <option value="pareto2d">PARETO 2D</option>
                                                    <option value="pareto3d">PARETO 3D</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Estilo de grafica:</label>
                                                <select className="form-control" value={this.state.grad} onChange={this.handleChangeGrad}>
                                                    <option value="0">Solido</option>
                                                    <option value="1">Desvanecido</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Color de grafica:</label>
                                                <select className="form-control" value={this.state.colores} onChange={this.handleChangeColores}>
                                                    <option value="">Colores 1</option>
                                                    <option value="FF5904,0372AB,FF0000,#1B5E20,#006064,#9b59b6,#008ee4,#B71C1C,#E65100,#004D40,#e44a00,#F57F17,#6baa01">Colores 2</option>
                                                    <option value="#000000">Blanco y negro</option>
                                                    <option value="#104865">StoneOcean theme</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tipo de vista:</label>
                                                <select className="form-control" value={this.state.infoType} onChange={this.handleChangeInfoType}>
                                                    <option value="importes">Importes</option>
                                                    <option value="operaciones">Numero de operaciones</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit"  onClick={this.generarGrafica.bind(this)} className="btn btn-primary">Generar grafica</button>
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
                                                <label>Conceptos a buscar:</label>
                                                <input type="text" className="form-control" value={this.state.listaConceptos} onChange={this.handleChangeListaConceptos} />
                                            </div>
                                            <div className="form-group">
                                                <label>Tipo de grafica:</label>
                                                <select className="form-control" value={this.state.grafico} onChange={this.handleChangeGrafico}>
                                                    <option value="line">LINE</option>
                                                    <option value="area2d">AREA 2D</option>
                                                    <option value="column2d">BARRAS 2D</option>
                                                    <option value="column3d">BARRAS 3D</option>
                                                    <option value="pie2d">PIE 2D</option>
                                                    <option value="pie3d">PIE 3D</option>
                                                    <option value="doughnut2d">DONUT 2D</option>
                                                    <option value="doughnut2d">DONUT 3D</option>
                                                    <option value="pareto2d">PARETO 2D</option>
                                                    <option value="pareto3d">PARETO 3D</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Estilo de grafica:</label>
                                                <select className="form-control" value={this.state.grad} onChange={this.handleChangeGrad}>
                                                    <option value="0">Solido</option>
                                                    <option value="1">Desvanecido</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Color de grafica:</label>
                                                <select className="form-control" value={this.state.colores} onChange={this.handleChangeColores}>
                                                    <option value="">Colores 1</option>
                                                    <option value="FF5904,0372AB,FF0000,#1B5E20,#006064,#9b59b6,#008ee4,#B71C1C,#E65100,#004D40,#e44a00,#F57F17,#6baa01">Colores 2</option>
                                                    <option value="#000000">Blanco y negro</option>
                                                    <option value="#104865">StoneOcean theme</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tipo de vista:</label>
                                                <select className="form-control" value={this.state.infoType} onChange={this.handleChangeInfoType}>
                                                    <option value="importes">Importes</option>
                                                    <option value="operaciones">Numero de operaciones</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" onClick={this.generarGrafica.bind(this)} className="btn btn-primary">Generar grafica</button>
                                            </div>
                                        </div>
                                    ) : (null)}
                                </form>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-md-12">
                                        {this.state.isTableLoaded ? (<BtnExport tableData={this.state.tableData} tableTitle={this.state.titulo} tableSubtitle={this.state.subtitulo}/>) : (console.log())}
                                    </div>
                                </div>
                            </div>
                            <div className="tablero col-md-10" id="estadisticas">
                                <Tabs align="center" onSelect={(index, label) => console.log(label + ' selected')}>
                                    <Tab label="Gráfica">
                                        {this.state.isChartLoaded ?
                                            (<Chart
                                                chartData={this.state.chartData}
                                                grafico={this.state.grafico}
                                                legendPosition="bottom"
                                                titulo={this.state.titulo}
                                                paleta={this.state.colores}
                                                grad={this.state.grad}
                                                prefijo={this.state.prefijo}
                                                subtitulo={this.state.subtitulo}/>)
                                            :(<div className="App-logo"><br></br><br></br><br></br><br></br>
                                                                        <br></br><br></br><br></br><br></br>
                                                                        <br></br><br></br><br></br><br></br>
                                                                        <h2>Cargando grafica . . .</h2></div>)
                                        }
                                    </Tab>
                                    <Tab label="Tabla">
                                        {this.state.isTableLoaded ?
                                            (<Tabla
                                                tableData={this.state.tableData} />)
                                            :(<div className="App-logo"><br></br><br></br><br></br><br></br>
                                                                        <br></br><br></br><br></br><br></br>
                                                                        <br></br><br></br><br></br><br></br>
                                                                        <h2>Cargando tabla . . .</h2></div>)}
                                    </Tab>
                                </Tabs>


                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
