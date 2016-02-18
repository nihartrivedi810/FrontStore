
	
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

		sideBlk.addEventListener("mouseleave",function(e){
			if(event.target.className == "lesson-list-container__lesson--video-list")
			{
				event.target.style.display = "none";
			}
		});

		sideBlk.addEventListener("click",function(e){
			var id = event.target.id;
			var parent = event.target.parentNode;
			
			videolists = document.getElementsByClassName("lesson-list-container__lesson--video-list");
			
			
			for(var videolist in videolists){
				console.log(videolists[videolist]);
				videolists[videolist].className ="lesson-list-container__lesson--video-list noDisplay";

			}

			if(event.target.className == "lesson-list-container__lesson--title"){
				var videoList = parent.getElementsByClassName("lesson-list-container__lesson--video-list ");
				if(videoList[0].className =="lesson-list-container__lesson--video-list noDisplay"){
					videoList[0].className = "lesson-list-container__lesson--video-list";
				}
				else{
					videoList[0].className = "lesson-list-container__lesson--video-list noDisplay";
				}

			}

		});
	},

	
		
		
		
	},

	

	


view.init();
