import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AltaCategorias(props) {
    
    const [form, setForm] = React.useState({
        nombre: '',
        
    })


    const guardarCategoria = async() => {
        try {
            await axios.post('http://localhost:3000/api/categoria', form);
        props.history.push('/');
        } catch(e) {
            
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
            <h4 class="center">Formulario para Agregar una Categoría</h4>
            <br/>

            <div class="formularios">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={form.nombre} onChange={cuandocambianombre}  /><br/>
                </div>
            
                <button className="btn btn-primary btn-block" onClick={guardarCategoria}>Guardar</button>
            </div>
        </div>
    )
}
