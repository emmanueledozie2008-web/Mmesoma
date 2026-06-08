
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Component/Home'
import Mostwanted from './Home/Mostwanted'
import History from './Home/History'
import News from './Home/News'
import About from './Home/About'
import Investigations from './Home/Investigations'
import CyberCrimeCenter from './Home/CybarCrimeCenter'
import ContactPage from './Home/ContactPage'



function App() {
  return (
    <div>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/Mostwanted" element={<Mostwanted/>}/>
   <Route path='/History' element={<History/>}/>
  <Route path='/News' element={<News/>}/> 
  <Route path='/Investigations' element={<Investigations/>}/> 
  <Route path='/About' element={<About/>}/> 
  <Route path='/CybarCrimeCenter' element={<CyberCrimeCenter/>}/> 
  <Route path='/ContactPage' element={<ContactPage/>}/> 
   </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App