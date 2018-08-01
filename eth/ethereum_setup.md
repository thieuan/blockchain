# Evironment Setup

## 1. Tool
- Node JS: https://nodejs.org/en/
- Truffle Framework: https://truffleframework.com/  (Requires NodeJS 5.0+)
- OpenZeppelin: https://openzeppelin.org/ (Build Secure Smart Contracts in Solidity)
- Infura: https://infura.io (public to testnet without local)
- Solidity: https://solidity.readthedocs.io/en/develop/
- Python: https://www.python.org/downloads/
- Git

## 2. Install Ethereum
- https://github.com/ethereum/go-ethereum/wiki/Installation-instructions-for-Windows
- https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac
- https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Ubuntu

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
Check the listAccounts: In this case, the account is: 0x842d06ee2f7c45b3c1080bdb75757f269335bc9c

### Configure enode
Enode’s configuration will be used when other computers connect to the private network.

An enode is a way to describe an Ethereum node in the form of a URI, separated from the host by an @ sign.

The hexadecimal node ID is encoded in the username portion of the URL. The username portion is a 512-bit public key that is used to verify communication came from a particular node on the network.

The hostname can only be given as an IP address, DNS domain names are not allowed. The port in the host name section is the TCP listening port. If the TCP and UDP (discovery) ports differ, the UDP port is specified as query parameter “discport”.

At geth console, run this command and verify the node information:

```cmd
>admin.nodeInfo.enode
```
This is the enode:
```cmd
"enode://ba4a9b4e8fb7a46776ad1f3ace7cb63fab5c50b185516b01515de12b2d7adacc525e69c133b01611e1a7009a18121c5e0b7f9950c3b70f9124a1a784469e96e6@0.0.0.0:60303"
```
### IP and port for enode
Pay attention at port at enode’s end.

This is the port defined when execute geth:
```cmd
geth — networkid 13 — port 60303 — rpc — lightkdf — cache 16 — datadir “C:\ETH\data-private” console
```
So, I´m using port 60303.

Now check your computer’s IP. My IP is 192.168.1.114 

Copy this information at enode:

- IP: change 0.0.0.0 to 192.168.1.114
- Port: 60303
This is the enode with changes:

```cmd
"enode://ba4a9b4e8fb7a46776ad1f3ace7cb63fab5c50b185516b01515de12b2d7adacc525e69c133b01611e1a7009a18121c5e0b7f9950c3b70f9124a1a784469e96e6@192.168.1.114:60303"
```
Keep this information to use at second node.

I finished the configurations at principal node.

Now exit console to run it again with parameters to mine

```cmd
>exit
```
### Execute node to mine
Now we are already to mine. I will execute geth again, but adding some parameters:

