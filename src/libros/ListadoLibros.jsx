import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ListadoLibros() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerLibros = async() => {

        try{
            // const respuesta = await axios.get('http://localhost:3000/api/libro');

            const respuestaLibros = await axios.get('http://localhost:3000/api/categoria');
            const listadoCategorias = respuestaLibros.data;
            const respuesta = await axios.get('http://localhost:3000/api/libroconpresona');
            const newListado = respuesta.data.map(unLibro => {
                const categoriaAsociada = listadoCategorias.find(unaCategoria => unaCategoria.id == unLibro.categoria_id);
                const nuevaEstructuraLibro = JSON.parse(JSON.stringify(unLibro));
                nuevaEstructuraLibro.categoria = categoriaAsociada
                    ? categoriaAsociada.nombre
                    : '';
                return nuevaEstructuraLibro;
            });
            setListado(newListado);
            setError('');


            




            /* setListado(respuesta.data);
            setError(''); */
        } catch(e) {
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })

        }

    }

    React.useEffect(() => {
        traerLibros();

    }, []) 

    const borrarLibro = async(idLibroABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/libro/' + idLibroABorrar)
            traerLibros();
        } catch(e) {
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        }

    }
    
    return (
        <div>
            <h3 className="center">Listado de Libros</h3>
            <Link to={"/libros/agregar/"} className="btn btn-primary">Agregar</Link>
            {error ? <>Error en la Conexión</> : <></>}
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Id Categoría</th>
                        <th>Categoría</th>                      
                        <th>Prestado a</th>
                        <th>Estado</th>
                        <th></th>
                        
                        

                    </tr>
                </thead>
                <tbody>
                    
                    {listado.map(unLibro => (
                        
                        <tr class={unLibro.persona_id === null ? "noprestado" : "prestado"}>
                            <td>{unLibro.id}</td>
                            <td>{unLibro.nombre}</td>
                            <td>{unLibro.descripcion}</td>
                            <td>{unLibro.categoria_id}</td>
                            <td>{unLibro.categoria}</td>
                            
                            <td>{unLibro.alias}</td>
                            <td>{unLibro.persona_id === null ? "Libre" : "Prestado"}</td>
                            <td>
                                <Link to={"/libros/editar/"+unLibro.id.toString()} className="btn btn-warning">Editar</Link> |&nbsp;
                                <Link onClick={() => borrarLibro(unLibro.id)} className="btn btn-danger">Eliminar</Link> |&nbsp;
                                <Link to={"/libros/prestar/"+unLibro.id.toString()} className="btn btn-success">Prestar</Link> |&nbsp;
                                <Link to={"/libros/devolver/"+unLibro.id.toString()} className="btn btn-dark">Devolver</Link> |&nbsp;
                            </td>
                             
                        

                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <br/>
            <hr/>

            <Link to={"/"} className="btn btn-info">Regresar</Link>


            
        </div>
    )
}

