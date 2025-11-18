import React, { useState, useEffect } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    // Redirect to login if no token
    if (!token || !userData) {
      window.location.href = '/login'
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFirstName(parsedUser.firstName || '')
    setLastName(parsedUser.lastName || '')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const token = localStorage.getItem('token')

    // call backend api to update user profile
    fetch('https://my-full-stack-project-6d9e.onrender.com/auth/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName })

    }).then(res => res.json())
      .then(data => {
        setLoading(false)
        if (data.success) {
          // Update localStorage with new data
          const updatedUser = { ...user, firstName, lastName }
          localStorage.setItem('user', JSON.stringify(updatedUser))
          setUser(updatedUser)
          setMessage('Profile updated successfully!')
          setTimeout(() => setMessage(''), 3000)
        } else {
          setMessage(data.error || 'Failed to update profile')
        }
      })
      .catch(err => {
        setLoading(false)
        console.error('Error updating profile:', err)
        setMessage('An error occurred. Please try again later.')
      })
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-blue-100 mt-1">Manage your account information</p>
          </div>
          <a href="/dashboard" className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-6 rounded-lg transition">
            Back to Dashboard
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* User Info Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white font-bold">
                  {firstName.charAt(0)}{lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h2>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-sm text-gray-500 mt-1">User ID: {user.id}</p>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Update Profile Information</h3>

            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={user.username}
                  placeholder="Username"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Account Info Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">User ID:</span>
                <span className="font-semibold text-gray-800">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Username:</span>
                <span className="font-semibold text-gray-800">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Full Name:</span>
                <span className="font-semibold text-gray-800">{firstName} {lastName}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}