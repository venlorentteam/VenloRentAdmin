import React, { useState } from 'react'
import logo from '../assets/img/venlorent-light.png'
import './Login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="VenloRent admin sign in">
        <div className="login-brand-panel">
          <div className="login-brand">
            <img src={logo} alt="VenloRent" className="login-brand__logo" />
            <span className="login-brand__label">Admin workspace</span>
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
            <div>
              <span>148</span>
              <p>Active listings</p>
            </div>
            <div>
              <span>23</span>
              <p>KYC reviews</p>
            </div>
            <div>
              <span>96%</span>
              <p>Request response</p>
            </div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-header">
            <p className="login-kicker">Secure access</p>
            <h2>Welcome back</h2>
            <p>Use your admin credentials to continue to VenloRent Admin.</p>
          </div>

          <form className="login-form">
            <label className="login-field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="admin@venlorent.com"
                autoComplete="email"
              />
            </label>

            <label className="login-field">
              <span>Password</span>
              <div className="login-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

            <div className="login-form-options">
              <label className="login-check">
                <input type="checkbox" name="rememberDevice" />
                <span>Remember this device</span>
              </label>

              <a href="mailto:support@venlorent.com">Need help?</a>
            </div>

            <button type="submit" className="login-submit">
              Sign in to dashboard
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
