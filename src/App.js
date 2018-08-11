import { providers } from 'ethers'
import React, { Component } from 'react'
import Search from './components/Search'
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
  resolve = async input => {
    const type = parseSearchTerm(input)

    console.log(type)

    switch (type) {
      case 'eth':
        const address = await this.state.ethers.resolveName(input)

        this.setState({
          result: address
        })
        break
      case 'address':
        const name = await this.state.ethers.lookupAddress(input)
        this.setState({
          result: name
        })
        break
      default:
        this.setState({
          result: 'invalid name or address'
        })
        console.log('unsupported')
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="./ens-logo.png" className="App-logo" alt="logo" />
          <h1 className="App-title">ENS</h1>
        </header>
        <Search ethers={this.state.ethers} resolve={this.resolve} />
        <div>{this.state.result}</div>
      </div>
    )
  }
}

export default App
