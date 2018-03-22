import React from 'react';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <span className="errorCode">404</span>
      <span className="message">Page Not Found</span>
    </div>
  );
};

export default PageNotFound;
