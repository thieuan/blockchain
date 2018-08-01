# Evironment Setup

## 1. Tool
- Node JS: https://nodejs.org/en/
- Truffle Framework: https://truffleframework.com/  (Requires NodeJS 5.0+)
- Solidity: https://solidity.readthedocs.io/en/develop/
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

## 3. Install Ethereum Wallet
- Mist: https://github.com/ethereum/mist/releases
- Metamask: https://metamask.io/

## 4. Connect to test net and create new account
4.1. Open mist wallet menu → develop → select test net \
4.2. Menu → new account → provide pass phrase

## 5. Create Private Ethereum network

### Things to define before start
- Custom Genesis File
- Custom Data Directory (for me: “C:\ETH\”)
- Custom NetworkID (for me: 13)
- (Recommended) Disable Node Discovery

### Create genesis block
https://github.com/thieuan/blockchain/blob/master/eth/genesis.json

### Init GETH to create the genesis block
Remember my settings:

- genesis.json is in “C:\ETH\configs\genesis.json”
- datadir is “C:\ETH\data-private”
At windows, run Command Prompt or PowerShell with administrator privileges: 
Execute geth with the parameters — datadir and init:
```cmd
geth --datadir "C:\ETH\data-private" init "C:\ETH\configs\genesis.json"
```
Result: 
![alt text](https://cdn-images-1.medium.com/max/800/0*72sQ_rqtBcV1RGW8. "Result")

**Resolving the warning:** execute geth to create account
WARN [09–20|12:17:36] No etherbase set and no accounts found as default

### Creating account at geth
Let’s create the account that will be used for mining.
Run geth with the following parameters:
```cmd
geth --networkid 13 --port 60303 --rpc --lightkdf --cache 16 --datadir "C:\ETH\data-private" console
```
More info: https://github.com/ethereumproject/go-ethereum/wiki/Command-Line-Options

— networkid Network identifier (integer, 0=Olympic, 1=Homestead, 2=Morden) (default: 1). For a private network you define another number. I defined 13 for me

— port This is the “network listening port”, which you will use to connect with other peers manually.

— rpc Enable the HTTP-RPC server.

— rpcaddr HTTP-RPC server listening interface (default: “localhost”).

— rpcport HTTP-RPC server listening port (default: 8545).

— lightkdf Reduce key-derivation RAM & CPU usage at some expense of KDF strength.

— cache Megabytes of memory allocated to internal caching (min 16MB / database forced) (default: 128)

— datadir Data directory for the databases and keystore. Choose a location that is separate from your public Ethereum chain folder.

console Geth Console: interactive JavaScript environment

You’ll see something like this:
![alt text](https://cdn-images-1.medium.com/max/800/0*L09WhAPu9X1ILUEh. "Result")

### Create new Account
At geth console:
```cmd
>
>personal.newAccount()
Passphrase: *****
Repeat passphrase: *****
```
Define your password and don’t forget it!


### Check your account
At geth console:
```cmd
>
>personal
```
### Check the listAccounts:
Executing personal at geth console. In this case, the account is: 0x842d06ee2f7c45b3c1080bdb75757f269335bc9c

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
