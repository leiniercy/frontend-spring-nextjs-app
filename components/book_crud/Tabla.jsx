import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function Tabla(props) {

    const columns = [
        { field: 'title', header: 'Título', filterPlaceholder: "Search by name" },
        { field: 'author', header: 'Autor', filterPlaceholder: "Search by author" },
        { field: 'price', header: 'Precio', filterPlaceholder: "Search by price" }
    ];

    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        props.bookServices.getAll().then(data => setBooks(data));
        initFilters();
    }, []);

    const exportColumns = columns.map((col) => ({ title: col.header, dataKey: col.field }));

    //Exportar excel
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(books);
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
                doc.autoTable(exportColumns, books);
                doc.save('books.pdf');
            });
        });
    };

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />

                <div className="flex justify-between aling-center flex-wrap" style={{gap: '5px'}}>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                    <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                    <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
                </div>
            </div>
        );
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            author: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
    };

    const clearFilter = () => {
        initFilters();
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={books}
                header={header}
                filters={filters}
                globalFilterFields={['title', 'author', 'price']}
                sortMode="multiple"
                removableSort
                rows="5" paginator={true} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                selectionMode="single"

                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
            >
                {columns.map((col, i) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        placeholder={col.filterPlaceholder}
                        filter
                        sortable
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                    />
                ))}
                {/* <Column field="title" header="Tilte" sortable filter ></Column>
                <Column field="author" header="Author" sortable filter></Column>
                <Column field="price" header="Price" sortable filter></Column> */}
            </DataTable>
        </div>
    );
}