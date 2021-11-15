import React from 'react';

function StylesBox({data}) {
  
  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-dark text-white shadow">
        <div className="card-body">{data}</div>
      </div>
    </div>
  );
}

export default StylesBox;