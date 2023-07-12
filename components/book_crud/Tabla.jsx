import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function Tabla(props) {

    const columns = [
        { field: 'title', header: 'Título', filterPlaceholder:"Search by name" },
        { field: 'author', header: 'Autor' , filterPlaceholder: "Search by author"},
        { field: 'price', header: 'Precio' , filterPlaceholder: "Search by price"}
    ];

    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        initFilters();
    }, []);

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
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
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
                value={props.books}
                header={header}
                filters={filters}
                globalFilterFields={['title', 'author', 'price']}
                tableStyle={{ minWidth: '50rem' }}>
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