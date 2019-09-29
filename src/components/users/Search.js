import React, { Component } from "react";
import { PropTypes } from "prop-types";

export class Search extends Component {
  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    showClear: PropTypes.bool,
    setAlert: PropTypes.func
  };

  state = {
    text: ""
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
        this.props.setAlert({alert:{msg:'Please enter something', type:'light'}});
    }else{
        this.props.searchUser(this.state.text);
        this.props.setAlert(null);
        this.setState({text: ''})
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search...'
            value={this.state.text}
            onChange={this.onChange}
          />

          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>

        {this.props.showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUser}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
