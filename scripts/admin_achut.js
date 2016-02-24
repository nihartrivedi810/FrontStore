// Intern who is trying to change code here , tumse na hoayega.

var model = {


		toJSON : function (data) {
			return JSON.stringify(data);
		},

		setToLocalStorage : function (key , value) {
			localStorage.setItem(key,value);
		},

		getLessons : function () {
			return Lessons;
		},

		addLessonToCourse : function (courseId) {
			var courses = this.getCourses();
			courses[courseId].lessons.push(this.getCurrentLessonId());
		},

		getCourses : function () {
			return Courses;
		},

		incrementLessonIndex : function () {
			lessonId++;
		},

		getCurrentLessonId : function () {
			return lessonId;
		},

		addLesson : function (lesson,course) {
			var lessons = this.getLessons();
			lessons.push(new Lesson(model.getCurrentLessonId(), lesson, undefined, course));
		},

		addVideo : function (video , lesson) {
			var videos = this.getVideos();
			Videos.push(new Video(model.getCurrentVideoId(),video,lesson)); 
		},

		addCourse : function (courseName) {
			var courses = this.getCourses ();
			courses.push(new Course(courseName,undefined,model.getCurrentCourseId()));
		},

		getVideos : function () {
			return Videos;
		},

		getCurrentVideoId : function () {
			return videoId;
		},

		incrementVideoIndex : function () {
			videoId++;
		},

		getCurrentCourseId : function () {
			return courseId;
		},

		incrementCourseIndex : function () {
			courseId++;
		},

		addVideoToLesson : function (lessonId) {
			var lessons = this.getLessons();
			lessons[lessonId].videos.push(this.getCurrentVideoId());
		}

	},

	controller = {
		init : function () {
			viewDisplay.init();
		},

		addLesson : function (lesson,course) {

			model.addLesson (lesson,course);

			model.setToLocalStorage("Lessons" , model.toJSON ( model.getLessons() ) );
			
			model.addLessonToCourse(parseInt(course));

			model.setToLocalStorage("Courses" , model.toJSON ( model.getCourses() ) );
			
			model.incrementLessonIndex();

		},

		addVideo : function (video , lesson) {
			
			model.addVideo (video, lesson);
			
			model.setToLocalStorage ( "Videos" , model.toJSON (model.getVideos() ) );
		
			model.addVideoToLesson ( parseInt(lesson) );

			model.setToLocalStorage ("Lessons" , model.toJSON ( model.getLessons() ) );
			
			model.incrementVideoIndex();

		},

		addCourse : function (courseName) {

			model.addCourse(courseName);

			model.incrementCourseIndex();

			model.setToLocalStorage ("Courses" , model.toJSON ( model.getCourses() ) );

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
			for (lessonId of lessonIds){
				var lesson = Lessons[lessonId];
				viewDisplay.renderLesson (lesson);
			}
		},

		createVideo : function (lesson) {
			var videoId;
			for (videoId of lesson.videos)
        	{
        		var video = Videos[videoId];
        		viewDisplay.renderVideo(video);
        	}
		}
	},

	viewDisplay = {

		courseList : document.getElementById("inner-content"),
    	contentBox : document.getElementById("content-box"),
    	courseCard : document.createElement("div"),
		course : document.createElement("div"),
		lessonContainer : document.createElement("div"),
		lessonWrap : document.createElement("div"),
		videoContainer : document.createElement("div"),
		lessonTitle : document.createElement("div"),

    	init : function () {
    		this.render();
    		this.addhandler();
    	},

    	setCourseHolders : function () {
    		viewDisplay.courseCard = document.createElement("div");
			viewDisplay.course = document.createElement("div");
			viewDisplay.lessonContainer = document.createElement("div");
    	},
		
		addAttributes : function(node, value, content, display , index) {
			node.setAttribute("data-id",value);
			node.setAttribute("data-content",content);
			node.setAttribute("data-shown",display);
			node.setAttribute("data-index",index);
		},

		renderCourse : function (courseElement) {
			
				this.setCourseHolders ();
				this.courseCard.setAttribute("class","inner-content__course-card");
		        this.course.setAttribute("class","inner-content__course-card__course");
				
				this.addAttributes (this.course , courseElement.getName(), "course" , "false" , courseElement.getId());
				
				this.course.innerHTML = courseElement.getName() ;
		        this.courseCard.appendChild(this.course);
		        
		        this.lessonContainer.setAttribute("class","inner-content__course-card__lessons");
				this.lessonContainer.innerHTML = "<button class=\"lesson__add\" data-course="+courseElement.getId()+">Add Lesson</button> <div class=\"lesson__add__input-contain\" ><input type=\"text\" id=\"input_new_lesson\"><button class=\"lesson__add_input-contain__button\"data-course="+courseElement.getId()+">Add Lesson</button>";
			
				controller.createLesson(courseElement);

				this.courseCard.appendChild(this.lessonContainer);
				this.courseList.appendChild (this.courseCard);
		},

		renderLesson : function (lesson) {
		
			this.lessonWrap = document.createElement("div");
        	this.lessonWrap.setAttribute("class","lesson-wrapper");

        	this.lessonTitle = document.createElement("div");
        	this.lessonTitle.setAttribute("class","lesson-name");

        	this.addAttributes(this.lessonTitle,lesson.getName(),"lesson","false",lesson.getId());
        	
        	this.lessonTitle.innerHTML = lesson.getName();
        	this.lessonWrap.appendChild(viewDisplay.lessonTitle);

        	this.videoContainer = document.createElement("div");
        	this.videoContainer.setAttribute("class","video-wrapper");
        	this.videoContainer.innerHTML = "<button class=\"video-add\" data-course="+lesson.getId()+">Add Video</button> <div class=\"video__add__input-contain\" ><input type=\"text\" id=\"input_new_video\"><button class=\"video__add_input-contain__button\"data-lesson="+lesson.getId()+">Add Video</button>";

        	controller.createVideo(lesson);

        	this.lessonWrap.appendChild(this.videoContainer);
		    this.lessonContainer.appendChild(this.lessonWrap);
		},

		renderVideo : function (video) {
				this.videoWrapper = document.createElement("div");
        		this.videoWrapper.setAttribute("class","lesson-wrapper__videos");
        		
        		this.addAttributes(viewDisplay.videoWrapper,video.getUrl(),"video","false",video.getId());
        		this.videoWrapper.innerHTML = video.getUrl();
        		this.videoContainer.appendChild(this.videoWrapper);
		},

		// if i die then it is because of refactoring this function.

		render : function () {
			var that = this,
				str = "<button class=\"course-add\">Add Course</button> <div class=\"course__add__input-contain\" ><input type=\"text\" id=\"input_new_course\"><button class=\"course__add_input-contain__button\">Add Course</button>";
		        
			that.courseList.innerHTML = str;
			controller.createCourse();
		},

		addhandler : function () {

			// hopefully this is what delegation is .
			// If not then god help me.

			this.contentBox.onclick = function(event){
				var target = event.target,
					className = target.className;

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