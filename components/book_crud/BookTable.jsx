
"use client"

import { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Button } from "primereact/button";


export default class BookTable extends Component {
  constructor(props) {
    super(props);


    /*
    * Exportar informacion de la tabla
    * Columnas a exportar
    */
    const cols = [
      { field: 'title', header: 'Título' },
      { field: 'author', header: 'Autor' },
      { field: 'price', header: 'Precio' }

    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    //Exportar excel
    const exportExcel = () => {
      import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.props.books);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
          bookType: 'xlsx',
          type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'books');
      });
    };

    const saveAsExcelFile = (buffer, fileName) => {
      import('file-saver').then((module) => {
        if (module && module.default) {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data = new Blob([buffer], {
            type: EXCEL_TYPE
          });

          module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
      });
    };
    //Exportar PDF
    const exportPdf = () => {
      import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default(0, 0);
          doc.autoTable(exportColumns, this.props.books);
          doc.save('books.pdf');
        });
      });
    };

    //Header de la tabla
    this.header = (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '10px' }} >
        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
        <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
      </div>
    );
  }
  render() {
    return (
      <DataTable
        value={this.props.books}
        header={this.header}
        sortMode="multiple"
        removableSort
        rows="5" paginator={true} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        tableStyle={{ minWidth: '50rem' }}
        selectionMode="single"
        // selectionMode={'checkbox'}
        // selection={this.state.selectedBook}
      // onSelectionChange={e => this.setState({ selectedBook: e.value })}
      >
        <Column field="title" header="Tilte" sortable></Column>
        <Column field="author" header="Author" sortable></Column>
        <Column field="price" header="Price" sortable></Column>
      </DataTable>
    )
  }
}