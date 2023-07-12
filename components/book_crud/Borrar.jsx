"use client"

import React, { Component } from "react";
//Component primereact
import { Panel } from "primereact/panel";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

//Service
import BookService from '../../services/BookService';

export default class BookTable extends Component {
    constructor() {
        super();

        this.toast = React.createRef();

        this.state = {
            visible: false,
            deleteBookDialog: false,
            book: {
                id: null,
                title: null,
                author: null,
                price: null
            },
            selectedBook: {

            }
        };
        this.items = [
            {
                label: 'Nuevo',
                icon: 'pi pi-fw pi-plus',
                command: () => { this.showSaveDialog() }
            },

            {
                label: 'Editar',
                icon: 'pi pi-fw pi-pencil',
                command: () => { this.showEditDialog() }
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-fw pi-trash',
                command: () => { this.showDeleteDialog() }
            }
        ];
        this.bookServices = new BookService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);


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
                const worksheet = xlsx.utils.json_to_sheet(this.state.books);
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
                    doc.autoTable(exportColumns, this.state.books);
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

        //Footer del dialog
        this.footer = (
            <div>
                <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
            </div>
        );

        this.deleteProductDialogFooter = (
            <div>
                <Button label="Aceptar" icon="pi pi-check" severity="danger" onClick={this.delete} />
            </div>
        );

    }

    componentDidMount() {
        this.bookServices.getAll().then(data => this.setState({ books: data }));
    }

    save() {

        let aux = "";
        if (this.state.book.id !== null) {
            aux = "modificó"
        } else {
            aux = "creó"
        }

        //Guardar en la BD y actualiza el estado de la informacion
        this.booksServices.save(this.state.book).then(data => {
            this.setState({
                visible: false,
                book: {
                    id: null,
                    title: null,
                    author: null,
                    price: null
                }
            });
            //Actualiza la lista de books
            this.bookServices.getAll().then(data => this.setState({ books: data }));
            //Muestra sms de confirmacion
            this.toast.current.show({ severity: 'success', summary: 'Atención!', detail: "Se " + aux + " el registro correctamente", life: 2000 });
        })
    }

    delete() {
        this.bookServices.delete(this.state.selectedBook.id).then(data => {
            //Actualiza la lista de books
            this.bookServices.getAll().then(data => this.setState({ books: data }));
            //Muestra sms de confirmacion
            this.toast.current.show({ severity: 'success', summary: 'Atención!', detail: "Se eliminó el registro correctamente", life: 2000 });
        });
        this.setState({
            deleteBookDialog: false,
            book: {
                id: null,
                title: null,
                author: null,
                price: null
            }
        });
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="React Crud App" >
                    <DataTable
                        value={this.state.books}
                        header={this.header}
                        sortMode="multiple"
                        removableSort
                        rows="5" paginator={true} rowsPerPageOptions={[5, 10, 25, 50]}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        tableStyle={{ minWidth: '50rem' }}
                        selectionMode="single" selection={this.state.selectedBook}
                        onSelectionChange={e => this.setState({ selectedBook: e.value })}
                    >
                        <Column field="title" header="Tilte" sortable></Column>
                        <Column field="author" header="Author" sortable></Column>
                        <Column field="price" header="Price" sortable></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Crear Persona" visible={this.state.visible} footer={this.footer} style={{ width: '400px' }} modal={true} onHide={() => this.setState({ visible: false })}>
                    <form id="book-form">
                        <span className="p-float-label">
                            <InputText value={this.state.book.title} style={{ width: '100%' }} id="title" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(pervState => {
                                    let book = Object.assign({}, pervState.book);
                                    book.title = val;

                                    return { book };
                                })
                            }} />
                            <label htmlFor="title">Título</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.book.author} style={{ width: '100%' }} id="author" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(pervState => {
                                    let book = Object.assign({}, pervState.book);
                                    book.author = val;

                                    return { book };
                                })
                            }
                            } />
                            <label htmlFor="author">Autor</label>
                        </span>
                        <span className="p-float-label">
                            <InputText
                                value={this.state.book.price}
                                onChange={(e) => {
                                    let val = parseFloat(e.target.value);
                                    this.setState(pervState => {
                                        let book = Object.assign({}, pervState.book);
                                        book.price = val;

                                        return { book };
                                    })

                                }
                                } className="w-full" />
                            {/* <Slider
                                value={this.state.book.price}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(pervState => {
                                        let book = Object.assign({}, pervState.book);
                                        book.author = val;

                                        return { book };
                                    })
                                }
                                } className="w-full" /> */}
                        </span>
                    </form>
                </Dialog>
                <Dialog visible={this.state.deleteBookDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={this.deleteProductDialogFooter} onHide={() => this.setState({ deleteBookDialog: false })} >
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.book && <span>¿Realmente desea eleminar el registro?</span>}
                    </div>
                </Dialog>
                <Toast ref={this.toast} />
            </div>
        );
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            book: {
                id: null,
                title: null,
                author: null,
                price: null
            }
        });
    }

    showEditDialog() {
        this.setState({
            visible: true,
            book: {
                id: this.state.selectedBook.id,
                title: this.state.selectedBook.title,
                author: this.state.selectedBook.author,
                price: this.state.selectedBook.price
            }
        });

    }

    showDeleteDialog() {
        this.setState({
            deleteBookDialog: true,
            book: {
                id: this.state.selectedBook.id,
                title: this.state.selectedBook.title,
                author: this.state.selectedBook.author,
                price: this.state.selectedBook.price
            }
        });
    }

}