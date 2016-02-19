var template = document.getElementById("template").cloneNode(true);


var addId = function (node) {
	node.setAttribute ("data-id" , "gooo");

	var children = node.children;
	console.log(children);
	[].forEach.call(children,function (element) {
		addId(element);
	});
};

addId (template);

console.log (template);