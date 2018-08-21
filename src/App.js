import React, { Component } from 'react'
import TriveCoin from '../build/contracts/TriveCoin.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      console.log(results.web3);
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()
      // Instantiate contract once web3 provided.

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const coin = contract(TriveCoin)
    coin.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      coin.deployed().then((instance) => {
        console.log(instance.address)
      })
    })
  }
  createToken() {
    const contract = require('truffle-contract')
    const coin = contract(TriveCoin)
    coin.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts[0], "is the current account");
      coin.deployed().then((instance) => {
        const coinInstance = instance
        // create tokens (1mil), name, symbol
        return coinInstance.TriveTokenERC20(1000000, "Kaitlin", "CEB", {from: accounts[0], gas: 6654755})
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <button onClick={() => {this.instantiateContract()}}>open console to check contract address from coin</button><br />
              <button onClick={() => {this.createToken()}}>Create Token</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
