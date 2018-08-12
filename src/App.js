import { providers } from 'ethers'
import React, { Component } from 'react'
import { parseSearchTerm } from './utils'
import QRGenerator from './QRGenerator'
import './App.css'

class App extends Component {
  state = {
    ethers: {},
    result: '',
    value: '' 
  }

  componentDidMount() {
    this.setState({
      ethers: new providers.InfuraProvider(providers.networks.mainnet)
    })
  }
  
  resolve = async (e) => {
    e.preventDefault();

    this.setState({
      value: this.input.value
    });
    var address;
    const type = parseSearchTerm(this.input.value);   
    console.log(type)
    switch (type) {
      case 'eth':
        address = await this.state.ethers.resolveName(this.input.value)

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
      case 'empty':
        this.setState({
          result: ''
        });
        break
      case 'search':
        console.log(this.input.value + '.eth');
        address = await this.state.ethers.resolveName(this.input.value + '.eth')
        this.setState({
          value: this.input.value + '.eth',
          result: address
        })
        break;
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
          
          <QRGenerator query={this.state.result} query2={this.state.value} /> 
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
