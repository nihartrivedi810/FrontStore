

view = {
	
	init : function() {
		var that = this;
		optSign = document.getElementById('bar');
		sideBlk = document.getElementById('lesson-list-container');
		lessTitle = document.getElementById('l1');
		videoContain= document.getElementsByClassName("lesson-list-container__lesson--video-list");
		sideBlk.style.visibility = "visible";
		var mainDiv=document.getElementById('sidenav-opacity-div');
		optSign.addEventListener("click", function(e) {
			sideBlk.style.transform = "translateX(0%)"
			optSign.style.visibility = "hidden";
			document.getElementById('content-styler').style.opacity=0.1;
			mainDiv.style.display = 'block';
		});
		
		mainDiv.addEventListener("click",function(e){
			if(e.target.id != 'bar')
			{	
				mainDiv.style.display = 'none';
				sideBlk.style.transform = "translateX(-100%)";
				optSign.style.visibility = "visible";
				document.getElementById('content-styler').style.opacity=1;
			}
		});
		
	},

	



},






view.init();
