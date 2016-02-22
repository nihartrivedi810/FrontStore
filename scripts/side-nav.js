

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
			document.getElementById('content-styler').style.opacity=0.1;
		});
		var mainDiv=document.getElementById('content-styler');
		mainDiv.addEventListener("click",function(e){
			if(e.target.id != 'bar')
			{
				console.log(e.target.id);
				sideBlk.style.transform = "translateX(-100%)";
				optSign.style.visibility = "visible";
				document.getElementById('content-styler').style.opacity=1;
			}
		});
		
	},

	



},






view.init();
