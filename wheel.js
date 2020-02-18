const {
	tableTest
} = require('./testing.js');

function wheel(k, n, prim){
	prim = prim || [2n,3n,5n];
	let base = prim.slice(0,k);
	let step = base.reduce((akk, a)=>(akk*a),1n);
	let starts = new Set();
	prep:for(let i = 3n; i<step; i+=2n){
		for(let d of base){
			if(!(i % d)){
				continue prep;
			}
		}
		starts.add(i);
	}
	starts.add(1n);
	//starts содержит числа, взаимно простые со step, а также 1
	console.log(starts);
	starts = [...starts].sort((a,b)=>Number(a-b));
	let queue = starts.map((a)=>(a+step));
	let result = prim.slice(0);
	let max = result[result.length-1];
	
	while(queue[0]){
		let value = queue.shift();
		let next = value + step;
		if(next<n){
			queue.push(next);
		}
		if(value > max && tableTest(value, result)){
			result.push(value);
		}
	}
	
	return result;
}

module.exports = wheel;