import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setAuthToken } from '../api/api'

export default function AdminLogin() {
  const nav = useNavigate()
  const [email, setEmail] = useState('admin@college.com')
  const [password, setPassword] = useState('admin123')
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      setAuthToken(data.token)
      nav('/dashboard')
    } catch (e) {
      setErr('❌ Login failed')
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: 400, width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Admin Login</h2>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            {err && <div className="text-danger text-center mt-2">{err}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}
