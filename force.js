const {
	tableTest
} = require('./testing.js');

function force(n){
	const result = [2n];
	for(let i=3n; i<=n; i+=2n){
		if(tableTest(i, result)){
			result.push(i);
		}
	}
	return result;
}

module.exports = force;