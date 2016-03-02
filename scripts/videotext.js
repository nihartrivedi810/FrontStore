var Courses = rawData.getCourses(),
Lessons = rawData.getLessons(),
Videos = rawData.getVideos(),
courseId = rawData.getCourseIndex(),
lessonId = rawData.getLessonIndex(),
videoId = rawData.getVideoIndex();

$(function(){
	var videoList,
	currentVideo,

	model = {
		isSaved :false,
		init: function(topicId,lessonId) {
			
			if(!topicId||!lessonId||!Courses[topicId]||!(Lessons[lessonId])|| Lessons[lessonId].videos.length == 0||Lessons[lessonId]["courseId"] != +topicId){
				$(location).attr('href', 'index.html');
				//console.log(Lessons[lessonId]["courseId"] , +topicId);
				//console.log(topicId , lessonId);
			}
			model.topicId=topicId;
			model.lesson = Lessons[lessonId];
			model.topic = Courses[topicId];
			videoList = Lessons[lessonId].videos;
			currentVideo = Videos[videoList[0]];

			if (!localStorageGet('notes')) {
				localStorageSet('notes',{});
			}
		},
		addNewNote: function(obj) {
			var data =localStorageGet('notes');
			if(data[currentVideo.id]){
				data[currentVideo.id].notes=obj;
			}
			else{
				data[currentVideo.id]={ notes: obj};	
			}
			localStorageSet('notes',data);
			
		},
		addNewjsbin: function(jsbinURL) {
			var data =localStorageGet('notes');
			if(data[currentVideo.id]){
				data[currentVideo.id].jsbin=jsbinURL;
			}
			else{
				data[currentVideo.id]={ jsbin: jsbinURL};	
			}
			localStorageSet('notes',data);
		},
		getNotesOfCurrentVideo: function() {
			var data=localStorageGet('notes');
			if(data[currentVideo.id]){
				return data[currentVideo.id].notes;	
			}
			else{
				return false;
			}
		},
		getjsbinOfCurrentVideo: function() {
			var data=localStorageGet('notes');;
			if(data[currentVideo.id]){
				return data[currentVideo.id].jsbin;	
			}
			else{
				return false;
			}
		},

		getCurrentVideo: function() {
			return currentVideo;
		},
		getCurrentVideoId: function() {
			return currentVideo.id;
		},
		getAllVideos: function() {
			var videos = videoList.map(function (videoId){
				return Videos[videoId];
			})
			return videos;
		},
		changeCurrentVideo: function(newVideo) {
			currentVideo=Videos[newVideo];
		},
		getCurrentLessonName: function(){
			return model.lesson.name;
		},
		getCurrentTopicName: function(){
			return model.topic.name;
		}
	};

	//Controller
	var octopus = {
		init: function() {
			var params = getAllParameters(window.location.href);
			model.init(params["topic"],params["lesson"]);
			view.init();
			modalView.init();
			sidePanelView.init();
			youtubeView.init();
			notesView.init();
			jsbinView.init();
			jsbinView.render();
			breadCrumbView.init();
		},
		getCurrentVideoId: function() {
			return model.getCurrentVideoId();
		},
		addNewNote: function(noteStr) {
			model.addNewNote(noteStr);
		},
		addNewjsbin: function(jsbinURL) {
			model.addNewjsbin(jsbinURL);
			jsbinView.render();
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
			sidePanelView.render();
			youtubeView.render();
			notesView.render();
			jsbinView.render();
			breadCrumbView.printVideoName();
		},
		getCurrentLessonName: function(){
			return model.getCurrentLessonName();
		},
		getCurrentTopicName: function(){
			return model.getCurrentTopicName();
		},
		isSaved: function(){
			return model.isSaved;
		},
		toggleSave: function(val){
			model.isSaved = val;
		},
		enableJSButton: function() {
			notesView.enableJSButton();
		},
		disableJSButton: function() {
			notesView.disableJSButton();
		},
		showModal: function() {
			modalView.jsbinmodal();
		},
		hidemodal: function() {
			modalView.hidemodal();
		},
		renderTwoViews: function() {
			view.renderTwoViews();
		},
		renderThreeViews: function() {
			view.renderThreeViews();
		},
		toggleView: function(){
			view.toggleView();
		}
	};

	var sidePanelView = {
		init : function() {
			var videos=octopus.getAllVideos(),
			parent=$("#l1"),
			optSign = $('#bar'),
			sideBlk = $('#lesson-list-container'),
			mainDiv=$('#sidenav-opacity-div'), contentStyler = $('#content-styler'),
			index,listAppend;

			listAppend=videos.reduce(function(videoHTMLString,video){
				return videoHTMLString + '<li id="'+ video.id +'"class="lesson-list-container__lesson--title">'+ (video.name) +'</li>';
			},"");

			parent.append(listAppend);

			optSign.on("click", function(event) {
				sideBlk.css('transform','translateX(0%)');
				optSign.css("visibility", "hidden");
				$('#content-styler').css('opacity','0.1');
				mainDiv.css("display" ,'block');
			});

			$("#l1").on("click", function(event) {
				if(event.target && event.target.nodeName === "LI") {
					sideBlk.css('transform','translateX(-100%)');
					optSign.css("visibility", "visible");
					$('#content-styler').css('opacity','1');
					mainDiv.css("display" ,'none');
					octopus.changeCurrentVideo(event.target.id);
				}
			});

			mainDiv.on("click", function(event) {
				if(event.target.id != 'bar'){
					sideBlk.css('transform','translateX(-100%)');
					optSign.css("visibility", "visible");
					$('#content-styler').css('opacity','1');
					mainDiv.css("display" ,'none');
				}
			});


			this.render();
		},
		render : function() {
			var currentVideo=octopus.getCurrentVideo();
			$('.active').removeClass('active');
			$("#"+currentVideo.id).addClass('active');
			console.log(currentVideo.id);
		} 
	}; 

	var youtubeView = {
		init: function() {
			this.videoTag=$(".video");
			this.render();
		},
		render : function() {
			$('#youtube').remove();
			var curVideo=octopus.getCurrentVideo();
			this.videoTag.prepend('<embed  id="youtube" width="100%" height="100%"src="https://www.youtube.com/embed/'+ curVideo["url"]+'" frameborder="0" allowfullscreen">');
		}	
	};

	var notesView = {
		init: function() {
			$('#toolbar-top').on('click',function(event){
				if(event.target.id==="save-notes"){
					a=advancedEditor.getContents();
					octopus.addNewNote(a);
					//$("#save-notes").attr('class','save-notes-btn--grey');
					$("#save-notes").attr('disabled','true');
				}
				else if(event.target.id==="embed-bin-btn"){
					octopus.showModal();
				}
				else if(event.target.id==="change-view"){
					octopus.toggleView();
				}
			});
			advancedEditor.on("text-change",function(delta){
				if(!octopus.isSaved()){
					$("#save-notes").removeAttr('disabled');
					//$("#save-notes").attr('class','save-notes-btn');
				}
				octopus.toggleSave(false);
			});
			this.render();
		},
		render: function() {
			var notes=octopus.getNotesOfCurrentVideo();
			if(notes){
				octopus.toggleSave(true);
				advancedEditor.setContents(notes);
			}
			else{
				notes=[];
				octopus.toggleSave(true);
				advancedEditor.setContents(notes);
			}
		},
		disableJSButton: function() {
			$('#embed-bin-btn').eq(0).attr("disabled",true);
			//$('.embed-bin-btn').eq(0).css("background-color",'grey');
		},
		enableJSButton: function() {
			$('#embed-bin-btn').eq(0).removeAttr('disabled');
			//$('.embed-bin-btn').eq(0).css("background-color",'#337AB7');
		},
	};

	var modalView = {
		init: function() {
			this.modalDiv = $('.modal-div').eq(0);
			this.contentStyler = $("#content-styler");
			$('#modal').on('click',function(event){
				if(event.target.id==='hide-jsbin'){
					modalView.hidemodal();
				}
				else if(event.target.id==='saveUrl'){
					var t2=$("#jsbinUrl").val();
					octopus.addNewjsbin(t2);
					octopus.disableJSButton();
				}
			});
		},
		jsbinmodal: function() {
			this.modalDiv.css('transform','scale(1)');
			this.contentStyler.css('opacity','0.2');			
		},
		hidemodal: function() {
			this.modalDiv.css('transform','scale(0)');
			this.contentStyler.css('opacity','1');
		},


	};

	var jsbinView = {
		init: function() {
			this.jsbintag=$(".jsbin");
		},
		render: function() {
			var jsbin=octopus.getjsbinOfCurrentVideo();
			if(jsbin){
				octopus.disableJSButton();
				$("iframe").remove();
				this.jsbintag.append('<iframe src=' + jsbin + ' style="border: 1px solid rgb(170, 170, 170); width: 100%; height:100%;min-height: 300px;"></iframe>');
				octopus.renderThreeViews();
			}
			else{
				octopus.renderTwoViews();
				octopus.enableJSButton();
				$("iframe").remove();
			}
		}
	};

	var breadCrumbView = {
		init: function(){
			var lessonName = $("#lesson-name"), 
			topicName = $("#topic-name"),
			embedBinBtn = document.getElementById("embed-bin-btn"),
			changeViewBtn = document.getElementById("change-view");
			this.videoName = $("#video-name"),

			lessonName.html(octopus.getCurrentLessonName());
			topicName.html(octopus.getCurrentTopicName());
			this.printVideoName();

			changeViewBtn.onclick = octopus.toggleView;
			embedBinBtn.onclick = octopus.showModal;
		},

		printVideoName: function(){
			
			// console.log("dsfas",octopus.getCurrentVideo())
			this.videoName.html(octopus.getCurrentVideo().name);
		}

	};

	var view = {
		init: function() {
			document.getElementById("lesson-anchor").href = "lessonCards.html?topic="+model.topicId;
			var lessonName = $("#lesson-name"), 
			topicName = $("#topic-name");

			this.toolbarTop = document.getElementById("toolbar-top");
			this.toolbarBottom = document.getElementById("toolbar-editor");
			this.container = document.getElementById("advance-wrapper");
			this.ResizeDiv = document.getElementById("content-styler");

			lessonName.html(octopus.getCurrentLessonName());
			topicName.html(octopus.getCurrentTopicName());
			$(window).eq(0).resize(function(){
				view.resizeWindow();
			});
			view.resizeWindow();
		},
		renderTwoViews: function(){
			this.ResizeDiv.className="content-style-1";
			view.resizeWindow();
			octopus.hidemodal();
		},
		renderThreeViews: function(){
			this.ResizeDiv.className="content-style-2";
			view.resizeWindow();
			octopus.hidemodal();
		},
		toggleView: function(){
			var div = document.getElementById("content-styler");
			if(div.className==="content-style-1"){
				div.className="content-style-2";
			}
			else{
				div.className="content-style-1";
			}
			view.resizeWindow();
			octopus.hidemodal();
		},
		resizeWindow: function() {
			var toolbarTopHeight = this.toolbarTop.offsetHeight,
			containerHeight = this.container.offsetHeight;
			this.toolbarBottom.setAttribute("style","height:"+(containerHeight - toolbarTopHeight -5) +"px");
		}

	};

	octopus.init();
});
