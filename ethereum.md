# Evironment Setup

## 1. Tool
- Node JS: https://nodejs.org/en/
- Truffle Framework: https://truffleframework.com/  (Requires NodeJS 5.0+)
- Python: https://www.python.org/downloads/
- Git
## 2. Install Ethereum
- https://github.com/ethereum/go-ethereum/wiki/Installation-instructions-for-Windows
- https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac
- https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu

[Window]
- Open cmd  
- C:\Program Files\Geth>geth.exe

[AWS]
Ethereum AWS set up

1. Install Nodejs \
sudo apt-get install node-legacy \
sudo apt-get install npm \

2. Install Ethereum \
sudo apt-get install software-properties-common \
sudo add-apt-repository -y ppa:ethereum/ethereum-qt \
sudo add-apt-repository -y ppa:ethereum/ethereum \
sudo add-apt-repository -y ppa:ethereum/ethereum-dev \
sudo apt-get update \
sudo apt-get install ethereum \
sudo apt-get update \
sudo apt-get install cpp-ethereum
## 3. Install Ethereum Wallet (Mist)
- https://github.com/ethereum/mist/releases
- Metamask???
## 4. Connect to test net and create new account
4.1. Open mist wallet menu → develop → select test net \
4.2. Menu → new account → provide pass phrase
## 5. Test Ethers
5.1. Create a Json file (CustomGenesis.json) \
{ \
 “nonce”: “0x0000000000000042”, “timestamp”: “0x0”, \
 “parentHash”: “0x0000000000000000000000000000000000000000000000000000000000000000”, \
 “extraData”: “0x0”, “gasLimit”: “0x8000000”, “difficulty”: “0x400”, \
 “mixhash”: “0x0000000000000000000000000000000000000000000000000000000000000000”, \
 “coinbase”: “0x3333333333333333333333333333333333333333”, \
 “alloc”: { “YOUR_PUBLIC_ADDRESS” : 2000000 } \
}

5.2. Initialize the geth with json file form terminal \
geth init CustomGenesis.json

## 6. Smart Contract — Deploy
A smart contract is a computerized transaction protocol that executes the terms of a contract. \
Let’s try to deploy a smart contract. \
Go to Mist wallet → select an account (left panel) → click on contract → new contract → in text area copy and paste below code. → select contract name as Hello world → click on deploy 

pragma solidity ^0.4.4; 

contract HelloWorld { \
 uint public balance; 

function HelloWorld(){ \
 balance = 100; 
 } 
 function deposit(uint amt) { \
 balance += amt; \
 } 
 
function getBalance() returns (uint){ \
 return balance; \
 } 
 } 

Note — Please note your Ethereum should be working on local machine with test net. Start mining before deploys the code. (From mist wallet → develop → start mining) 

## 7. Execute smart Contract
After successful deploy click on contact. Select a method to execute. Select deposit the amount to account. You will see there is a new transaction created for this and check balance. \
