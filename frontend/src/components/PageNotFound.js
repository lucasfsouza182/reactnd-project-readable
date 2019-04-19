import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = function(props) {
  return (
    <div>
        404 Page Not Found
        <Link to={"/"}>
          <button className="primary edit">Back to Home</button>
        </Link>
    </div>
  );
}

export default PageNotFound