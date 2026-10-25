import React from 'react';

function Academics() {
  const modules = [
    { code: 'BT1101', title: 'Introduction to Business Analytics' },
    { code: 'BT2101', title: 'Econometrics Modelling for Business Analytics' },
    { code: 'BT2102', title: 'Data Management and Visualisation' },
    { code: 'BT2103', title: 'Optimization Methods in Business Analytics' },
  ];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm border border-light-subtle bg-white rounded-3">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <div>
                <h2 className="h4 mb-0 fw-bold text-dark">Academics</h2>
                <small className="text-secondary">Undergraduate Curriculum</small>
              </div>
              <span className="badge bg-primary px-3 py-2">Modules List</span>
            </div>
            <div className="card-body p-4">
              <h3 className="h5 text-dark mb-2">Modules Taught at the University</h3>
              <p className="text-secondary mb-4">
                The university offers a comprehensive suite of business analytics courses:
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="w-25 text-dark fw-bold">Module Code</th>
                      <th scope="col" className="text-dark fw-bold">Module Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module.code}>
                        <td className="fw-semibold text-primary">{module.code}</td>
                        <td className="text-dark">{module.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;
