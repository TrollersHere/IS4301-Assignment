import React, { useState } from 'react';
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
  getFriendlyErrorMessage,
  isRealFirebaseConfigured,
} from '../firebase';

function Login({ onLoginSuccess, redirectMessage }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [notification, setNotification] = useState(
    redirectMessage
      ? { type: 'warning', message: redirectMessage }
      : null
  );
  const [loading, setLoading] = useState(false);

  const clearNotification = () => setNotification(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearNotification();

    if (!email || !password) {
      setNotification({
        type: 'danger',
        message: 'Missing credentials: Please fill in both email and password fields.',
      });
      return;
    }

    if (isSignUp) {
      if (!displayName.trim()) {
        setNotification({
          type: 'danger',
          message: 'Display name required: Please enter the name to show in the navbar.',
        });
        return;
      }
      if (password !== confirmPassword) {
        setNotification({
          type: 'danger',
          message: 'Password mismatch: The password and confirmation password do not match.',
        });
        return;
      }
      if (password.length < 6) {
        setNotification({
          type: 'danger',
          message: 'Password too short: Password must be at least 6 characters long.',
        });
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const result = await signupWithEmail(email, password, displayName);
        setNotification({
          type: 'success',
          message: `Account created successfully! Welcome, ${result.user.displayName || result.user.email}!`,
        });
        if (onLoginSuccess) onLoginSuccess(result.user);
      } else {
        const result = await loginWithEmail(email, password);
        setNotification({
          type: 'success',
          message: `Logged in successfully! Welcome back, ${result.user.displayName || result.user.email}!`,
        });
        if (onLoginSuccess) onLoginSuccess(result.user);
      }
    } catch (error) {
      setNotification({
        type: 'danger',
        message: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearNotification();
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      setNotification({
        type: 'success',
        message: `Signed in with Google successfully! Welcome, ${result.user.displayName || result.user.email}!`,
      });
      if (onLoginSuccess) onLoginSuccess(result.user);
    } catch (error) {
      setNotification({
        type: 'danger',
        message: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  // Quick demonstration handlers for required test scenarios
  const handleDemoGoogle = async () => {
    await handleGoogleSignIn();
  };

  const handleDemoWrongPassword = async () => {
    clearNotification();
    setEmail('student@u.nus.edu');
    setPassword('wrongPassword999');
    setLoading(true);
    try {
      await loginWithEmail('student@u.nus.edu', 'wrongPassword999');
    } catch (error) {
      setNotification({
        type: 'danger',
        message: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoNonExistentUser = async () => {
    clearNotification();
    setEmail('unknown.student99@u.nus.edu');
    setPassword('randomPassword123');
    setLoading(true);
    try {
      await loginWithEmail('unknown.student99@u.nus.edu', 'randomPassword123');
    } catch (error) {
      setNotification({
        type: 'danger',
        message: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          {/* Main Auth Card */}
          <div className="card shadow-sm border border-light-subtle bg-white rounded-4 p-4 p-sm-5">
            <div className="text-center mb-4">
              <h2 className="h3 fw-bold text-dark">
                {isSignUp ? 'Create an Account' : 'Sign In to NUS Portal'}
              </h2>
              <p className="text-secondary small mb-0">
                {isSignUp
                  ? 'Register with your email to access university modules and admission'
                  : 'Access your university academics and admission process flow'}
              </p>
            </div>

            {/* Notification Alert Banner */}
            {notification && (
              <div
                className={`alert alert-${notification.type} alert-dismissible fade show d-flex align-items-center mb-4`}
                role="alert"
              >
                <div className="flex-grow-1">
                  {notification.message}
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={clearNotification}
                ></button>
              </div>
            )}

            {/* Mode Selector Tabs */}
            <ul className="nav nav-pills nav-fill mb-4 bg-light p-1 rounded-3">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${!isSignUp ? 'active fw-bold' : 'text-secondary'}`}
                  onClick={() => {
                    setIsSignUp(false);
                    clearNotification();
                  }}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${isSignUp ? 'active fw-bold' : 'text-secondary'}`}
                  onClick={() => {
                    setIsSignUp(true);
                    clearNotification();
                  }}
                >
                  Sign Up
                </button>
              </li>
            </ul>

            {/* Google Sign-in Button */}
            <button
              type="button"
              className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center mb-3 shadow-sm"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg
                className="me-2"
                width="18"
                height="18"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span>{isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="px-3 text-muted small text-uppercase">or with email</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Daryl Lee"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="student@u.nus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className={`btn w-100 py-2 fw-semibold ${
                  isSignUp ? 'btn-success' : 'btn-primary'
                }`}
                disabled={loading}
              >
                {loading
                  ? 'Processing...'
                  : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Demonstration Helper Box */}
          {/* <div className="card shadow-sm border border-light-subtle bg-white rounded-4 p-4 mt-4">
            <h3 className="h6 fw-bold text-dark mb-2">
              Authentication Flow Demonstration
            </h3>
            <p className="text-secondary small mb-3">
              Click the buttons below to immediately demonstrate each required authentication scenario:
            </p>
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-outline-success btn-sm text-start py-2"
                onClick={handleDemoGoogle}
                disabled={loading}
              >
                <strong>1. Test Google Sign-In:</strong> Sign in with Google account
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm text-start py-2"
                onClick={handleDemoWrongPassword}
                disabled={loading}
              >
                <strong>2. Test Wrong Password:</strong> Trigger wrong credentials notification
              </button>
              <button
                type="button"
                className="btn btn-outline-warning btn-sm text-start py-2 text-dark"
                onClick={handleDemoNonExistentUser}
                disabled={loading}
              >
                <strong>3. Test Non-Existent User:</strong> Trigger account not found notification
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;

