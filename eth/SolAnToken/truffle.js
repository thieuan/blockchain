let mnemonic = "";    //For your wallet
let api_key = "";     //To use infura

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {        // Ganache
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/' + token, 0),
      network_id: 3,
      gas: 4700000
    }

  }
};
