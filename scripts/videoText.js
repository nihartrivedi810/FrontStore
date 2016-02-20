

$(function(){
	var videoList;
	var currentVideo=0;
	var model = {
		init: function() {
			var topiclists=JSON.parse(localStorage.topiclists);
			var topic = parseInt(localStorage.currentTopic);
			videoList=topiclists[topic].material[localStorage.lesson];
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
		getAllVideos: function() {
			return videoList;
		},
		changeCurrentVideo: function(newVideo) {
			currentVideo=newVideo;
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
		getAllVideos: function() {
			return model.getAllVideos();
		},
		changeCurrentVideo: function(newVideo) {
			model.changeCurrentVideo(newVideo);
			view.render();
		},
	};


	var view = {
		init: function() {
			this.videoTag=$(".video");
			this.jsbintag=$(".jsbin");
			$("#saveNotes").on('click',function(){
				a=advancedEditor.getContents();
				octopus.addNewNote(a);
			});
			$("#saveUrl").on('click',function(){
				var t2=$("#jsbinUrl").val();
				octopus.addNewjsbin(t2);
			});
			var videos=octopus.getAllVideos();
			var parent=$("#l1");
			for(var i in videos)
			{
				parent.append('<li id="'+ i +'"class="lesson-list-container__lesson--title">Video'+ (parseInt(i)+1) +'</li>');
			}
			document.getElementById("l1").addEventListener("click", function(e) {
				// e.target is the clicked element!
				// If it was a list item
				if(e.target && e.target.nodeName == "LI") {
					// List item found!  Output the ID!
					// alert(e.target.id);
					octopus.changeCurrentVideo(e.target.id);
					console.log("List item ", e.target.id.replace("post-"), " was clicked!");
				}
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
				$("iframe").remove();
				this.jsbintag.append('<iframe src=' + b + ' style="border: 1px solid rgb(170, 170, 170); width: 100%; min-height: 300px;"></iframe>');
			}
			else
			{
				$("iframe").remove();
			}
			$('#youtube').remove();
			var curVideo=octopus.getCurrentVideo();
			console.log(curVideo);
			this.videoTag.prepend('<embed  id="youtube" width="100%" height="100%"src="https://www.youtube.com/embed/'+ curVideo+'" frameborder="0" allowfullscreen">');
		}
	};

	octopus.init();
});