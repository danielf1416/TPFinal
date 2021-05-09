import React from 'react'
import {Link} from 'react-router-dom';

export default function principal() {
    return (
        <div>
            <h2 className="center">Trabajo Práctico Final</h2>
            <br/>

            <h4 className="center">Menú de Opciones</h4>
            <div className="menu">
                <div>

                
                <Link to={'/personas/listado'} className="btn btn-primary btn-block todo-ancho">Personas</Link>
                </div>
                <br/>
                <div>
                <Link to={'/libros/listado'} className="btn btn-primary btn-block todo-ancho">Libros</Link>
                </div>
                <br/>
                <div>
                <Link to={'/categorias/listado'} className="btn btn-primary btn-block todo-ancho">Categorías</Link>
                </div>
            </div>

        </div>
    )
}
