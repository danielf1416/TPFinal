import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditarLibro(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        
        persona_id: ''
    })

    
    const buscarLibroPorId = async(idLibro) => {
        try {

            const respuesta = await axios.get('http://localhost:3000/api/libroconpersonaycategoria/' + idLibro)
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
        buscarLibroPorId(params.id);

    }, [params])

    const guardarlibro = async() => {
        try{
            await axios.put('http://localhost:3000/api/libro/devolver/'+ params.id, form);
            props.history.push('/');
    
        } catch(e){
            
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        
        }
        
    }

    

    
    return (
        <div>
            
            <h4 class="center">Formulario Para Devolución de Libro</h4>
            <br/>

            <div class="formularios">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={form.nombre} /><br/>
                </div>

                <div class="form-group">
                    <label for="descripcion">Descripción:</label>
                    <input type="text" class="form-control" name="descripcion" value={form.descripcion} /> <br/>
                </div>

                <div class="form-group">
                    <label for="idcategoria">Categoría:</label>
                    <input type="text" class="form-control" name="idcategoria" value={form.nombre_categoria} /> <br/>
                </div>

                <div class="form-group">
                    <label for="alias">Persona que Devuelve:</label>
                    <input type="text" class="form-control" name="alias" value={form.alias}/> <br/>
                </div>

                <button className="btn btn-primary btn-block" onClick={guardarlibro}>Guardar</button>
            </div>
        </div>
    )
}
