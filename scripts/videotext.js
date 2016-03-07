var Courses = dataAPI.getCourses(),
Lessons = dataAPI.getLessons(),
Videos = dataAPI.getVideos(),
courseId = dataAPI.getCourseIndex(),
lessonId = dataAPI.getLessonIndex(),
videoId = dataAPI.getVideoIndex();

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
		changeCurrentVideo: function(newVideo) {
			model.changeCurrentVideo(newVideo);
			sidePanelView.render();
			youtubeView.render();
			notesView.render();
			jsbinView.render();
			breadCrumbView.printVideoName();
		},
		init: function() {
			var params = getAllParameters(window.location.href);
			console.log(params);
			if(!params){
				$(location).attr('href', 'index.html');
				return;
			}
			model.init(params["topic"],params["lesson"]);
			breadCrumbView.init(this.getCurrentLessonName,this.getCurrentTopicName,this.toggleView,this.showModal,this.getCurrentVideo);
			view.init(this.getCurrentLessonName,this.getCurrentTopicName,this.hidemodal);
			modalView.init(this.addNewjsbin,this.disableJSButton);
			sidePanelView.init(this.getAllVideos,this.getCurrentVideo,this.changeCurrentVideo);
			youtubeView.init(this.getCurrentVideo);

			notesView.init(this.addNewNote,this.showModal,this.toggleView,this.isSaved,this.toggleSave,this.getNotesOfCurrentVideo);
			jsbinView.init(this.getjsbinOfCurrentVideo,this.disableJSButton,this.renderThreeViews,this.renderTwoViews,this.enableJSButton);
			jsbinView.render();
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
		init : function(getAllVideos,getCurrentVideo,changeVideo) {
			this.getCurrentVideo = getCurrentVideo;
			this.changeVideo = changeVideo;
			that = this;

			var videos=getAllVideos(),
			parent=$("#l1"),
			optSign = $('#bar'),
			sideBlk = $('#lesson-list-container'),
			mainDiv=$('#sidenav-opacity-div'), /*contentStyler = $('#content-styler')*/
			index,listAppend;

			listAppend=videos.reduce(function(videoHTMLString,video){
				return videoHTMLString + '<li id="'+ video.id +'"class="lesson-list-container__lesson--title">'+ (video.name) +'</li>';
			},"");

			parent.append(listAppend);

			optSign.on("click", function(event) {
				sideBlk.css('transform','translateX(0%)');
				optSign.css("visibility", "hidden");
				mainDiv.css('opacity','0.5');
				mainDiv.css("display" ,'block');
			});

			$("#l1").on("click", function(event) {
				if(event.target && event.target.nodeName === "LI") {
					sideBlk.css('transform','translateX(-100%)');
					optSign.css("visibility", "visible");
					//$('#content-styler').css('opacity','1');
					mainDiv.css("display" ,'none');
					mainDiv.css('opacity','1');
					octopus.changeCurrentVideo(event.target.id);
					sidePanelView.changeVideo(event.target.id);
				}
			});

			mainDiv.on("click", function(event) {
				if(event.target.id != 'bar'){
					sideBlk.css('transform','translateX(-100%)');
					optSign.css("visibility", "visible");
					mainDiv.css('opacity','1');
					mainDiv.css("display" ,'none');
				}
			});


			this.render();
		},
		render : function() {
			console.log(that , this);
			var currentVideo=sidePanelView.getCurrentVideo();
			$('.active').removeClass('active');
			$("#"+currentVideo.id).addClass('active');
			console.log(currentVideo.id);
		} 
	}; 

	var youtubeView = {
		init: function(getCurrentVideo) {
			this.getCurrentVideo = getCurrentVideo;
			this.videoTag=$(".video");
			this.render();
		},
		render : function() {
			$('#youtube').remove();
			var curVideo=this.getCurrentVideo();
			this.videoTag.prepend('<embed  id="youtube" width="100%" height="100%"src="https://www.youtube.com/embed/'+ curVideo["url"]+'" frameborder="0" allowfullscreen">');
		}	
	};
	var notesView = {
		init: function(addNewNote,showModal,toggleView,isSaved,toggleSave,getNotesOfCurrentVideo) {
			this.toggleSave = toggleSave;
			this.getNotesOfCurrentVideo = getNotesOfCurrentVideo;
			this.isSaved = isSaved;
			this.addNewNote = addNewNote;
			this.showModal = showModal;
			this.toggleView = toggleView;


			that = this;

			$('#toolbar-top').on('click',function(event){
				//todo
				if(event.target.id==="save-notes"){
					a=advancedEditor.getContents();
					that.addNewNote(a);
					//$("#save-notes").attr('class','save-notes-btn--grey');
					$("#save-notes").attr('disabled','true');
				}
				else if(event.target.id==="embed-bin-btn"){
					that.showModal();
				}
				else if(event.target.id==="change-view"){
					that.toggleView();
				}
			});
			advancedEditor.on("text-change",function(delta){
				if(!that.isSaved()){
					$("#save-notes").removeAttr('disabled');
					//$("#save-notes").attr('class','save-notes-btn');
				}
				that.toggleSave(false);
			});
			that.render();
		},
		render: function() {
			var notes=that.getNotesOfCurrentVideo();
			if(notes){
				that.toggleSave(true);
				advancedEditor.setContents(notes);
			}
			else{
				notes=[];
				that.toggleSave(true);
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
		init: function(addNewjsbin,disableJSButton) {
			this.addNewjsbin = addNewjsbin;
			this.disableJSButton = disableJSButton;
			that = this;

			this.modalDiv = $('.modal-div').eq(0);
			this.contentStyler = $("#content-styler");
			$('#modal').on('click',function(event){
				if(event.target.id==='hide-jsbin'){
					modalView.hidemodal();
				}
				else if(event.target.id==='saveUrl'){
					var t2=$("#jsbinUrl").val();
					console.log(that);
					modalView.addNewjsbin(t2);
					modalView.disableJSButton();
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
		init: function(getjsbinOfCurrentVideo,disableJSButton,renderThreeViews,renderTwoViews,enableJSButton) {
			this.getjsbinOfCurrentVideo = getjsbinOfCurrentVideo;
			this.disableJSButton =disableJSButton;
			this.enableJSButton = enableJSButton;
			this.renderThreeViews = renderThreeViews;
			this.renderTwoViews = renderTwoViews;
			this.jsbintag=$(".jsbin");
		},
		render: function() {
			var jsbin=jsbinView.getjsbinOfCurrentVideo();
			if(jsbin){
				jsbinView.disableJSButton();
				$("iframe").remove();
				this.jsbintag.append('<iframe src=' + jsbin + ' style="border: 1px solid rgb(170, 170, 170); width: 100%; height:100%;min-height: 300px;"></iframe>');
				jsbinView.renderThreeViews();
			}
			else{
				jsbinView.renderTwoViews();
				jsbinView.enableJSButton();
				$("iframe").remove();
			}
		}
	};

	var breadCrumbView = {
		init: function(getCurrentLessonName,getCurrentTopicName,toggleView,showModal,getCurrentVideo){
			var breadCrumb = '<a class="breadcrumb--anchor" href="index.html"><i class="fa fa-home"></i></a>',
				jBreadCrumbHolder = $("#breadcrum-data"),
				embedBinBtn = document.getElementById("embed-bin-btn"),
				changeViewBtn = document.getElementById("change-view");

			this.getCurrentLessonName = getCurrentLessonName;
			this.getCurrentTopicName = getCurrentTopicName;
			this.getCurrentVideo = getCurrentVideo;

			if (this.getCurrentTopicName()) {
				breadCrumb += '<span><i class="fa fa-chevron-right"></i></span>'+
				'<a id="lesson-anchor" class="breadcrumb--anchor" href="lessonCards.html">'+
					'<div class="topic-name" id="topic-name">'+this.getCurrentTopicName()
					+'</div>'+
				'</a>';

				if (this.getCurrentLessonName()) {
					breadCrumb += '<span><i class="fa fa-chevron-right"></i></span>'+
								  '<div class="lesson-name" id="lesson-name">'+ this.getCurrentLessonName()+
								  '</div>'
					if (this.getCurrentVideo()) {
						breadCrumb += '<span><i class="fa fa-chevron-right"></i></span>'+
										'<div class="video-name" id="video-name">'+ this.getCurrentVideo().name+
										'</div>'
					}
				}
			}
			jBreadCrumbHolder.html(breadCrumb);

			this.toggleView = toggleView;
			this.showModal = showModal;

			changeViewBtn.onclick = this.toggleView;
			embedBinBtn.onclick = this.showModal;
		},

		printVideoName: function(){
			
			var jVideoName = $("#video-name");
			if (jVideoName) {
				jVideoName.html(breadCrumbView.getCurrentVideo().name);
			}
		}

	};

	var view = {
		init: function(getCurrentLessonName,getCurrentTopicName,hidemodal) {
			this.getCurrentLessonName = getCurrentLessonName;
			this.getCurrentTopicName = getCurrentTopicName;
			this.hidemodal = hidemodal;
			document.getElementById("lesson-anchor").href = "lessonCards.html?topic="+model.topicId;
			var lessonName = $("#lesson-name"), 
			topicName = $("#topic-name");

			this.toolbarTop = document.getElementById("toolbar-top");
			this.toolbarBottom = document.getElementById("toolbar-editor");
			this.container = document.getElementById("advance-wrapper");
			this.ResizeDiv = document.getElementById("content-styler");

			lessonName.html(view.getCurrentLessonName());
			topicName.html(view.getCurrentTopicName());
			$(window).eq(0).resize(function(){
				view.resizeWindow();
			});
			view.resizeWindow();
		},
		renderTwoViews: function(){
			this.ResizeDiv.className="content-style-1";
			view.resizeWindow();
			view.hidemodal();
		},
		renderThreeViews: function(){
			this.ResizeDiv.className="content-style-2";
			view.resizeWindow();
			view.hidemodal();
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
			view.hidemodal();
		},
		resizeWindow: function() {
			var toolbarTopHeight = this.toolbarTop.offsetHeight,
			containerHeight = this.container.offsetHeight;
			this.toolbarBottom.setAttribute("style","height:"+(containerHeight - toolbarTopHeight -5) +"px");
		}

	};

	octopus.init();
});
