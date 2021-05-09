import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditarLibro(props) {
    const params = useParams();
    const [personas, setPersonas] = React.useState([]);
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
            await axios.put('http://localhost:3000/api/libro/prestar/'+ params.id, form);
            props.history.push('/');
    
        } catch(e){
            
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        
        }
        
    }

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/persona');
            setPersonas(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerPersonas();
    }, []);


    

    const cuandocambiaidpersona = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    }

    
    return (
        <div>
            
            <h4 class="center">Formulario Para Prestar Un Libro</h4>
            <br/>

            <div class="formularios">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={form.nombre} disabled/><br/>
                </div>

                <div class="form-group">
                    <label for="descripcion">Descripción:</label>
                    <input type="text" class="form-control" name="descripcion" value={form.descripcion} disabled/> <br/>
                </div>

                <div class="form-group">
                    <label for="idcategoria">Categoría:</label>
                    <input type="text" class="form-control" name="idcategoria" value={form.nombre_categoria} disabled/> <br/>
                </div>

                <div className="sele">
                    <h6>Seleccione una Persona para Prestar el Libro Seccionado</h6>
                    <br/>
                    {/* <div class="form-group">
                        <label for="idpersona">Persona:</label>
                        <input type="text" class="form-control" name="idpersona" value={form.persona_id} onChange={cuandocambiaidpersona}/> <br/>
                    </div> */}

                    <div class="form-group">
                    <label for="idpersona">Persona:</label>
                    <select class="form-control" name="idPersona" onChange={cuandocambiaidpersona}>
                                    <option value="">Seleccione una Persona</option>
                                    {personas.map(unaPersona => (
                                        <option value={unaPersona.id}>
                                            {unaPersona.nombre} {unaPersona.apellido}
                                        </option>
                                    ))}
                        </select>

                </div>
                </div>

                <button className="btn btn-primary btn-block" onClick={guardarlibro}>Guardar</button>
            </div>
        </div>
    )
}
