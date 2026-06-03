
import Footer from './Footer'
import HeroSection from './HeroSection'
import Interactivew from './Interactivew'
import MissionCards from './MissionCards'
import Navbar from './Navbar'

function Home() {
  return (
    <div>
       
        <Navbar/>
        <HeroSection/>
        <MissionCards/>
        <Interactivew/> 
        <Footer/>    
    </div>
  )
}

export default Home