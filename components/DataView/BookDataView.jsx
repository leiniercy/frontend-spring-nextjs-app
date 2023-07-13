"use client"

import React, { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import 'primeflex/primeflex.css';

export default function BookDataView() {

    const [books, setBooks] = useState([]);
    const [layout, setLayout] = useState('grid');
    const bookServices = new BookService();

    useEffect(() => {
        bookServices.getAll().then(data => setBooks(data));
    }, []);

    // const getSeverity = (book) => {
    //     switch (book.inventoryStatus) {
    //         case 'INSTOCK':
    //             return 'success';

    //         case 'LOWSTOCK':
    //             return 'warning';

    //         case 'OUTOFSTOCK':
    //             return 'danger';

    //         default:
    //             return null;
    //     }
    // };

    const listItem = (book) => {
        return (
            <div className="col-12">
                <div className="flex flex-column justify-between content-center p-4" style={{ gap: '4px' }}>

                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" >
                        {/* aqui va la imagen */}
                        <div className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" style={{ height: '100px' }} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="font-bold">{book.title}</div>
                                <span className="font-semibold">Autor: {book.author} </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="font-semibold text-2xl">${book.price}</span>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (book) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-col items-center py-5" style={{ gap: '3px' }}>
                        <div className="w-9 shadow-2 border-round" style={{ height: '100px' }} />
                        <div className="text-2xl font-bold">{book.title}</div>
                        <span>Autor: {book.author} </span>
                    </div>
                    <div className="flex align-items-center">
                        <span className="text-2xl font-semibold">${book.price}</span>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (book, layout) => {
        if (!book) {
            return;
        }

        if (layout === 'list') return listItem(book);
        else if (layout === 'grid') return gridItem(book);
    };

    const header = () => {
        return (
            <div className="flex flex-row-reverse items-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView
                value={books}
                itemTemplate={itemTemplate}
                rows={3}
                paginator
                layout={layout}
                header={header()}
                
            />
        </div>
    )
}
