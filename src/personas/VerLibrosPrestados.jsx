import React from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function VerLibrosPrestados(props) {
    const params = useParams();

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const [form, setForm] = React.useState({
        nombre: '',
        apellido: ''
    })

    
    const buscarPersonaPorId = async(idPersona) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona/' + idPersona)
            setForm(respuesta.data);
        } catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        }
    }

    const traerPersonas = async(idPersona) => {

        try{
            /* const respuesta = await axios.get('http://localhost:3000/api/verlibrosprestados/'+ idPersona);
            setListado(respuesta.data);
            setError(''); */

            const respuestaLibros = await axios.get('http://localhost:3000/api/categoria');
            const listadoCategorias = respuestaLibros.data;
            const respuesta = await axios.get('http://localhost:3000/api/verlibrosprestados/'+ idPersona);
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






        } catch(e) {
            // setError('No Puede Traer el Listado de Libros');
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        }

    }

    
    React.useEffect(() => {
        if(!params.id) return;
        traerPersonas(params.id);
        buscarPersonaPorId(params.id);

    }, [params])

   
    
    return (
        <div>
            <h3 className="center">Libros Prestados a {form.nombre + ' ' + form.apellido} </h3>
            <br/>
            {error ? <>Error en la Conexión</> : <></>}
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Id Categoría</th>
                        <th>Categoría</th>
                       

                    </tr>
                </thead>
                <tbody>
                    
                    {listado.map(unLibro => (
                        <tr>
                            <td>{unLibro.id}</td>
                            <td>{unLibro.nombre}</td>
                            <td>{unLibro.descripcion}</td>
                            <td>{unLibro.categoria_id}</td>
                            <td>{unLibro.categoria}</td>
                            
                            
                            

                        </tr>
                    ))}
                    
                </tbody>
            </table>

            <br/>
            <hr/>

            <Link to={"/libros/listado"} className="btn btn-info">Regresar</Link>
            
        </div>
    )
}

