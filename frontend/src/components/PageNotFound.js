import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = function(props) {
  return (
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>404 - The Page can't be found</h2>
			</div>
      <Link to={"/"}>
        <button>Back to Home</button>
      </Link>
		</div>
      {/* <div>
        404 Page Not Found
        <Link to={"/"}>
          <button className="primary edit">Back to Home</button>
        </Link>
    </div> */}
	</div>
  );
}

export default PageNotFound