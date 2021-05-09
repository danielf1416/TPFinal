import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

export default function EditarCategoria(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        nombre: ''
        
    })

    
    const buscarcategoriaPorId = async(idCategoria) => {
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

    React.useEffect(() => {
        if(!params.id) return;
        buscarcategoriaPorId(params.id);

    }, [params])

    const guardarCategoria = async() => {
        try{
            await axios.put('http://localhost:3000/api/categoria/'+ params.id, form);
            props.history.push('/');
        } catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        }
        
        

    }

    const cuandocambianombre = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    
    
    return (
        <div>
            <h4 class="center">Formulario para Editar una Categoría</h4>
            <br/>

            <div class="formularios">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={form.nombre} onChange={cuandocambianombre}  /><br/>
                </div>
                <div className="botonera">
                    <button className="btn btn-primary btn-block" onClick={guardarCategoria}>Guardar</button>
                    <Link to={"/categorias/listado"} className="btn btn-info btn-block">Regresar</Link>
                </div>
            </div>
        </div>
    )
}
