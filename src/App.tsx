
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Component/Home'
import Mostwanted from './Home/Mostwanted'

function App() {
  return (
    <div>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/Mostwanted" element={<Mostwanted/>}/>
   </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App