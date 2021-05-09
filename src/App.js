import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Principal from './principal';

import ListadoPersonas from './personas/ListadoPersonas';
import EditarPersona from './personas/EditarPersona';
import Altapersona from './personas/Altapersona';

import ListadoLibros from './libros/ListadoLibros';
import EditarLibro from './libros/EditarLibro';
import Altalibros from './libros/Altalibros';
import PrestarLibro from './libros/PrestarLibro';
import DevolverLibro from './libros/DevolverLibro';



import ListadoCategorias from './categorias/ListadoCategorias';
import EditarCategoria from './categorias/EditarCategoria';
import AltaCategorias from './categorias/AltaCategorias';
import VerLibros from './categorias/VerLibros';
import VerLibrosPrestados from './personas/VerLibrosPrestados';


function App() {
  return (
    <div>
      
      <Router>
        <Route exact path="/" component={Principal}/>
        <Route exact path="/personas/listado" component={ListadoPersonas}/>
        <Route exact path="/personas/editar/:id" component={EditarPersona}/>
        <Route exact path="/personas/agregar/" component={Altapersona}/>
        <Route exact path="/personas/verlibrosprestados/:id" component={VerLibrosPrestados}/>
        

        <Route exact path="/libros/listado" component={ListadoLibros}/>
        <Route exact path="/libros/editar/:id" component={EditarLibro}/>
        <Route exact path="/libros/agregar/" component={Altalibros}/>
        <Route exact path="/libros/prestar/:id" component={PrestarLibro}/>
        <Route exact path="/libros/devolver/:id" component={DevolverLibro}/>
        
        <Route exact path="/categorias/listado" component={ListadoCategorias}/>
        <Route exact path="/categorias/editar/:id" component={EditarCategoria}/>
        <Route exact path="/categorias/agregar/" component={AltaCategorias}/>
        <Route exact path="/categorias/verlibros/:id" component={VerLibros}/>
        
      </Router>

      
    </div>
  );
}

export default App;
