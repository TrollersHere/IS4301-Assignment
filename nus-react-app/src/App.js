import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Academics from './components/Academics';
import Admission from './components/Admission';
import Footer from './components/Footer';

function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#academics') return 'Academics';
    if (hash === '#admission') return 'Admission';
    return 'Home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#academics') setActivePage('Academics');
      else if (hash === '#admission') setActivePage('Admission');
      else if (hash === '#home' || hash === '') setActivePage('Home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page.toLowerCase();
  };

  return (
    <div className="App min-vh-100 d-flex flex-column bg-light">
      <Navbar activePage={activePage} setActivePage={handlePageChange} />
      <main className="flex-grow-1">
        {activePage === 'Home' && <Home setActivePage={handlePageChange} />}
        {activePage === 'Academics' && <Academics />}
        {activePage === 'Admission' && <Admission />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
