function changeView(){
	var div = document.getElementById("content-styler");
	if(div.className==="content-style-1")
		div.className="content-style-2";
	else
		div.className="content-style-1";
	resizeWindow();
	hidemodal();
}
var resizeWindow = function () {
	var toolbarTop = document.getElementById("toolbar-top"),
		toolbarBottom = document.getElementById("toolbar-editor"),
		container = document.getElementById("advance-wrapper"),
		toolbarTopHeight = toolbarTop.offsetHeight,
		containerHeight = container.offsetHeight;

	toolbarBottom.setAttribute("style","height:"+(containerHeight - toolbarTopHeight -5) +"px");
}

resizeWindow();























