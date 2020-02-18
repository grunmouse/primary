
function isqrt(n){
	let x = n, x1
	while(true){
		x1 = (x + n/x)/2n;
		if(x1 === x){
			return x;
		}
		x = x1;
	}
}

function tableTest(value, table){
	for(let i = 0, len = table.length; i<len ; ++i){
		let d = table[i];
		if(d**2n > value){
			break
		}
		if(!(value % d)){
			return false;
		}
	}
	return true;
}

module.exports = {
	tableTest
};