```cmd
geth --identity nodeSOL --nodiscover --networkid 13 --port 60303 --maxpeers 10 --lightkdf --cache 16  --rpc --rpccorsdomain "*" --datadir "C:\ETH\data-private" --minerthreads 1  --mine
```
![alt text](https://cdn-images-1.medium.com/max/800/0*Vp3EckbLRtSJ1w-u. "Result")

Explaining the parameters:

— identity This will set up an identity for your node so it can be identified more easily in a list of peers.

— nodiscover Use this to make sure that your node is not discoverable by people who do not manually add you. Otherwise, there is a chance that your node may be inadvertently added to a stranger’s blockchain if they have the same genesis file and network id.

— rpccorsdomain Comma separated list of domains from which to accept cross origin requests (browser enforced)

— rpcapi API’s offered over the HTTP-RPC interface (default: “eth,net,web3”).

— minerthreads Number of CPU threads to use for mining (default: 2)

— mine Enable mining. You may not start mining now and wait until the second node is connected. This way you will have fewer blocks to synchronize at when the second node starts.

You can use etherbase to force mining to your account:

— etherbase Public address for block mining rewards (default = first account created) (default: “0”).

```cmd
geth --identity nodeSOL --nodiscover --networkid 13 --port 60303 --maxpeers 10 --lightkdf --cache 16  --rpc --rpccorsdomain "*" --datadir "C:\ETH\data-private" --etherbase "0x91e516b943c032d843356fa590bb2d56d52eb72e" --minerthreads 1  --mine
```
Pay attention to this line when run geth to mine at the first time:
![alt text](https://cdn-images-1.medium.com/max/800/0*IqZ4lgqvksJJqpTx. "Result")

It means that it is initializing mining. It may take a few minutes.

And… the first block is mined!

![alt text](https://cdn-images-1.medium.com/max/800/0*BMiQsqCowIfk5lHA. "Result")

### Attach to geth console in another window
I already have a geth node running, so I can attach another geth instance to interact with it.

I will start geth with parameters:

— ipcpath Filename for IPC socket/pipe within the datadir (explicit paths escape it)

 attach Geth Console: interactive JavaScript environment (connect to node)

It is important to attach at your previous datadir!

At windows, run another instance of Command Prompt or PowerShell with administrator privileges and run:
```cmd
geth --ipcpath geth.ipc --datadir "C:\ETH\data-private" attach
```
**Note** sometime the cmd is not working on Window, please use (specific name of instance and connect)
```cmd
geth --datadir datadir1 --port 60303 --nodiscover --ipcpath geth-data1.ipc --networkid 13 console
geth attach ipc:\\.\pipe\geth.ipc
```

To check if you are connect at the correct node, run this command at geth console:
```cmd
> personal
```
Check your account number, my is: 0x842d06ee2f7c45b3c1080bdb75757f269335bc9c

### Configure another node
Remember the first node’s configurations:

- IP: 192.168.1.114
- enode://ba4a9b4e8fb7a46776ad1f3ace7cb63fab5c50b185516b01515de12b2d7adacc525e69c133b01611e1a7009a18121c5e0b7f9950c3b70f9124a1a784469e96e6@192.168.1.114:60303

First of all, I recommend testing ping access on another computer that you would like to connect to the first node.

At windows, run Command Prompt or PowerShell:

```cmd
ping 192.168.1.114
```
### Creating The Genesis Block
The genesis block is the same in all nodes at private network.

https://github.com/thieuan/blockchain/blob/master/eth/genesis.json

I saved my genesis.json at “C:\ETH2\configs\genesis.json” in seconde node

### Init GETH to create the genesis block at node 2
Remember my settings (in Node 2):

- genesis.json is in “C:\ETH2\configs\genesis.json”
- datadir is “C:\ETH2\data-private”

At windows, run Command Prompt or PowerShell with administrator privileges and execute geth with the parameters — datadir and init
```cmd
geth --datadir "C:\ETH2\data-private" init "C:\ETH2\configs\genesis.json"
```
### Creating account at geth at node 2
Run geth with the following parameters:
```cmd
geth --networkid 13 --port 60303 --rpc --lightkdf --cache 16 --datadir "C:\ETH2\data-private" console
```
At geth console:
```cmd
>personal.newAccount()
Passphrase: *****
Repeat passphrase: *****
```
Define your password and don’t forget it!

Check your account at geth console:
```cmd
>personal
```
My account at node 2 is: 0x4c549625a09cff4831350e5400537674b7e1ac37

Exit geth console.
```cmd
>exit
```
### Clock error
Pay attention to this warning at geth console:
![alt text](https://cdn-images-1.medium.com/max/800/0*4ddI9CG73MHWujlr. "Error")
The nodes don’t synchronize when You have this warning.

You have to synchronize clock with internet time.

### Connect at another computer
It´s time to use enode info to execute geth connecting the private network.

```cmd
geth --networkid 13 --port 60303 --rpc --rpcport 8545 --rpccorsdomain "*" --datadir "C:\ETH2\data-private" --minerthreads 1 --bootnodes "enode://ba4a9b4e8fb7a46776ad1f3ace7cb63fab5c50b185516b01515de12b2d7adacc525e69c133b01611e1a7009a18121c5e0b7f9950c3b70f9124a1a784469e96e6@192.168.1.114:60303"
```
I started geth with a new parameter:

— bootnodes Comma separated enode URLs for P2P discovery bootstrap. Remember that we are “nodiscovery” and another computer can connect at first node only with enode.

In a few minutes you will see the second node synchronize with the first node!
![alt text](https://cdn-images-1.medium.com/max/800/1*4yv8ePKRDlr3NZG19oQVsw.png "Sync")

### Attach to geth console in another window
At windows, run another instance of Command Prompt or PowerShell with administrator privileges and run:
```cmd
geth — ipcpath geth.ipc — datadir "C:\ETH2\data-private" attach
```
### Check your private network
At geth console:
```cmd
net.peerCount
```
You will see how many nodes you have in your network.

We have the miner and one more node here.
```cmd
admin.peers
```
Show all nodes at the network.

You can see that in the first node we have nodeLUA connected and in the second node we have nodeSOL connected.

## 6. Smart Contract — Deploy
A smart contract is a computerized transaction protocol that executes the terms of a contract. \
Let’s try to deploy a smart contract. \
Go to Mist wallet → select an account (left panel) → click on contract → new contract → in text area copy and paste below code. → select contract name as Hello world → click on deploy 

```solidity 
pragma solidity ^0.4.4; 

contract HelloWorld { 
 uint public balance; 

 function HelloWorld(){ 
  balance = 100; 
 }  
 function deposit(uint amt) { 
  balance += amt; 
 }  
 
 function getBalance() returns (uint){ 
  return balance; 
 }  
} 
```

Note — Please note your Ethereum should be working on local machine with test net. Start mining before deploys the code. (From mist wallet → develop → start mining) 

## 7. Execute smart Contract
After successful deploy click on contact. Select a method to execute. Select deposit the amount to account. You will see there is a new transaction created for this and check balance. \
