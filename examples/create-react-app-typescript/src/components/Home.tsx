import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={()=> navigate('/login')}>Go to Login</button>
            <button onClick={()=> navigate('/secure')}>GO to Secure Dashboard</button>
        </div>
    )
}

export default Home
