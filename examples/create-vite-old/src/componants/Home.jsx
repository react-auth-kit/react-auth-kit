import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()

    return (
        <div className='p-6 gap-2'>
            <div className="p-4">
            <button type='submit' className='p-2 border rounded-md bg-cyan-700 hover:bg-cyan-900 text-white' onClick={()=> navigate('/login')}>Go to Login</button>
            <button type='submit' className='p-2 border rounded-md bg-red-500 hover:bg-red-700 text-white' onClick={()=> navigate('/secure')}>GO to Secure Dashboard</button>
            </div>
         
        </div>
    )
}

export default Home
