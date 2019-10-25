import React, { useState, useContext } from "react";
import { PropTypes } from "prop-types";
import GithubContex from "../../contex/github/githubContext";

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContex);
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert({ msg: "Please enter something", type: "light" });
    } else {
      githubContext.searchUser(text);
      setAlert(null);
      setText("");
    }
  };

  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search...'
          value={text}
          onChange={onChange}
        />

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>

      {githubContext.users && githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  // searchUser: PropTypes.func.isRequired,
  // clearUser: PropTypes.func.isRequired,
  // showClear: PropTypes.bool,
  setAlert: PropTypes.func
};

export default Search;
