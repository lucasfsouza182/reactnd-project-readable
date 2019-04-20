import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'

const NavBar = function(props) {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item" activeClassName='active'>
                <NavLink to='/' exact activeClassName='active' className="nav-link">
                  Home
                </NavLink>
            </li>
            {props.categories && Object.keys(props.categories).map((categoryName, id) => (
              <li key={id} className="nav-item" activeClassName='active'>
                  <NavLink key={id} to={"/" + props.categories[categoryName].path} className="nav-link">
                      {categoryName}
                  </NavLink>
              </li>
            ))}
            </ul>
          </div>
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