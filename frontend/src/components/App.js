import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { getCategoriesAPI } from '../actions/categories';
import '../App.css';
import NavBar from '../components/NavBar';
import Panel from './Panel';


class App extends Component {
  componentDidMount() {
      this.props.getCategories();
  }
  render() {
    console.log("app", this.props)
    return (
      <div className="App">
          <NavBar />
          <Switch>
          <Route exact path="/" render={(routeProps) => {
            return (
              <Panel title="React, Redux or Udacity" />
            );
          }} />
          <Route path="/:categoryName" render={(routeProps) => {
            return (
              <Panel title={routeProps.match.params.categoryName} categoryName={routeProps.match.params.categoryName} />
            );
          }} />
        </Switch>
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
