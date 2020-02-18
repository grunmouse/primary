const force = require('./force.js');
const wheel = require('./wheel.js');
const {
	tableTest
} = require('./testing.js');

/**
 * Постоянно хранимая таблица простых чисел
 */
const table = force(1000n);
let max = 1000n;

/**
 * Ищет номер наибольшего примариана, меньшего max
 */
function selectWheel(){
	let i=0, p = 1n;
	for(;i<table.length; ++i){
		let n = p * table[i];
		if(n>max){
			return [p, i-1];
		}
		p = n;
	}
	throw new Error('Crash selectWheel');
}

function nextWheel(step, k){
	return [step*table[k], k+1];
}

function prepareQueue(step, k){
	const starts = [1n];
	const base = table.slice(0, k);
	for(let i = 3n; i<step; i+=2n){
		if(tableTest(i, base){
			starts.push(i);
		}
	}
	return starts;
}

/**
 * Итератор, продолжающий очередь, заданную массивом starts и шагом step
 */
function *longQueue(starts, step, begin){
	const queue = starts.slice(0);
	let st = (begin-1n) - (begin-1n) % step;
	queue = queue.map(a=>{
		a += st;
		if(a<begin){
			a += step;
		}
	});
	queue.sort((a,b)=>Number(a-b));
	while(true){
		let value = queue.shift();
		queue.push(value + step);
		yield value;
	}
}

function *getQueue(){
	let [step, k] = selectWheel();
	let last = max;
	
	while(true){
		let [limit, l] = nextWheel(step, k);
		let starts = prepareQueue(step, k);
		let queue = longQueue(starts, step, last);
		
		for(let value of queue){
			if(value > limit) break;
			yield value;
			last = value;
		}
		[step, k] = [limit, l];
	}
}

function toLong(index){
	if(index<table.length){
		return;
	}
	let queue = getQueue();
	var v;

	do{
		let next = queue.next();
		if(next.done){
			return;
		}
		v = next.value;

		if(tableTest(v, table)){
			table.push(v);
		}
	}while(table.length<=index);
	
	max = v;	
	
}

function toValue(value){
	if(value<max){
		return;
	}
	let queue = getQueue();
	var v;

	do{
		let next = queue.next();
		if(next.done){
			return;
		}
		let v = next.value;

		if(tableTest(v, table)){
			table.push(v);
		}
	}while(v<value);
	
	max = v;
}

const wrapper = {
	
	get(index){
		toLong(index);
		return table[index];
	}
	
	get length(){
		return table.length;
	}
	
	slice(begin, end){
		toIndex(end);
		return table.slice(begin, end);
	}
	
	primarian(k){
		toIndex(k);
		return table.slice(0, k).reduce((a,b)=>(a*b),1);
	}
};

[
	'includes',
	'indexOf'
].forEach((name)=>{
	wrapper[name] = function(value){
		value = BigInt(value);
		toValue(value);
		return table[name](value);
	}
});




module.exports = wrapper;