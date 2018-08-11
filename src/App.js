import { providers } from 'ethers'
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    ethers: {}
  }
  componentDidMount() {
    this.setState({
      ethers: new providers.InfuraProvider(providers.networks.mainnet)
    })
  }
  resolve = () => {
    this.state.ethers.resolveName(this.input.value).then(address => {
      this.setState({
        address
      })
    })
  }
  // handleChange = e => {
  //   console.log(e)
  //   this.setState({
  //     input: e.value
  //   })
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='./ens-logo.png' className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ENS</h1>
        </header>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={() => this.resolve()}>Search</button>
        <div>{this.state.address}</div>
      </div>
    )
  }
}

export default App
