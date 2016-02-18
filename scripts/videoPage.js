function buttonClick(){
	var div = document.getElementById("content-styler");
	if(div.className==="content-style-1")
		div.className="content-style-2";
	else
		div.className="content-style-1";
	resizeWindow();
}

var resizeWindow = function () {
	var first = document.getElementById("toolbar-top"),
		second = document.getElementById("toolbar-editor"),
		container = document.getElementById("advance-wrapper"),
		firstHeight = first.offsetHeight,
		containerHeight = container.offsetHeight;

	second.setAttribute("style","height:"+(containerHeight - firstHeight) +"px");
}

resizeWindow();