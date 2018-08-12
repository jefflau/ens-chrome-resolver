import { providers } from 'ethers'
import React, { Component } from 'react'
import { parseSearchTerm } from './utils'
import './App.css'

class App extends Component {
  state = {
    ethers: {},
    result: ''
  }

  componentDidMount() {
    this.setState({
      ethers: new providers.InfuraProvider(providers.networks.mainnet)
    })
  }
  
  resolve = async (e) => {
    e.preventDefault();

    const type = parseSearchTerm(this.input.value);

    switch (type) {
      case 'eth':
        const address = await this.state.ethers.resolveName(this.input.value)

        this.setState({
          result: address
        })
        break
      case 'address':
        const name = await this.state.ethers.lookupAddress(this.input.value)
        this.setState({
          result: name
        })
        break
      default:
        this.setState({
          result: 'No ENS resolver'
        })
        console.log('unsupported')
    }
  }

  render() {
    return (
      <div className="Whole">
      <div className="App">
        <header className="App-header">
          <img src="./ens-logo.png" className="App-logo" alt="logo" />

        </header>
        <form onSubmit={(e) => this.resolve(e)}>
          <div className="input_submit">
            <input className="App-input" size="25" type="text" ref={input => (this.input = input)} placeholder='Search...' />
            <button className="App-submit" type="submit">Search ENS</button>
          </div>
        </form>
      </div>
      <div className="App-result">{this.state.result}</div>
      </div>
    )
  }
}

export default App
