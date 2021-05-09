import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Altapersona(props) {
    
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: ''
    })


    const guardarpersona = async() => {
        try{
            await axios.post('http://localhost:3000/api/persona', form);
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
            {/* <input type="text" name="nombre" value={form.nombre} onChange={cuandocambianombre}  /><br/>
            <input type="text" name="apellido" value={form.apellido} onChange={cuandocambiaapellido}/> <br/>
            <input type="text" name="alias" value={form.alias} onChange={cuandocambiaalias}/> <br/>
            <input type="text" name="email" value={form.email} onChange={cuandocambiaemail}/> <br/>
            <button onClick={guardarpersona}>Guardar</button> */}

            <h4 class="center">Formulario de Alta de Datos Personales</h4>
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
                <button className="btn btn-primary btn-block"  onClick={guardarpersona}>Guardar</button>
            </div>
        </div>
    )
}
