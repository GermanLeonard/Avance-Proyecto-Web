import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'

const Cancha = () => {
    const {canchaId} = useParams
    const {canchas} = useContext(AppContext)
    const fetchCanchaInfo = async () => {
        
    }
    return (
        <div>Cancha</div>
    )
}

export default Cancha