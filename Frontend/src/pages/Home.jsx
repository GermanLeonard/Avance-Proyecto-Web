import React from 'react'
import Header from '../components/Header'
import Sedes from '../components/Sedes'
import Nosotros from '../components/Nosotros'
import FAQ from '../components/FAQ';
import Contacto from '../components/Contacto';

const Home = () => {
  return (
    <div>
        <Header />
        <Sedes />
        <Nosotros />
        <FAQ/>
        <Contacto/>
    </div>
  )
}

export default Home