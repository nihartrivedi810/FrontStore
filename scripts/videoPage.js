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
	var first = document.getElementById("toolbar-top"),
		second = document.getElementById("toolbar-editor"),
		container = document.getElementById("advance-wrapper"),
		firstHeight = first.offsetHeight,
		containerHeight = container.offsetHeight;

	second.setAttribute("style","height:"+(containerHeight - firstHeight -5) +"px");
}

resizeWindow();

var jsbinmodal = function() {
	// var modal = $(".modal-div").css('transform','scale(1)');
	document.getElementsByClassName('modal-div')[0].style.transform='scale(1)';
}
var hidemodal = function() {
	document.getElementsByClassName('modal-div')[0].style.transform='scale(0)';
}
