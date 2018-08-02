# Smartcontract development

## 1. Tool
- Node JS: https://nodejs.org/en/
- Truffle Framework: https://truffleframework.com/  (Requires NodeJS 5.0+)
- OpenZeppelin: https://openzeppelin.org/ (Build Secure Smart Contracts in Solidity)
- Infura: https://infura.io (public to testnet without local)
- Solidity: https://solidity.readthedocs.io/en/develop/
- Code Editor for Solidity: https://code.visualstudio.com/docs/?dv=win
- Python: https://www.python.org/downloads/
- Git: https://git-scm.com/

## 2. Setting up - Step by step
2.1 Setting up [Node JS](https://nodejs.org/en/) (version > 5.0)
2.2 Install Truffle framework
```cmd
npm install -g truffle
```
To verify that truffle is installed properly, type
```cmd
truffle version
```
We also will be using Ganache, a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests. You can download Ganache by navigating to http://truffleframework.com/ganache and clicking the "Download" button.
>**Note:** If you are developing in an environment without a graphical interface, you can also use Truffle Develop, Truffle's built-in personal blockchain, instead of Ganache. You will need to change some settings—such as the port the blockchain runs on—to adapt the tutorial for Truffle Develop.

## 3. Create a Truffle project using a Truffle box
3.1 Create a project directory and moving inside it
```cmd
mkdir smartcontract-sample

cd smartcontract-sample
```
3.2 Init your project
```cmd
truffle init
```
>**Note:** You can use the *truffle unbox <box-name>* command to download any of the other Truffle Boxes.

***Directory structure***  

The default Truffle directory structure contains the following:

***contracts/:*** Contains the Solidity source files for our smart contracts. There is an important contract in here called Migrations.sol, This is a separate Solidity file that manages and updates the status of your deployed smart contract. This file comes with every Truffle project, and is usually not edited.

***migrations/:*** Truffle uses a migration system to handle smart contract deployments. A migration is an additional special smart contract that keeps track of changes.

***test/:*** Contains both JavaScript and Solidity tests for our smart contracts

***truffle.js:*** Truffle configuration file

### 4. Writing smart contract

### 5. Compilaing and migrating the smart contract

#### Compilation
In a terminal, make sure you are in the root of the directory that contains the dapp and type:
```cmd
truffle compile
```
If you're on Windows and encountering problem running this command, please use [resolving naming conflict on Windows](https://truffleframework.com/docs/advanced/configuration#resolving-naming-conflicts-on-windows)

You should see output similar to the following:
```cmd
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/AnToken.sol...
Writing artifacts to ./build/contracts
```

#### Migration
A migration is a deployment script meant to alter the state of your application's contracts, moving it from one state to the next. For the first migration, you might just be deploying new code, but over time, other migrations might move data around or replace a contract with a new one.

You'll see one JavaScript file already in the ***migrations/*** directory: *1_initial_migration.js*. This handles deploying the *Migrations.sol* contract to observe subsequent smart contract migrations, and ensures we don't double-migrate unchanged contracts in the future.

Now we are ready to create our own migration script.

1. Create a new file named *2_deploy_contracts.js* in the ***migrations/*** directory.

2. Add the following content to the *2_deploy_contracts.js* file:

```js
var AnToken = artifacts.require("AnToken");

module.exports = function(deployer) {
  deployer.deploy(AnToken);
};
```
3. Before we can migrate our contract to the blockchain, we need to have a blockchain running. We can use [Ganache](https://truffleframework.com/ganache)

 Launching the application. This will generate a blockchain running locally on port 7545

4. Back in our terminal, migrate the contract to the blockchain.
```cmd
truffle migrate
```
You should see output similar to the following:
```cmd
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xcc1a5aea7c0a8257ba3ae366b83af2d257d73a5772e84393b0576065bf24aedf
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying AnToken...
  ... 0x43b6a6888c90c38568d4f9ea494b9e2a22f55e506a8197938fb1bb6e5eaa5d34
  Adoption: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...
```
You can see the migrations being executed in order, followed by the blockchain address of each deployed contract. (Your addresses will differ.)

5. In Ganache, note that the state of the blockchain has changed. The blockchain now shows that the current block, previously 0, is now 4. In addition, while the first account originally had 100 ether, it is now lower, due to the transaction costs of migration

You've now written your first smart contract and deployed it to a locally running blockchain. It's time to interact with our smart contract now to make sure it does what we want.
