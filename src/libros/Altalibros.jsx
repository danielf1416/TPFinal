import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Altalibros(props) {
    const [categorias, setCategorias] = React.useState([]);
    const [form, setForm] = React.useState({
        nombre: '',
        descripcion: '',
        categoria_id: '',
        persona_id: ''
    })


    const guardarlibro = async() => {
        try {
            await axios.post('http://localhost:3000/api/libro', form);
            props.history.push('/');
        } catch(e) {
            
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

    /* const cuandocambiaidpersona = (e) =>{
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        setForm(nuevoState);
    } */

    return (
        <div>
            <h4 class="center">Formulario de Alta de Libros</h4>
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
                </div>
                */}
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
                {/* <div class="form-group">
                    <label for="idpersona">Persona:</label>
                    <input type="text" class="form-control" name="idpersona" value={form.persona_id} onChange={cuandocambiaidpersona}/> <br/>
                </div> */}

                <button className="btn btn-primary btn-block" onClick={guardarlibro}>Guardar</button>
            </div>
        </div>
    )
}
