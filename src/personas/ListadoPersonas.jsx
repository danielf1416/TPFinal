import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';


export default function ListadoPersonas() {

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const traerPersonas = async() => {

        try{
            const respuesta = await axios.get('http://localhost:3000/api/persona');
            setListado(respuesta.data);
            setError('');
        } catch(e) {
            
                Swal.fire({
                    icon: 'error',
                    title: 'Error..!',
                    text: e.response.data.Error
                    
                  })
            }

        

    }

    React.useEffect(() => {
        traerPersonas();

    }, []) 

    const borrarPersona = async(idPersonaABorrar) => {
        try {
            await axios.delete('http://localhost:3000/api/persona/' + idPersonaABorrar)
            traerPersonas();
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
            <h3 className="center">Listado de Personas</h3>
            <Link to={"/personas/agregar/"} className="btn btn-primary">Agregar</Link>
            {error ? <>Error en la Conexión</> : <></>}
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Alias</th>
                        <th>Email</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {listado.map(unaPersona => (
                        <tr>
                            <td>{unaPersona.id}</td>
                            <td>{unaPersona.nombre}</td>
                            <td>{unaPersona.apellido}</td>
                            <td>{unaPersona.alias}</td>
                            <td>{unaPersona.email}</td>
                            
                            <td>
                                <Link to={"/personas/editar/"+unaPersona.id.toString()}className="btn btn-warning">Editar</Link> |&nbsp;
                                <Link onClick={() => borrarPersona(unaPersona.id)} className="btn btn-danger">Eliminar</Link> |&nbsp;
                                <Link to={"/personas/verlibrosprestados/"+unaPersona.id.toString()} className="btn btn-success">Ver Libros Prestados</Link>
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

