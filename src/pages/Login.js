import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"
import { MdOutlineMailOutline, MdLockOutline, MdOutlineAdminPanelSettings, MdOutlineInfo } from 'react-icons/md'
import { FaRegEyeSlash, FaRegEye, FaShieldAlt } from 'react-icons/fa'
import { HiOutlineFingerPrint } from 'react-icons/hi'
import './Login.css'

function Login() {
    const { adminLogin, user, isLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/admin/dashboard"

    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors]     = useState({})
    const [loading, setLoading]   = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })

    // Auto-redirect if already authenticated
    useEffect(() => {
        if (!isLoading && user) navigate(from, { replace: true })
    }, [user, isLoading, navigate, from])

    const handleChange = (e) => {
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formErrors = {}

        if (!formData.email.trim()) {
            formErrors.email = "Admin email is required"
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            formErrors.email = "Please enter a valid email address"
        }

        if (!formData.password.trim()) {
            formErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            formErrors.password = "Admin password must be at least 8 characters"
        }

        setErrors(formErrors)
        if (Object.keys(formErrors).length > 0) return

        setLoading(true)
        try {
            await adminLogin(formData.email, formData.password)
            navigate(from, { replace: true })
        } catch (err) {
            const data = err.response?.data
            setErrors(prev => ({
                ...prev,
                submit: data?.message || err.message || 'Authentication failed'
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-login-page">
            {/* Background layers */}
            <div className="admin-bg-grid"     aria-hidden="true" />
            <div className="admin-bg-glow admin-bg-glow--1" aria-hidden="true" />
            <div className="admin-bg-glow admin-bg-glow--2" aria-hidden="true" />
            <div className="admin-bg-scanline" aria-hidden="true" />

            <div className="admin-login-wrapper">

                {/* ── Secure-access pill ── */}
                <div className="admin-badge-row">
                    <div className="admin-badge" role="status" aria-label="Secure admin area">
                        <FaShieldAlt className="admin-badge-icon" aria-hidden="true" />
                        <span>Secure Admin Access</span>
                    </div>
                </div>

                {/* ── Card ── */}
                <div className="admin-card" role="main">

                    {/* Header */}
                    <div className="admin-card-header">
                        <div className="admin-logo-mark" aria-hidden="true">
                            <MdOutlineAdminPanelSettings className="admin-logo-icon" />
                        </div>
                        <div className="admin-card-header-text">
                            <h1 className="admin-title">Venlorent Admin</h1>
                            <p className="admin-subtitle">
                                Restricted area — authorised personnel only.
                            </p>
                        </div>
                    </div>

                    {/* Fingerprint divider */}
                    <div className="admin-divider" aria-hidden="true">
                        <span className="admin-divider-line" />
                        <HiOutlineFingerPrint className="admin-divider-icon" />
                        <span className="admin-divider-line" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="admin-form" noValidate>

                        {/* Email */}
                        <div className="admin-form-group">
                            <label htmlFor="admin-email" className="admin-label">
                                Admin Email
                            </label>
                            <div className="admin-input-wrapper">
                                <MdOutlineMailOutline
                                    className="admin-input-icon-left"
                                    aria-hidden="true"
                                />
                                <input
                                    id="admin-email"
                                    className={`admin-input${errors.email ? ' admin-input--error' : ''}`}
                                    type="text"
                                    name="email"
                                    placeholder="admin@venlorent.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-err" : undefined}
                                    disabled={loading}
                                />
                            </div>
                            {errors.email && (
                                <span id="email-err" className="admin-error-msg" role="alert">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="admin-form-group">
                            <label htmlFor="admin-password" className="admin-label">
                                Password
                            </label>
                            <div className="admin-input-wrapper">
                                <MdLockOutline
                                    className="admin-input-icon-left"
                                    aria-hidden="true"
                                />
                                <input
                                    id="admin-password"
                                    className={`admin-input${errors.password ? ' admin-input--error' : ''}`}
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter admin password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? "pass-err" : undefined}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="admin-input-icon-right"
                                    onClick={() => setShowPass(p => !p)}
                                    aria-label={showPass ? "Hide password" : "Show password"}
                                >
                                    {showPass
                                        ? <FaRegEye   aria-hidden="true" />
                                        : <FaRegEyeSlash aria-hidden="true" />
                                    }
                                </button>
                            </div>
                            {errors.password && (
                                <span id="pass-err" className="admin-error-msg" role="alert">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Session security notice */}
                        <div className="admin-session-notice" role="note">
                            <MdOutlineInfo
                                className="admin-session-notice-icon"
                                aria-hidden="true"
                            />
                            <p>
                                Sessions are logged and monitored. Unauthorised access
                                attempts are reported automatically.
                            </p>
                        </div>

                        {/* Submit-level error */}
                        {errors.submit && (
                            <div className="admin-submit-error" role="alert">
                                <span className="admin-submit-error-icon" aria-hidden="true">⚠</span>
                                {errors.submit}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="admin-submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="admin-spinner" aria-hidden="true" />
                                    Authenticating…
                                </>
                            ) : (
                                <>
                                    <FaShieldAlt aria-hidden="true" />
                                    Authenticate &amp; Enter
                                </>
                            )}
                        </button>
                    </form>

                    <p className="admin-back-link">
                        Not an admin?{' '}
                        <Link to="/login" className="admin-back-anchor">
                            Return to main site
                        </Link>
                    </p>
                </div>

                <p className="admin-watermark">
                    © {new Date().getFullYear()} Venlorent &middot; Internal Operations Platform
                </p>
            </div>
        </div>
    )
}

export default Login