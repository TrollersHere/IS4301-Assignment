import React from 'react';

function AccessDenied({ pageName, onGoToLogin }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <div className="card shadow-sm border border-danger-subtle bg-white rounded-4 p-4 p-md-5">
            <div className="display-4 text-danger mb-3">🔒</div>
            <h2 className="h3 fw-bold text-dark mb-2">Access Restricted</h2>
            <p className="text-secondary mb-4">
              The <strong>{pageName}</strong> page is private and inaccessible to guests. Please sign in or create an account with your email or Google account to view this content.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="btn btn-primary px-4 py-2 fw-semibold"
                onClick={onGoToLogin}
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;

