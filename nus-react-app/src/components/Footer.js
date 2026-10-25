import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-top text-secondary text-center py-4 mt-auto">
      <div className="container">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} National University of Singapore. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;

