import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Taba(props) {

    const columns = [
        { field: 'title', header: 'Título' },
        { field: 'author', header: 'Autor' },
        { field: 'price', header: 'Precio' }
    ];

    return (
        <div className="card">
            <DataTable value={props.books} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}