import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Edit from './Edit'
import App from './App'

function App1() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<App></App>}></Route>
          
            <Route path='/edit/:id' element={<Edit></Edit>}></Route>
        </Routes>
    </div>
  )
}

export default App1