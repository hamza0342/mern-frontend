import React, {useState} from 'react'
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/infoSection';
import { homeObj, homeObj3 } from '../components/infoSection/Data';
import NavBar from '../components/NavBar';
import Services from '../components/Services';
import Sidebar from '../components/SideBar';
const Home = () => {
const [isOpen, setIsOpen] = useState(false);

const toggle = () => {
    setIsOpen(!isOpen)
}
    return (
        <>
        <Sidebar isOpen = {isOpen} toggle={toggle}/>
        <NavBar toggle={toggle}/>
        <HeroSection />
        <InfoSection {...homeObj} />
        <Services />
        
        <InfoSection {...homeObj3} />
        <Footer />
        </>
    )
}

export default Home
