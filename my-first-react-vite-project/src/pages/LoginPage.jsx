import React, { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // call backend api at http://localhost:3000/auth/login with body as { username, password }
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })

    }).then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify({ id: data.id, username: data.username }))
          alert('Login successful!')
          window.location.href = '/dashboard'
        } else {
          alert(data.error || 'Login failed. Invalid username or password.')
        }
      })
      .catch(err => {
        console.error('Error during login:', err)
        alert('An error occurred. Please try again later.')
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <a href="/register" className="text-blue-600 font-bold hover:underline">Register here</a>
        </p>
      </div>
    </div>
  )
}