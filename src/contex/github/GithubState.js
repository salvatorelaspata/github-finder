import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';
const axios = require('axios');

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loaging: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const auth = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

  // Search User
  const searchUser = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&${auth}`
    );

    dispatch({
      type: SEARCH_USER,
      payload: res.data.items
    });
  };

  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?${auth}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get User repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${auth}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Clean user
  const clearUsers = () => dispatch({ type: CLEAR_USERS });
  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loaging,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
