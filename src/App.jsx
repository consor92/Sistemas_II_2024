import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'


import LayoutB from './modules/Layout/back'
import LayoutE from './modules/Layout/eComerce'
import NotFound from './modules/NotFound'
import Agregar from './modules/Agregar'
import FormEditar from './modules/Editar/form'
import Editar from './modules/Editar/index'
import Mostrar from './modules/Mostrar'
import Eliminar from './modules/Eliminar'

import Productos from './modules/Productos'
import Perfume from './modules/Mostrar/modal'

/*
<Route element={<LayoutE />}>
  <Route path="/" element={<Productos />} />
  <Route path="/producto/:codigo" element={<Perfume />} />
</Route>
*/

function App() {

  return (
    <div className="App">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}>
        <Routes>

          <Route element={<LayoutB />}>
            <Route path="/" element={<div>Selecciona una opción</div>} /> { }
            <Route path="/add" element={<Agregar />} />
            <Route path="/edit" element={<Editar />} />
            <Route path="/edit/:codigo" element={<FormEditar />} />
            <Route path="/view" element={<Mostrar />} />
            <Route path="/delete" element={<Eliminar />} />
          </Route>


          {/* Ruta para la página 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
