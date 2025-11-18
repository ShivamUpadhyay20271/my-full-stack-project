import React, { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    // Redirect to login if no token
    if (!token || !userData) {
      window.location.href = '/login'
      return
    }
    
    setUser(JSON.parse(userData))
  }, [])

  const handleLogout = () => {
    // Clear JWT token and user data from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
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
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-100 mt-1">Welcome, {user?.username || 'User'}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Projects</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📁</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Tasks Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">45</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Team Members</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">8</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-700">Project Alpha Started</p>
                  <p className="text-sm text-gray-500">Today at 10:30 AM</p>
                </div>
                <span className="text-xl">🚀</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-700">Task Completed</p>
                  <p className="text-sm text-gray-500">Today at 2:45 PM</p>
                </div>
                <span className="text-xl">✨</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-700">Review Required</p>
                  <p className="text-sm text-gray-500">Yesterday at 5:00 PM</p>
                </div>
                <span className="text-xl">⚠️</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Productivity</span>
                  <span className="text-sm font-bold text-blue-600">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Goal Achievement</span>
                  <span className="text-sm font-bold text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Team Efficiency</span>
                  <span className="text-sm font-bold text-purple-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <h3 className="font-bold text-gray-800 mb-2">{project}</h3>
                <p className="text-sm text-gray-600 mb-3">Building amazing features...</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-blue-600">In Progress</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">60%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}