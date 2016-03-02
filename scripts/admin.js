// Intern who is trying to change code here , tumse na hoayega.
/*var Courses = rawData.getCourses();
var Lessons = rawData.getLessons();
var Videos = rawData.getVideos();
var courseId = rawData.getCourseIndex();
var lessonId = rawData.getLessonIndex();
var videoId = rawData.getVideoIndex();*/

var model = {


	toJSON : function (data) {
		return JSON.stringify(data);
	},

	getLessons : function () {
		return rawData.getLessons();;
	},

	getVideos : function () {
		return rawData.getVideos();
	},

	addLessonToCourse : function (lessonId,courseId) {

		var courses = this.getCourses();
		courses[courseId].lessons.push(lessonId);

	},
	getCourses : function () {
		return rawData.getCourses();
	},
	addLesson : function (lessonName,courseId) {
		var lessons = this.getLessons();
		var lesson = rawData.createLessonObj(lessonName, undefined, courseId);

		//lessons.push(lesson.id);

		this.addLessonToCourse(parseInt(lesson.id),parseInt(courseId));

	},

	addVideo : function (videoName , videoUrl , lessonId) {
		var videos = this.getVideos();
		var video = rawData.createVideoObj(videoName,videoUrl,lessonId) ;
		//videos.push( video);

		this.addVideoToLesson ( parseInt(video.id), parseInt(lessonId) );

	},

	addCourse : function (courseName,courseDes, courseImage) {
		console.log(courseImage);
		var courses = this.getCourses ();

		var course = rawData.createCourseObj(courseName,undefined, courseDes, courseImage);
		console.log(courvideose);
			// courses.push(course);
		},

		

		getCurrentVideoId : function () {
			return videoId;
		},

		

		getCurrentCourseId : function () {
			return courseId;
		},

		

		addVideoToLesson : function (videoId,lessonId) {
			var lessons = this.getLessons();
			lessons[lessonId].videos.push(videoId);
		}

	},

	controller = {
		init : function () {
			viewDisplay.init();
		},

		setToLocalStorage : function (key , value) {
			localStorage.setItem(key,value);
		},

		addLesson : function (lesson,course) {

			model.addLesson (lesson,course);

			this.setToLocalStorage("Lessons" , model.toJSON ( model.getLessons() ) );
			this.setToLocalStorage("Courses" , model.toJSON ( model.getCourses() ) );
		},

		addVideo : function (videoName, videoLink , lesson) {
			
			model.addVideo (videoName, videoLink , lesson);

			this.setToLocalStorage ( "Videos" , model.toJSON (model.getVideos() ) );
			this.setToLocalStorage ("Lessons" , model.toJSON ( model.getLessons() ) );
		},

		addCourse : function (courseName, courseDes , courseImage) {
			console.log (courseImage);
			model.addCourse(courseName, courseDes , courseImage);
			this.setToLocalStorage ("Courses" , model.toJSON ( model.getCourses() ) );
		},

		createCourse : function () {

			var courses = model.getCourses();
			courses.forEach(function (courseElement) {
				viewDisplay.renderCourse (courseElement);
			});
		},

		createLesson : function (courseElement) {
			var lessonIds = courseElement.lessons,
			lessonId;
			var lessons = model.getLessons();
			for (lessonId of lessonIds){
				var lesson = lessons[lessonId] ;
				viewDisplay.renderLesson (lesson);
			}
		},

		createVideo : function (lesson) {
			var videoId;
			var videos = model.getVideos();
			for (videoId of lesson.videos)
			{
				var video = videos[videoId];
				viewDisplay.renderVideo(video);
			}
		}
	},

	viewDisplay = {

		courseListEl : document.getElementById("inner-content"),
		contentBoxEl : document.getElementById("content-box"),
		courseCardEl : document.createElement("div"),
		courseEl : document.createElement("div"),
		lessonContainerEl : document.createElement("div"),
		lessonWrapEl : document.createElement("div"),
		videoContainerEl : document.createElement("div"),
		videoWrapperEl : document.createElement("div"),
		lessonTitleEl : document.createElement("div"),
		modalContainerEl: document.getElementById("modal-container"),

		init : function () {
			this.render();
			this.addHandler();
		},

		setCourseHolders : function () {
			viewDisplay.courseCardEl = document.createElement("div");
			viewDisplay.courseEl = document.createElement("div");
			viewDisplay.lessonContainerEl = document.createElement("div");
		},
		
		addAttributes : function(node, value, content, display , index) {
			node.setAttribute("data-id",value);
			node.setAttribute("data-content",content);
			node.setAttribute("data-shown",display);
			node.setAttribute("data-index",index);
		},

		renderCourse : function (courseElement) {
			
            var arrow = document.createElement("div");
            arrow.setAttribute("class","arrow");
			this.setCourseHolders ();
			this.courseCardEl.setAttribute("class","inner-content__course-card");
            
			this.courseEl.setAttribute("class","inner-content__course-card__course");

			this.addAttributes (this.courseEl , courseElement.getName(), "course" , "false" , courseElement.getId());

			this.courseEl.innerHTML = courseElement.getName() ;
            this.courseCardEl.appendChild(arrow);
			this.courseCardEl.appendChild(this.courseEl);

			this.lessonContainerEl.setAttribute("class","inner-content__course-card__lessons");
			this.lessonContainerEl.innerHTML = "<button class='lesson__add' data-course="+courseElement.getId()+">Add Lesson</button> <div class=\"lesson__add__input-contain\" ><input type=\"text\" id=\"input_new_lesson\"><button class=\"lesson__add_input-contain__button\"data-course="+courseElement.getId()+">Add Lesson</button>";
			
			controller.createLesson(courseElement);

			this.courseCardEl.appendChild(this.lessonContainerEl);
			this.courseListEl.appendChild (this.courseCardEl);
		},

		renderLesson : function (lesson) {

			this.lessonWrapEl = document.createElement("div");
			this.lessonWrapEl.setAttribute("class","lesson-wrapper");
            var arrow = document.createElement("div");
            arrow.setAttribute("class","arrow");             this.lessonWrapEl.appendChild(arrow);
			this.lessonTitleEl = document.createElement("div");
			this.lessonTitleEl.setAttribute("class","lesson-name");

			this.addAttributes(this.lessonTitleEl,lesson.getName(),"lesson","false",lesson.getId());

			this.lessonTitleEl.innerHTML = lesson.getName();
			this.lessonWrapEl.appendChild(viewDisplay.lessonTitleEl);

			this.videoContainerEl = document.createElement("div");
			this.videoContainerEl.setAttribute("class","video-wrapper");
			this.videoContainerEl.innerHTML = "<button class=\"video-add\" data-course="+lesson.getId()+">Add Video</button> <div class=\"video__add__input-contain\" ><input type=\"text\" id=\"input_new_video\"><button class=\"video__add_input-contain__button\"data-lesson="+lesson.getId()+">Add Video</button> ";
			//this.videoWrapperEl.setAttribute("class","video-container");

			controller.createVideo(lesson);
			//console.log(this.videoContainerEl,this.videoWrapperEl);

			this.lessonWrapEl.appendChild(this.videoContainerEl);
			this.lessonContainerEl.appendChild(this.lessonWrapEl);
		},

		renderVideo : function (video) {
			this.videoBox = document.createElement("div");
            var videoBox = document.createElement("div");
            videoBox.setAttribute("class", "video-container");
            //var arrow = document.createElement("div");
            //arrow.setAttribute("class","arrow");
            //videoBox.appendChild(arrow);
			this.videoWrapper = document.createElement("div");
			this.videoWrapper.setAttribute("class","lesson-wrapper__videos");

			this.addAttributes(viewDisplay.videoWrapper,video.getUrl(),"video","false",video.getId());
			this.videoWrapper.innerHTML = video.getName();
            videoBox.appendChild(this.videoWrapper);
            this.videoContainerEl.appendChild(videoBox);
			
		},

		// if i die then it is because of refactoring this function.

		render : function () {
			var that = this,
			str = "<button class=\"course-add\">Add Course</button>";

			that.courseListEl.innerHTML = str;
			controller.createCourse();
		},

		hideHirerachy : function (node , className) {
			var domNodes = node.getElementsByClassName(className);
			Array.prototype.forEach.call(domNodes, function (element) {
				element.style.maxHeight = 0;
                
                element.parentNode.firstChild.style.transform = "rotateX(0deg)";
			});
		},

		addHandler : function () {

			// hopefully this is what delegation is .
			// If not then god help me.
			var that = this;
			this.contentBoxEl.onclick = function(event){
				var target = event.target,
				className = target.className;
				console.log(className);
				switch (className) {
					
					case "inner-content__course-card__course":


					var sibling = target.nextSibling,
 						parent = target.parentNode;
                        
                    parent.firstChild.style.transform = (parent.firstChild.style.transform == "rotateZ(90deg)"?"rotateZ(0deg)":"rotateZ(90deg)");
                        
 					if(sibling) {
 						sibling.style.height = (sibling.clientHeight == 0 ? "auto":"0");
 						that.hideHirerachy(parent, "video-wrapper");
 					}

					break;

					case "lesson-name":
					var sibling = event.target.nextSibling;
                    var par = event.target.parentNode.firstChild;
                        
                        par.style.transform = (par.style.transform == "rotateZ(90deg)"?"rotateZ(0deg)":"rotateZ(90deg)");
                        
                        
					if(sibling) {
                        //console.log(sibling.clientHeight);
						sibling.style.maxHeight = (sibling.clientHeight == 0 ? "221px":"0");
					}
					break;

					case "lesson__add":
						var courseId = target.getAttribute("data-course");
						viewDisplay.displayModal("lesson-modal", courseId);
					break;

					case "video-add":
						console.log("came here");
						var lessonid = target.getAttribute("data-course");
						viewDisplay.displayModal("video-modal" , lessonid);
					break;

					case "course-add":
						viewDisplay.displayModal("course-modal");
					break;
                        
                    case "arrow":
                    
					var sibling = target.nextSibling,
 						parent = target.parentNode;
                        
                    parent.firstChild.style.transform = (parent.firstChild.style.transform == "rotateZ(90deg)"?"rotateZ(0deg)":"rotateZ(90deg)");
                        
 					if(sibling.nextSibling) {
                        
                        if(sibling.className=="inner-content__course-card__course"){
                            console.log("burrah");
                            sibling.nextSibling.style.height = (sibling.nextSibling.clientHeight == 0 ? "auto":"0");
 						     that.hideHirerachy(parent, "video-wrapper");
                        }
                        else if(sibling.className=="lesson-name"){
                            sibling.nextSibling.style.maxHeight = (sibling.nextSibling.clientHeight == 0 ? "221px":"0");
                        }
 						
 					}

					break;
                        
                        
				}
			}
				this.modalContainerEl.onclick = function(event){
					var id = event.target.id,
						target = event.target;
					switch(id){
						case "hide-modal":
							viewDisplay.hideModal(target.parentNode.parentNode.id);
							break;
						case "add-course-button" :
							var courseName = document.getElementById("courseName").value.trim(),
								courseDes = document.getElementById("courseDescription").value.trim(),
								courseImage = document.getElementById("courseImage").value.trim();
							if (courseName && courseDes && courseImage) {
								controller.addCourse(courseName, courseDes , courseImage);
							}
							location.reload();
							break;
						case "add-lesson-button" :
							var lessonName = document.getElementById("lessonName").value.trim();
							var course = target.getAttribute("data-id");
							console.log(course);
							if (lessonName) {
								controller.addLesson(lessonName,course);
							}
							location.reload();
							break;
						case "add-video-button" :
							var videoName = document.getElementById("videoName").value.trim();
							var videoLink = document.getElementById("videoLink").value.trim();
							var lesson = target.getAttribute("data-id");
							console.log (lesson);
							if (videoName && videoLink) {
								controller.addVideo(videoName, videoLink ,lesson);
							}
							location.reload();
							break;
						
					}		

				}
			},
			displayModal: function(id , dataId){
				var dom = document.getElementById(id);
				var button = dom.querySelector(".data-class");
				if (dataId) {
					button.setAttribute("data-id" , dataId);
				}
				document.getElementById(id).style.transform='scale(1)';
				document.getElementById('container').style.opacity=0.2;
			},
			hideModal: function(id){
				document.getElementById(id).style.transform='scale(0)';
				document.getElementById('container').style.opacity=1;
			}
		};

		controller.init();