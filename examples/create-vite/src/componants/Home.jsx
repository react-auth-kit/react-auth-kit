import React from 'react'
import {useNavigate} from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button type='submit' onClick={() => navigate('/login')}>Go to Login</button>
      <button type='submit' onClick={() => navigate('/secure')}>GO to Secure Dashboard</button>
    </div>
  )
}

export default Home
