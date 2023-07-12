"use client"

import { Component } from "react";
import { Menubar } from "primereact/menubar";
 
 class Menu extends Component {
    constructor(props) {
      super(props);
      this.items = [
        {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            // command: () => { this.showSaveDialog() }
        },

        {
            label: 'Editar',
            icon: 'pi pi-fw pi-pencil',
            // command: () => { this.showEditDialog() }
        },
        {
            label: 'Eliminar',
            icon: 'pi pi-fw pi-trash',
            // command: () => { this.showDeleteDialog() }
        }
    ];
    }

    render() {
      return (
        <Menubar model={this.items} />
      )
    }
}

export default Menu;