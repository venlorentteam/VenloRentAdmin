
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import logo from '../assets/img/venlorent-light.png'
// import authService from '../services/authService'
import './Login.css'

const Login = () => {
  const { admin, isLoading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (!isLoading && admin) {
      navigate(from, { replace: true })
    }
  }, [admin, isLoading, navigate, from])

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    // Clear error for this field when user starts typing
    if (errors?.[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
    }
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = {}
    
    if (!formData.email.trim()) {
      formErrors.email = "email is required"
    }else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.password.trim()) {
      formErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(formErrors)
    if (Object.keys(formErrors).length === 0) {
      try{
        setIsSubmitting(true)
        await login(formData)
        navigate(from, { replace: true })
      } catch (error) {
        setErrors({ submit: error.response?.data?.message || error.message || "Login failed" })
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  return (
    <main className="login-page">
      <section className="login-shell" aria-label="VenloRent admin sign in">
        <div className="login-brand-panel">
          <div className="login-brand">
            <img src={logo} alt="VenloRent" className="login-logo" />
          </div>

          <div className="login-intro">
            <p className="login-kicker">Real estate operations</p>
            <h1>Manage listings, users, requests, and KYC from one calm dashboard.</h1>
            <p>
              Sign in to review property activity, verify customers, monitor orders, and keep
              the VenloRent marketplace moving with confidence.
            </p>
          </div>

          <div className="login-insights" aria-label="Platform highlights">
            
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-header">
            <p className="login-kicker">Secure access</p>
            <h2>Welcome back</h2>
            <p>Use your admin credentials to continue to VenloRent Admin.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Email address</span>
              <input
                type="text"
                name="email"
                placeholder="example@venlorent.com"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email || ""}
              />
            </label>
            {errors?.email && <p className="error-message">{errors.email}</p>}
            <label className="login-field">
              <span>Password</span>
              <div className="login-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  value={formData.password || ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>
              {errors?.password && <p className="error-message">{errors.password}</p>}
              {errors?.submit && <p className="submit-error">{errors.submit}</p>}
            <div className="login-form-options">
              <label className="login-check">
                <input type="checkbox" name="rememberDevice" />
                <span>Remember this device</span>
              </label>

              <a href="mailto:support@venlorent.com">Need help?</a>
            </div>

            <button type="submit" className="login-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in to dashboard'}
            </button>
          </form>

          <div className="login-security-note">
            <strong>Protected admin area</strong>
            <span>Only authorized VenloRent team members should access this workspace.</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
