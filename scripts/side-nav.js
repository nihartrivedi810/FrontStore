

view = {
	
	init : function() {

		var that = this;

		optSign = document.getElementById('bar');
		sideBlk = document.getElementById('lesson-list-container');
		lessTitle = document.getElementById('l1');
		videoContain= document.getElementsByClassName("lesson-list-container__lesson--video-list");
		sideBlk.style.visibility = "visible";




		optSign.addEventListener("click", function(e) {
			sideBlk.style.transform = "translateX(0%)"
			optSign.style.visibility = "hidden";
		});

		// sideBlk.addEventListener("mouseleave", function(e){

		// 	event.target.style.visibility = "hidden";
		// 	optSign.style.visibility = "visible";

		// });

		// sideBlk.addEventListener("mouseleave",function(e){
		// 	if(event.target.className == "lesson-list-container__lesson--video-list")
		// 	{
		// 		event.target.style.display = "none";
		// 	}
		// });


		document.addEventListener("click",function(e){
			var container = $("#lesson-list-container");
			var container2 = $("#side-bar")
			if (!container.is(e.target) && container.has(e.target).length === 0 && container2.has(e.target).length === 0) {
				//console.log("dsfds",e.target.id,e.target);
				sideBlk.style.transform = "translateX(-100%)"
				optSign.style.visibility = "visible";
			}
		});
		
	},

	



},






view.init();
