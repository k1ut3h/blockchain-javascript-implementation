const SHA256 = require('crypto-js/sha256')

class Block{
	constructor(index, timeStamp, data, previousHash=' '){
		this.index = index;
		this.timeStamp = timeStamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}
	calculateHash(){
		return SHA256(this.index + this.timeStamp + this.previousHash + JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2022", "Genesis Block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	
	isChainValid(){
		for(let i=1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}
			
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}

		return true;

		}
	}
}

let myCoin = new Blockchain()
myCoin.addBlock(new Block(1, "10/10/2022", {amount: 4}));
myCoin.addBlock(new Block(1, "10/10/2022", {amount: 10}));

console.log(myCoin.isChainValid())

myCoin.chain[1].data = {amount: 69};
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

console.log(myCoin.isChainValid())

// console.log(myCoin.getLatestBlock());
