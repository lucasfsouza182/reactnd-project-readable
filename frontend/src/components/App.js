import React, { Component , Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { getCategoriesAPI } from '../actions/categories';
import '../App.css';
import NavBar from '../components/NavBar';
import Panel from './Panel';
import Post from './Post';
import PostForm from './PostForm';


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
            <Route exact path="/" render={() => {
              return (
                <Panel title="React, Redux or Udacity" />
              );
            }} />
            <Route path="/post/:postId?" component={PostForm}></Route>
            <Route path="/:categoryParam/:postId" component={Post}></Route>
            <Route path="/:categoryParam" render={(routeProps) => {
              console.log("routeProps",routeProps)
              return (
                <Panel title={routeProps.match.params.categoryParam} categoryParam={routeProps.match.params.categoryParam} />
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
