"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

//// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

//// Create Blockchain
function blockHash(bl) {
	//var block = JSON.stringify(bl)
	return crypto.createHash("sha256").update(
		'${bl.index}; ${bl.prevHash}; ${bl.data}; ${bl.timestamp};'
		//block
	).digest("hex");
}

function createBlock(line){
	var loc = Blockchain.blocks.length
	var newBlock ={
		index: loc,
		prevHash: Blockchain.blocks[loc - 1].hash,
		data: line,
		timestamp: Date.now(),
	}
	newBlock.hash = blockHash(newBlock)
	Blockchain.blocks.push(newBlock)

}

for (let line of poem) {
	createBlock(line);
}

console.log(Blockchain.blocks)

//// Verify Blockchain Data
function verifyChain(Blockchain){
	var blip = 0
	if (Blockchain.blocks[0].hash == "000000"){
		for (var i = 1; i <= 8; i++){
			if (Blockchain.blocks[i].data !== null && Blockchain.blocks[i].prevHash !== null && Blockchain.blocks[i].index >= 0){
				var hashInput = Blockchain.blocks[i].index + Blockchain.blocks[i].prevHash + Blockchain.blocks[i].data + Blockchain.blocks[i].timeStamp
				var hashValue = blockHash(hashInput)
				if (Blockchain.blocks[i].hash == hashValue){
					blip++
				}	
			} 
		}
	}
	if (blip == 8){
		console.log(blip)
		return "True"
	} else {
		console.log(blip)
		return "False"
	}
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);