import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

const NavBar = function(props) {
    return (
        <nav className='nav'>
        <ul>
        <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
        </li>
        {props.categories && Object.keys(props.categories).map((categoryName, idx) => (
          <li key={idx}>
              <NavLink key={idx} to={"/" + props.categories[categoryName].path} activeClassName='active'>
                  {categoryName}
              </NavLink>
          </li>
        ))}
        </ul>
        </nav>
    );
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(NavBar)