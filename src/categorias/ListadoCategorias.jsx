import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';


export default function ListadoCategorias() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerCategorias = async() => {

        try{
            const respuesta = await axios.get('http://localhost:3000/api/categoria');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            setError('No Puede Traer el Listado de Categorias');

        }

    }

    React.useEffect(() => {
        traerCategorias();

    }, []) 

    const borrarCategoria = async(idCategoriaABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/categoria/' + idCategoriaABorrar)
            traerCategorias();
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
            <h3 className="center">Listado de Categorías</h3>
            <Link to={"/categorias/agregar/"} className="btn btn-primary">Agregar</Link>
            {error ? <>Error en la Conexión</> : <></>}

            
            
            <table className="table center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    
                    {listado.map(unaCategoria => (
                        <tr>
                            <td>{unaCategoria.id}</td>
                            <td>{unaCategoria.nombre}</td>
                            
                            
                            <td>
                                <Link to={"/categorias/editar/"+unaCategoria.id.toString()} className="btn btn-warning">Editar</Link> |&nbsp;
                                <Link onClick={() => borrarCategoria(unaCategoria.id)} className="btn btn-danger">Eliminar</Link> |&nbsp;
                                <Link to={"/categorias/verlibros/"+unaCategoria.id.toString()} className="btn btn-success">Ver Libros</Link>
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

