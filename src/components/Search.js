import React, { Component } from 'react'

class Search extends Component {
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={() => this.props.resolve(this.input.value)}>
          Search
        </button>
      </div>
    )
  }
}

export default Search
