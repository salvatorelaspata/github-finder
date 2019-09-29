import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";
import About from "./components/pages/About";

const axios = require("axios");

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    auth: `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  };

  // Get single user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?${this.state.auth}`
    );

    this.setState({ user: res.data, loading: false });
  };

  // Get User repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${this.state.auth}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  // Clear users from state
  clearUser = () =>
    this.setState({
      users: [],
      loading: false,
      alert: null //alert: { msg: "Please enter something", type: "dark" } }
    });

  // Search users
  searchUser = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&${this.state.auth}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  // Set Alert
  setAlert = alert => {
    this.setState({ alert: alert });
  };

  render() {
    library.add(fab);
    library.add(fas);

    const { users, loading, alert, user, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon={["fab", "github"]} />
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    {alert != null && <Alert {...alert} />}
                    <Search
                      searchUser={this.searchUser}
                      clearUser={this.clearUser}
                      showClear={users && users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
