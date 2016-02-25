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

			lessons.push(lesson.id);

			this.addLessonToCourse(parseInt(lesson.id),parseInt(courseId));
			
		},

		addVideo : function (videoUrl , lessonId) {
			var videos = this.getVideos();
			var video = rawData.createVideoObj(videoUrl,lessonId) ;
			videos.push( video);

			this.addVideoToLesson ( parseInt(video.id), parseInt(lessonId) );
			
		},

		addCourse : function (courseName) {
			var courses = this.getCourses ();
			courses.push(rawData.createCourseObj(courseName));
			
			
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

		addVideo : function (video , lesson) {
			
			model.addVideo (video, lesson);

			this.setToLocalStorage ( "Videos" , model.toJSON (model.getVideos() ) );
			this.setToLocalStorage ("Lessons" , model.toJSON ( model.getLessons() ) );
		},

		addCourse : function (courseName) {

			model.addCourse(courseName);
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
		lessonTitleEl : document.createElement("div"),

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
			
				this.setCourseHolders ();
				this.courseCardEl.setAttribute("class","inner-content__course-card");
		        this.courseEl.setAttribute("class","inner-content__course-card__course");
				
				this.addAttributes (this.courseEl , courseElement.getName(), "course" , "false" , courseElement.getId());
				
				this.courseEl.innerHTML = courseElement.getName() ;
		        this.courseCardEl.appendChild(this.courseEl);
		        
		        this.lessonContainerEl.setAttribute("class","inner-content__course-card__lessons");
				this.lessonContainerEl.innerHTML = "<button class=\"lesson__add\" data-course="+courseElement.getId()+">Add Lesson</button> <div class=\"lesson__add__input-contain\" ><input type=\"text\" id=\"input_new_lesson\"><button class=\"lesson__add_input-contain__button\"data-course="+courseElement.getId()+">Add Lesson</button>";
			
				controller.createLesson(courseElement);

				this.courseCardEl.appendChild(this.lessonContainerEl);
				this.courseListEl.appendChild (this.courseCardEl);
		},

		renderLesson : function (lesson) {
		
			this.lessonWrapEl = document.createElement("div");
        	this.lessonWrapEl.setAttribute("class","lesson-wrapper");

        	this.lessonTitleEl = document.createElement("div");
        	this.lessonTitleEl.setAttribute("class","lesson-name");

        	this.addAttributes(this.lessonTitleEl,lesson.getName(),"lesson","false",lesson.getId());
        	
        	this.lessonTitleEl.innerHTML = lesson.getName();
        	this.lessonWrapEl.appendChild(viewDisplay.lessonTitleEl);

        	this.videoContainerEl = document.createElement("div");
        	this.videoContainerEl.setAttribute("class","video-wrapper");
        	this.videoContainerEl.innerHTML = "<button class=\"video-add\" data-course="+lesson.getId()+">Add Video</button> <div class=\"video__add__input-contain\" ><input type=\"text\" id=\"input_new_video\"><button class=\"video__add_input-contain__button\"data-lesson="+lesson.getId()+">Add Video</button>";

        	controller.createVideo(lesson);

        	this.lessonWrapEl.appendChild(this.videoContainerEl);
		    this.lessonContainerEl.appendChild(this.lessonWrapEl);
		},

		renderVideo : function (video) {
				this.videoWrapper = document.createElement("div");
        		this.videoWrapper.setAttribute("class","lesson-wrapper__videos");
        		
        		this.addAttributes(viewDisplay.videoWrapper,video.getUrl(),"video","false",video.getId());
        		this.videoWrapper.innerHTML = video.getUrl();
        		this.videoContainerEl.appendChild(this.videoWrapper);
		},

		// if i die then it is because of refactoring this function.

		render : function () {
			var that = this,
				str = "<button class=\"course-add\">Add Course</button> <div class=\"course__add__input-contain\" ><input type=\"text\" id=\"input_new_course\"><button class=\"course__add_input-contain__button\">Add Course</button>";
		        
			that.courseListEl.innerHTML = str;
			controller.createCourse();
		},

		addHandler : function () {

			// hopefully this is what delegation is .
			// If not then god help me.

			this.contentBoxEl.onclick = function(event){
				var target = event.target,
					className = target.className;
					console.log(className);
				switch (className) {
					case "inner-content__course-card__course":
					case "lesson-name":
						var sibling = event.target.nextSibling;
						if(sibling)
		    				sibling.style.height = (sibling.clientHeight == 0 ? "auto":"0");
						break;

					case "lesson__add":
						target.style.display = "none";
		    			target.nextSibling.nextSibling.style.height = "auto";
		    			break;

		    		case "lesson__add_input-contain__button":
		    			var lesson = target.parentNode.firstChild.value,
			    			course = target.getAttribute("data-course");

			    		controller.addLesson(lesson,course);
						location.reload();
						break;

					case "video-add":
						target.style.display = "none";
		    			target.nextSibling.nextSibling.style.height = "auto";
		    			break;

		    		case "video__add_input-contain__button":
		    			
			    		var video = event.target.parentNode.firstChild.value,
			    			lesson = event.target.getAttribute("data-lesson");

			    		controller.addVideo(video,lesson);
						location.reload();
						break;

					case "course-add":
						target.style.display = "none";
		    			target.nextSibling.nextSibling.style.height = "auto";
		    			break;

		    		case "course__add_input-contain__button":

		    			var courseName = event.target.parentNode.firstChild.value;

						if(courseName) {
							controller.addCourse(courseName);	
							location.reload();
						}
						break;
				}
			}
		},
	};

	controller.init();