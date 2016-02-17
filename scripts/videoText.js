

$(function(){
	var videoList=["AkjMCbSvTto","uPTMmyZB7tw","ND8jAv7WrmU","57kH7Yole2k"];
	var currentVideo=0;
	var model = {
		init: function() {
			if (!localStorage.notes) {
				localStorage.notes = JSON.stringify({});
			}
		},
		addNewNote: function(obj) {
			var data =JSON.parse(localStorage.notes);
			if(data[videoList[currentVideo]])
			{
				data[videoList[currentVideo]].notes=obj;
			}
			else
			{
				data[videoList[currentVideo]]={ notes: obj};	
			}
			localStorage.notes = JSON.stringify(data);
			
		},
		addNewjsbin: function(jsbinURL) {
			var data =JSON.parse(localStorage.notes);
			if(data[videoList[currentVideo]])
			{
				data[videoList[currentVideo]].jsbin=jsbinURL;
			}
			else
			{
				data[videoList[currentVideo]]={ jsbin: jsbinURL};	
			}
			localStorage.notes = JSON.stringify(data);
		},
		getNotesOfCurrentVideo: function() {
			var data=JSON.parse(localStorage.notes);
			if(data[videoList[currentVideo]])
			{
				return data[videoList[currentVideo]].notes;	
			}
			else
			{
				return false;
			}
		},
		getjsbinOfCurrentVideo: function() {
			var data=JSON.parse(localStorage.notes);
			if(data[videoList[currentVideo]])
			{
				return data[videoList[currentVideo]].jsbin;	
			}
			else
			{
				return false;
			}
		},

		getCurrentVideo: function() {
			return videoList[currentVideo];
		},
		nextVideo: function() {
			currentVideo++;
		},
		hasNextVideo: function() {
			if(currentVideo+1<=videoList.length-1)
			{
				return true;
			}
			else
			{
				return false;
			}
		},
		previousVideo: function() {
			currentVideo--;
		},
		hasPreviousVideo: function() {
			if(currentVideo>0)
			{
				return true;
			}
			else
			{
				return false;
			}
		},
	};


	var octopus = {
		addNewNote: function(noteStr) {
			model.addNewNote(noteStr);
		},
		addNewjsbin: function(jsbinURL) {
			model.addNewjsbin(jsbinURL);
			view.render();
		},
		nextVideo: function() {
			model.nextVideo();
			view.render();
		},
		previousVideo: function() {
			model.previousVideo();
			view.render();
		},
		getNotesOfCurrentVideo: function() {
			return model.getNotesOfCurrentVideo();
		},
		getjsbinOfCurrentVideo: function() {
			return model.getjsbinOfCurrentVideo();
		},

		init: function() {
			model.init();
			view.init();
		},
		getCurrentVideo: function() {
			return model.getCurrentVideo();
		},
		hasNextVideo: function() {
			return model.hasNextVideo();
		},
		hasPreviousVideo: function() {
			return model.hasPreviousVideo();
		},
	};


	var view = {
		init: function() {
			this.videoTag=$(".video");
			this.jsbintag=$(".jsbin");
			this.jsbinurl=$(".jsbinUrl");
			this.saveurl=$(".saveurl");
			$(".save").on('click',function(){
				a=advancedEditor.getContents();
				octopus.addNewNote(a);
			});
			$(".next").on('click',function(){
				octopus.nextVideo();
			});
			$(".previous").on('click',function(){
				octopus.previousVideo();
			});
			$(".saveurl").on('click',function(){
				var t2=$(".jsbinUrl").val();
				octopus.addNewjsbin(t2);
			});
			view.render();
		},
		render: function(){

			var a=octopus.getNotesOfCurrentVideo();
			if(a)
			{
				advancedEditor.setContents(a);
			}
			else
			{
				a=[];
				advancedEditor.setContents(a);
			}
			var b=octopus.getjsbinOfCurrentVideo();
			if(b)
			{
				this.jsbinurl.hide();
				this.saveurl.hide();
				$(".jsbin-embed").remove();
				$("iframe").remove();
				this.jsbintag.append(b);
			}
			else
			{
				$(".jsbin-embed").remove();
				$("iframe").remove();
				this.jsbinurl.show();
				this.saveurl.show();
			}
			$('#youtube').remove();
			this.videoTag.prepend('<embed  id="youtube" width="100%" height="100%"src="http://www.youtube.com/embed/' + octopus.getCurrentVideo() + '"">')
			if(!octopus.hasNextVideo())
			{
				$(".next").hide();
			}
			else
			{
				$(".next").show();
			}
			if(!octopus.hasPreviousVideo())
			{
				$(".previous").hide();
			}
			else
			{
				$(".previous").show();
			}
		}
	};

	octopus.init();
});