//var template = document.getElementById("template").cloneNode(true);


var addId = function (node,val) {
	//console.log (val);
	var attr = node.getAttribute ("id");
	if (attr) {
		node.setAttribute("id" , attr+"_"+val);
	}
	node.setAttribute ("data-id" , val);

	var children = node.children;
	[].forEach.call(children,function (element) {
		addId(element,val);
	});
};

var data = JSON.parse(localStorage.topiclists);
	data = data[parseInt(localStorage.currentTopic)].material;

for (val in data) {
	//console.log (val);
	var template = document.getElementById("template").cloneNode(true);
	addId (template, val);
	var dom = document.getElementsByClassName("holder")[0];
	dom.insertAdjacentHTML('beforeend' ,template.innerHTML );
	var contentName = document.getElementById("content-name_"+val);
	contentName.innerHTML = val;

	var contentInfo = document.getElementById("content-info_"+val);
	contentInfo.innerHTML = val;
	//console.log(template.innerHTML);
};

//console.log (template);
