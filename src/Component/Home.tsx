
import Footer from './Footer'
import HeroSection from './HeroSection'
import Interactivew from './Interactivew'
import MissionCards from './MissionCards'
import Navbar from './Navbar'
import Youtube from './Youtube'

function Home() {
  return (
    <div>
       
        <Navbar/>
        <HeroSection/>
        <MissionCards/>
        <Interactivew/> 
        <Youtube/>
        <Footer/>    
    </div>
  )
}

export default Home