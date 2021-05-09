import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function VerLibros(props) {
    const params = useParams();

    const [listado, setListado] = React.useState([]);
    const [error, setError] = React.useState('');

    const [form, setForm] = React.useState({
        nombre: ''
       
    })

    
    const buscarCategoriaPorId = async(idCategoria) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria/' + idCategoria)
            setForm(respuesta.data);
        } catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        }
    }



    const traerLibros = async(idCategoria) => {

        try{
            const respuesta = await axios.get('http://localhost:3000/api/verlibros/'+ idCategoria);
            setListado(respuesta.data);
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
        buscarCategoriaPorId(params.id);
        traerLibros(params.id);

    }, [params])

   
    
    return (
        <div>
            <h3 className="center">Libros de la Categoria {form.nombre}</h3>
            <br/>
            {error ? <>Error en la Conexión</> : <></>}
            
            <table className="table center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        {/* <th>Id Categoría</th>
                        <th>Id Persona</th> */}
                        

                    </tr>
                </thead>
                <tbody>
                    
                    {listado.map(unLibro => (
                        <tr>
                            <td>{unLibro.id}</td>
                            <td>{unLibro.nombre}</td>
                            <td>{unLibro.descripcion}</td>
                            {/* <td>{unLibro.categoria_id}</td>
                            <td>{unLibro.persona_id}</td> */}
                            
                            

                        </tr>
                    ))}
                    
                </tbody>
            </table>
            
        </div>
    )
}

