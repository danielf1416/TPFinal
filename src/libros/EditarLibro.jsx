import React from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditarLibro(props) {
    const params = useParams();
    const [categorias, setCategorias] = React.useState([]);
    const [form, setForm] = React.useState({
        nombre: '',
        descripcion: '',
        categoria_id: '',
        persona_id: ''
    })

    
    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/libro/' + idLibro)
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
            await axios.put('http://localhost:3000/api/libro/'+ params.id, form);
            props.history.push('/');
    
        } catch(e){
            
            Swal.fire({
                icon: 'error',
                title: 'Error..!',
                text: e.response.data.Error
                
              })
        
        }
        
    }

    const obtenerCategorias = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categoria');
            setCategorias(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerCategorias();
    }, []);

    const cuandocambianombre = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const cuandocambiadescripcion = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }

    const cuandocambiaidcategoria = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.categoria_id = e.target.value;
        setForm(nuevoState);
    }

    
    return (
        <div>
            
            <h4 class="center">Formulario para Editar Datos de un Libro</h4>
            <hr/>
            <br/>

            <div class="formularios">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={form.nombre} onChange={cuandocambianombre}  /><br/>
                </div>

                <div class="form-group">
                    <label for="descripcion">Descripción:</label>
                    <input type="text" class="form-control" name="descripcion" value={form.descripcion} onChange={cuandocambiadescripcion}/> <br/>
                </div>

                {/* <div class="form-group">
                    <label for="idcategoria">Categoría:</label>
                    <input type="text" class="form-control" name="idcategoria" value={form.categoria_id} onChange={cuandocambiaidcategoria}/> <br/>
                </div> */}

                {/* <div class="form-group">
                    <label for="idpersona">Persona:</label>
                    <input type="text" class="form-control" name="idpersona" value={form.persona_id} onChange={cuandocambiaidpersona}/> <br/>
                </div> */}

                <div class="form-group">
                    <label for="idcategoria">Categoría:</label>
                    <select class="form-control" name="idcategoria" onChange={cuandocambiaidcategoria}>
                                    <option value="">Seleccione una Categoría</option>
                                    {categorias.map(unaCategoria => (
                                        <option value={unaCategoria.id}>
                                            {unaCategoria.nombre}
                                        </option>
                                    ))}
                        </select>

                </div>
                <br/>

                <div className="botonera">
                    <button className="btn btn-primary btn-block" onClick={guardarlibro}>Guardar</button>
                    
                    
                    <Link to={"/libros/listado"} className="btn btn-info btn-block">Regresar</Link>
                </div>
            </div>
        </div>
    )
}
