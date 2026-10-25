import React from 'react';

function Admission() {
  const timelineSteps = [
    { number: '1', text: 'Understanding Admission requirements' },
    { number: '2', text: 'Submit application online' },
    { number: '3', text: 'Upload supporting documents' },
    { number: '4', text: 'Make application fee payment' },
    { number: '5', text: 'Check application status' },
  ];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm border border-light-subtle bg-white rounded-3">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <div>
                <h2 className="h4 mb-0 fw-bold text-dark">Admission</h2>
                <small className="text-secondary">Application Guide</small>
              </div>
              <span className="badge bg-success px-3 py-2">Process Flow</span>
            </div>
            <div className="card-body p-4">
              <h3 className="h5 text-dark mb-2">Admission Process Flow</h3>
              <p className="text-secondary mb-4">
                Follow this sequential timeline to complete your admission application:
              </p>
              <ol className="fs-5 ps-4 mb-0 text-dark">
                {timelineSteps.map((step) => (
                  <li key={step.number} className="mb-3">
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admission;
