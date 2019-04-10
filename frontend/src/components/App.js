import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesAPI } from '../actions/categories';
import '../App.css';
import NavBar from '../components/NavBar';


class App extends Component {
  componentDidMount() {
      this.props.getCategories();
  }
  render() {
    console.log("app", this.props)
    return (
      <div className="App">
          <NavBar />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategoriesAPI())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
