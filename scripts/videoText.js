

$(function(){
	var videoList;
	var currentVideo=0;
	var model = {
		setContentsCalled :false,
		init: function() {
			var topiclists=JSON.parse(localStorage.topiclists);
			var topic = parseInt(localStorage.currentTopic);
			model.topicName = topiclists[topic]["topic"];
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
		getCurrentVideoId: function() {
			return currentVideo;
		},
		getAllVideos: function() {
			return videoList;
		},
		changeCurrentVideo: function(newVideo) {
			currentVideo=newVideo;
		},
		getCurrentLessonName: function(){
			return localStorage.lesson;
		},
		getCurrentTopicName: function(){
			return model.topicName;
		}
	};


	var octopus = {
		init: function() {
			model.init();
			view.init();
			sidePanelView.init();
		},
		getCurrentVideoId: function() {
			return model.getCurrentVideoId();
		},
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
	
		getCurrentVideo: function() {
			return model.getCurrentVideo();
		},
		getAllVideos: function() {
			return model.getAllVideos();
		},
		changeCurrentVideo: function(newVideo) {
			model.changeCurrentVideo(newVideo);
			view.render();
			sidePanelView.render();
		},
		getCurrentLessonName: function(){
			return model.getCurrentLessonName();
		},
		getCurrentTopicName: function(){
			return model.getCurrentTopicName();
		},
		isSetContentsCalled: function(){
			return model.setContentsCalled;
		},
		setContentsCalled: function(val){
			model.setContentsCalled = val;
		}
	};
	var sidePanelView = {
		init : function() {
			var videos=octopus.getAllVideos();
			var parent=$("#l1");
			for(var i in videos)
			{
				parent.append('<li id="'+ i +'"class="lesson-list-container__lesson--title">Video'+ (parseInt(i)+1) +'</li>');
			}
			$("#l1").on("click", function(e) {
				if(e.target && e.target.nodeName == "LI") {
					octopus.changeCurrentVideo(e.target.id);
					console.log("List item ", e.target.id.replace("post-"), " was clicked!");
				}
			});
			this.render();
		},
		render : function() {
			var currentVideo=octopus.getCurrentVideoId();
			$('.active').removeClass('active');
			$("#"+currentVideo).addClass('active');
			

		} 
	}; 
	var view = {
		init: function() {
			var lessonName = $("#lesson-name"), topicName = $("#topic-name");
			this.videoTag=$(".video");
			this.jsbintag=$(".jsbin");
			lessonName.html(octopus.getCurrentLessonName());
			topicName.html(octopus.getCurrentTopicName());
			$("#save-notes").on('click',function(){
				a=advancedEditor.getContents();
				octopus.addNewNote(a);
				$("#save-notes").attr('class','save-notes-btn--grey');
				$("#save-notes").attr('disabled','true');
			});
			$("#saveUrl").on('click',function(){
				var t2=$("#jsbinUrl").val();
				octopus.addNewjsbin(t2);
			});
			advancedEditor.on("text-change",function(delta){
				if(!octopus.isSetContentsCalled()){
					$("#save-notes").removeAttr('disabled');
					$("#save-notes").attr('class','save-notes-btn');
				}
				octopus.setContentsCalled(false);
			});
			view.render();
		},
		render: function(){

			var a=octopus.getNotesOfCurrentVideo();
			if(a)
			{
				octopus.setContentsCalled(true);
				advancedEditor.setContents(a);
			}
			else
			{
				a=[];
				octopus.setContentsCalled(true);
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
			this.videoTag.prepend('<embed  id="youtube" width="100%" height="100%"src="https://www.youtube.com/embed/'+ curVideo+'" frameborder="0" allowfullscreen">');
		}
	};

	octopus.init();
});