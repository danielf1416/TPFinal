import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

export default function EditarPersona(props) {
    const params = useParams();
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

    React.useEffect(() => {
        if(!params.id) return;
        buscarPersonaPorId(params.id);

    }, [params])

    const guardarpersona = async() => {
        try{
            await axios.put('http://localhost:3000/api/persona/'+ params.id, form);
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

    const cuandocambiaapellido = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }

    const cuandocambiaalias = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    }

    const cuandocambiaemail = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.email = e.target.value;
        setForm(nuevoState);
    }

    return (
        <div>
            
            <h4 class="center">Formulario de Edición de Datos Personales</h4>
            <br/>
            <div class="formularios">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={form.nombre} onChange={cuandocambianombre}  /><br/>
                </div>
                <div class="form-group">
                    <label for="apellido">Apellido:</label>
                    <input type="text" class="form-control" name="apellido" value={form.apellido} onChange={cuandocambiaapellido}/> <br/>
                </div>
                <div class="form-group">
                    <label for="alias">Alias:</label>
                    <input type="text" class="form-control" name="alias" value={form.alias} onChange={cuandocambiaalias}/> <br/>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" name="email" value={form.email} onChange={cuandocambiaemail}/> <br/>
                </div>
                <div className="botonera">
                    <button className="btn btn-primary btn-block"  onClick={guardarpersona}>Guardar</button>
                    <Link to={"/personas/listado"} className="btn btn-info btn-block">Regresar</Link>
                </div>
            </div>
        </div>
    )
}
