import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'

class BtnExport extends Component{

    printDocument() {
        const input = document.getElementById('estadisticas');
        const emtHeight = input.offsetHeight;
        console.log(emtHeight);
        const emtWidth = input.offsetWidth;
        console.log(emtWidth);
        const proporcion = emtHeight/emtWidth;
        console.log(proporcion);
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "mm", "a4");
                const width = pdf.internal.pageSize.width;
                const height = width*proporcion;
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                pdf.save("reporte.pdf");
            })
        ;
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
