//var template = document.getElementById("template").cloneNode(true);


var addId = function (node,val) {
	console.log (val);
	node.setAttribute ("data-id" , val);

	var children = node.children;
	//console.log(children);
	[].forEach.call(children,function (element) {
		addId(element,val);
	});
};

var data = JSON.parse(localStorage.topiclists);
	data = data[parseInt(localStorage.currentTopic)].material;

for (val in data) {
	console.log (val);
	var template = document.getElementById("template").cloneNode(true);
	addId (template, val);
	var dom = document.getElementsByClassName("holder")[0];
	//var contentName = document.querySelectorAll('[data-id = "'+val+'"]')[0];
	//console.log(contentName);
	contentName.innerHTML = val;
	console.log(template.innerHTML);
	dom.insertAdjacentHTML('beforeend' ,template.innerHTML );
};

//console.log (template);