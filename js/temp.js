
	
view = {
	
	init : function() {

		var that = this;

		optSign = document.getElementById('bar');
		sideBlk = document.getElementById('lesson-list-container');
		lessTitle = document.getElementById('l1');
		videoContain= document.getElementsByClassName("lesson-list-container__lesson--video-list");
		
		console.log("reached ...");

		optSign.addEventListener("click", function(e) {
			console.log("reached ");
			sideBlk.style.visibility = "visible";
			optSign.style.visibility = "hidden";
		});

		sideBlk.addEventListener("mouseleave", function(e){
			event.target.style.visibility = "hidden";
			optSign.style.visibility = "visible";

		});

		sideBlk.addEventListener("click",function(e){
			var id = event.target.id;
			console.log(event.target.parentNode.getElementsByClassName("lesson-list-container__lesson--video-list"));
			if(event.target.className == "lesson-list-container__lesson--title"){
				var videoList = event.target.parentNode.getElementsByClassName("lesson-list-container__lesson--video-list");
				videoList[0].style.display = "block";
			}

		});
	}
		
		
		
	},

	

	


view.init();
