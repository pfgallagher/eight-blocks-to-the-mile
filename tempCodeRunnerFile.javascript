const intersect = (a,b) => {
	const myMap = new Map();
	[...a,...b].forEach(el => {
		myMap.set(el);
	});
	return myMap;
};

	console.log(intersect([1,4,9,10,11], [2,3,4,5,8,10]));