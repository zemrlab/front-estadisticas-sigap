import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import "jspdf-autotable";
class BtnExport extends Component{

    constructor(props){
        super(props);
        this.state = {
            tableData: props.tableData,
            tableTitle: props.tableTitle,
            tableSubtitle: props.tableSubtitle
        };
        this.printDocument = this.printDocument.bind(this);
    }


    printDocument() {
        function pie(doc,nombreSistema,version) {

                    doc.setFont("Helvetica", "Oblique");
                    doc.setFontSize(10);

                    doc.line(10,283,200,283);
                    doc.text(180, 287, "| Page " + doc.internal.getNumberOfPages().toString());

                    doc.setFont("Helvetica", "Oblique");
                    doc.setFontSize(11);
                    doc.text(13,287, nombreSistema +" VERSION "+ version);
                    return 0;
                }
        function Format() {

            var doc = new jsPDF();
            var nombreUniversidad = "Universidad Nacional Mayor de San Marcos";
            var nombreFacultad = "Facultad de Ingeniería de Sistemas e Informática";
            var nombreUnidad = "Unidad de Postgrado";
            var user = "Faker";
            var nombreSistema = "SIGAP";
            var version = "1.0";
            var marcHora;
            var marcacion = new Date()
            var Hora = marcacion.getHours()
            var Minutos = marcacion.getMinutes()
            var Segundos = marcacion.getSeconds()
            var dn = "a.m"
                if (Hora > 12) {
                    dn = "p.m"
                    Hora = Hora - 12
                }
                if (Hora == 0)
                    Hora = 12

                if (Hora <= 9) Hora = "0" + Hora
                if (Minutos <= 9) Minutos = "0" + Minutos
                if (Segundos <= 9) Segundos = "0" + Segundos

                marcHora = Hora + ":" + Minutos + ":" + Segundos + " " + dn;

                doc.setFontStyle("normal");
                doc.setFontSize(15);
                doc.text(13,15,nombreUniversidad);
                doc.text(13,21,nombreFacultad);
                doc.text(13,27,nombreUnidad);

                doc.setFontStyle("normal");
                doc.setFontSize(12);
                doc.text(150,15,"Usuario: ");
                doc.text(170,15,user);

                doc.text(150,22,"Hora: ");
                doc.text(170,22,marcHora);

                pie(doc,nombreSistema,version);



                return doc;
            }

        var pdf = function (graf, columns, rows, titulo) {

            var nombreSistema = "SIGAP";
            var version = "1.0";
            var doc=Format();
            var Dia = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado", "Domingo");
            var Mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
                    "Octubre", "Noviembre", "Diciembre");
            var Hoy = new Date();
            var Anio = Hoy.getFullYear();
            var Fecha = Dia[Hoy.getDay()] + ", " + Hoy.getDate() + " de " + Mes[Hoy.getMonth()] + " de " + Anio + ". ";

            const input = document.getElementById(graf);
            const emtHeight = input.offsetHeight;
            const emtWidth = input.offsetWidth;
            const proporcion = emtHeight/emtWidth;

            html2canvas(input)
                .then((canvas) => {
                    var imgData = canvas.toDataURL('image/jpeg');
                    var width = doc.internal.pageSize.width-20;
                    var height = width * proporcion;
                    console.log(imgData);

                    doc.addImage(imgData, 'PNG', 10, 50,width,height);
                })
            ;
            doc.text(110,200,"Ciudad Universitaria, "+Fecha);

            setTimeout(function(){
                doc.output('save', 'g.pdf');
            },1000);

            var docTabla= Format();
            var centeredText = function (text, y) {
                var textWidth = docTabla.getStringUnitWidth(text) * docTabla.internal.getFontSize() / docTabla.internal.scaleFactor;
                var textOffset = (docTabla.internal.pageSize.width - textWidth) / 2;
                docTabla.text(textOffset, y, text);
            }
            docTabla.setFontStyle("arial","bold");
            docTabla.setFontSize(12);
            centeredText(titulo,40);

                docTabla.autoTable(columns, rows, {
                    margin: { top: 45 },
                    addPageContent: function (data) {
                        margin: { top : 15};
                        pie(docTabla,nombreSistema,version);
                    }
                });

                docTabla.output('save', 'ReporteTabla.pdf');//guardar pdf


        }

        var data = this.state.tableData;

        var rows = [];
        var aux = [];
        var k = 0;
        for(var i in data){
            aux = [];
            k = 0;
            for(var j in data[i]){
                aux[k] = data[i][j];
                k++;
            }
            rows[i] = aux;
        }

        var columns = ["Concepto", "Importe", "Codigo-Alumno", "Alumno", "Fecha"];

        pdf('grafEst', columns, rows, this.state.tableTitle);
    }

    render() {
        return (<div>
            <div className="mb5">
                <button className="btn btn-primary" onClick={this.printDocument}>Imprimir</button>
            </div>
        </div>);
    }
}

export default BtnExport;
