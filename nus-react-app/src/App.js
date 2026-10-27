import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Academics from './components/Academics';
import Admission from './components/Admission';
import Footer from './components/Footer';
import Login from './components/Login';
import AccessDenied from './components/AccessDenied';
import { subscribeToAuthChanges, logoutUser } from './firebase';

function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#academics') return 'Academics';
    if (hash === '#admission') return 'Admission';
    if (hash === '#login') return 'Login';
    return 'Home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginRedirectMessage, setLoginRedirectMessage] = useState('');

  // Subscribe to Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Listen to browser hash changes (Back/Forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#academics') setActivePage('Academics');
      else if (hash === '#admission') setActivePage('Admission');
      else if (hash === '#login') setActivePage('Login');
      else if (hash === '#home' || hash === '') setActivePage('Home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page, redirectMsg = '') => {
    if (redirectMsg) {
      setLoginRedirectMessage(redirectMsg);
    } else if (page !== 'Login') {
      setLoginRedirectMessage('');
    }
    setActivePage(page);
    window.location.hash = page.toLowerCase();
  };

  const handleLogout = async () => {
    await logoutUser();
    handlePageChange('Home');
  };

  const handleLoginSuccess = () => {
    // Navigate to Academics once logged in to access protected content
    handlePageChange('Academics');
  };

  return (
    <div className="App min-vh-100 d-flex flex-column bg-light">
      <Navbar
        activePage={activePage}
        setActivePage={(page) => handlePageChange(page)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="flex-grow-1">
        {authLoading ? (
          <div className="container text-center my-5 py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3">Connecting to authentication...</p>
          </div>
        ) : (
          <>
            {/* Home Page (Public) */}
            {activePage === 'Home' && (
              <Home setActivePage={(page) => handlePageChange(page)} />
            )}

            {/* Login / Sign Up Page */}
            {activePage === 'Login' && (
              <Login
                onLoginSuccess={handleLoginSuccess}
                redirectMessage={loginRedirectMessage}
              />
            )}

            {/* Academics Page (Protected) */}
            {activePage === 'Academics' &&
              (currentUser ? (
                <Academics />
              ) : (
                <AccessDenied
                  pageName="Academics"
                  onGoToLogin={() =>
                    handlePageChange(
                      'Login',
                      'Please log in to view the Academics module catalog.'
                    )
                  }
                />
              ))}

            {/* Admission Page (Protected) */}
            {activePage === 'Admission' &&
              (currentUser ? (
                <Admission />
              ) : (
                <AccessDenied
                  pageName="Admission"
                  onGoToLogin={() =>
                    handlePageChange(
                      'Login',
                      'Please log in to view the Admission process flow.'
                    )
                  }
                />
              ))}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
