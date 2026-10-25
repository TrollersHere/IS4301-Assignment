import React from 'react';
import nusLogo from '../nus_logo.svg';

function Home({ setActivePage }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 text-center">
          <div className="card shadow-sm border border-light-subtle bg-white rounded-4 p-4 p-md-5">
            <div className="mb-4">
              <img
                src={nusLogo}
                alt="NUS Logo"
                className="img-fluid mx-auto d-block"
              />
            </div>
            <h1 className="h2 fw-bold text-dark mb-3">
              NUS is a leading research university in Asia
            </h1>
            <p className="lead text-secondary mb-4">
              Welcome to the National University of Singapore. Discover our academic curriculum and admission process below.
            </p>
            {setActivePage && (
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="btn btn-primary px-4 py-2"
                  onClick={() => setActivePage('Academics')}
                >
                  View Academics
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary px-4 py-2"
                  onClick={() => setActivePage('Admission')}
                >
                  Admission Guide
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
