
"use client"

import React, { Component } from "react";

//Component primereact
import { Panel } from "primereact/panel";
import { Toast } from 'primereact/toast';

//Components
// import BookTable from './BookTable';
import Tabla from './Tabla';
import Menu from './Menu';

//Service
import BookService from '../../services/BookService';


class BookCrud extends Component {
    constructor(props) {
        super(props);

        this.toast = React.createRef();

        this.state = {

        }

        //clase que se encarga de la conexion con el servidor
        this.bookServices = new BookService();
    }

    componentDidMount() {
        // peticion al servidor de todos los libros que se guardan en books 
        this.bookServices.getAll().then(data => this.setState({ books: data }));
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '20px auto 0px' }}>
                {/* barra de menu */}
                <Menu />
                <br/>
                <Panel header="Books" >
                    {/* Listdo de libros */}
                    {/* <BookTable books={this.state.books} /> */}
                    <Tabla bookServices={this.bookServices} />
                </Panel>

                {/* Sms de de confirmacion */}
                <Toast ref={this.toast} />
            </div>
        );
    }

}

export default BookCrud;
