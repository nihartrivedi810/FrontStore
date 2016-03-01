var rawData = (function () {


	var Courses = [],
	Lessons = [],
	Videos  = [],
	lessonId = 0,
	videoId = 0,
	courseId = 0,
	lessonHTML = [],
	lessonJS = [];

	lessonHTML[0]= ['1cZtdKNB9jo','xIOeccZZ-5g','pyiQD2wZ07g','JsH_eSZGhyg','EsBmDg_edGQ','k_wmXN5V1_c'];
	lessonHTML[1]= ['OpiR_euUy8A','oEz3s8JKjYI','VNr1zneQerw','159EzIheI-A','zNXiqfxzzw8','IFqcr0Z9r3Y','IdMgALgC2rM'];
	lessonHTML[2]= ['IiJzbXzOdHQ','o5uTBT0HMK8','VAWcLQ19x9Q','_fukWxTy31M','Xv1gLAJAz-U'];

	lessonJS[0]=['U-hpXA8g6kM','Mt7y_c4Q2Rs','fgwXXQfKq34','wBQ5Rp_naGE','Kcd8OkwISoA','StZfE4l8fww','n2jeKqJt0OA','Q3aUwnzBMVk'];
	lessonJS[1]=['HlEgVe1EZSY','TXJB8QymWkY','I6GtlbTTK1c','Jfprj0kO7Uk','emzhXIGjfQA','kC9sPPglOWI','I3FJPqdHQRQ','obR8E9nOwQc','4nnjOzkKVw4'];

	complete=[{"topic":"HTML And CSS", "material":{"Intro to HTML and CSS - Basics":lessonHTML[0],"Intro to HTML and CSS - Intermediate":lessonHTML[1],"Intro to HTML and CSS - Advanced":lessonHTML[2]}, "description":"This Course contains all essential information about HTML And CSS.","img":"images/HTML5.png"},{"topic":"JavaScript", "material":{"JavaScript Basics":lessonJS[0],"Object Oriented Programing in JavaScript":lessonJS[1]},"description":"This Course contains all essential information about JavaScript.","img":"images/Javascript.png"}];


	var Course = function (name ,lessons,id,description, img){
		this.name = name;
		this.lessons = lessons || [];
		this.id = id;
		this.description=description;
		this.image = img;
	};

	Course.prototype = {
		constructor : Course,
		getName : function() {
			return this.name;
		},

		setName : function (n) {
			this.name = n;
		},

		getLessonIds : function() {
			return this.lessons;
		},

		addLesson : function (id) {
			id = parseInt(id);
			if(id)
			{
				this.videos.push(id);
			}
		},

		getId : function() {
			return this.id;
		},

		setId : function (id) {
			return this.id = id;
		},

		getImage : function (){
			return this.image;
		},

		setImage : function (imageUrl){
			this.iamge = imageUrl;
		}
	};


	var Lesson = function(_id,_name,_videos,_courseId){
		this.name = _name;
		this.videos = _videos || [];
		this.id = _id;
		this.courseId = _courseId;
	};

	Lesson.prototype = {
		constructor : Lesson,
		getName : function() {
			return this.name;
		},

		getId : function () {
			return this.id;
		},

		setName : function() {
			return this.name;
		},

		getVideoIds : function() {
			return this.videos;
		},

		addVideo : function (id) {
			id = parseInt(id);
			if (id) {
				this.videos.push(id);
			}
		},

		getCourse : function() {
			return this.courseId;
		},

		setCourse : function(course) {
			if( course instanceof Course){
				this.courseId = course.id;
			}
			if(parseInt(course))
				this.courseId = course;
			else
			{
				console.log(course);
				console.log("lacks valid course identifier");
			}
		}
	};

	var Video = function (id,url,name,lessonId,note,pen){
		this.url = url;
		this.id = id;
		this.name = name;
		this.lessonId = lessonId;
		this.note = note;
		this.pen = pen;

	};

	Video.prototype = {
		constructor : Video,
		getId : function () {
			return this.id;
		},

		getUrl : function() {
			return this.url;
		},
		setUrl : function(_url) {
			this.url = _url;
			return this;
		},
		getLesson : function() {
			return this.lessonId;
		},
		setLesson : function(_lesson) {
			if(  _lesson instanceof Lesson)
				this.lessonId = _lesson.id;
			if(parseInt(_lesson))
				this.lessonId = _lesson;
			else
			{
				console.log(_lesson);
				console.log("lacks valid course identifier");
			}
		},
		getNote : function() {
			return this.note;
		},
		setNote : function(_note) {
			return this.note = _note;
		},
		getPen : function() {
			return this.pen;
		},
		setPen : function(_pen) {
			return this.pen = _pen;
		}
	};


	var modelCollection =  {

		init : function () {
//TODO index
			var that = this;

			complete.forEach(function (value, index){	
				var lessons = [];
				
				//console.log(value);
				for (lesson in value.material){
					var lessonName = lesson;
					var videos = [];
					
					value.material[lesson].forEach(function(v){
						var name = that._makeName();
						Videos.push(new Video(videoId,v,name,lessonId));
						videos.push(videoId++);
					});

					Lessons.push(new Lesson(lessonId,lessonName,videos,courseId));
					lessons.push(lessonId);
					lessonId++;
				}
				Courses.push(new Course(value.topic,lessons,courseId,value.description,value.img));
				courseId++;
			});

			localStorage.setItem('Courses',JSON.stringify(Courses));
			localStorage.setItem('Lessons',JSON.stringify(Lessons));
			localStorage.setItem('Videos',JSON.stringify(Videos));
		},

		getLocalData : function () {
			return localStorage.Courses;
		},

		_makeName : function () {
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 5; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		},

		render : function () {
	        var obj = JSON.parse(localStorage.getItem('Courses'));

	        obj.forEach (function (course) {
	            Courses.push(new Course(course.name,course.lessons,course.id,course.description,course.image));
	            courseId++;
	        });

	        obj = JSON.parse(localStorage.getItem('Lessons'));
	        obj.forEach (function (lesson) {
	            Lessons.push(new Lesson(lesson.id,lesson.name,lesson.videos,lesson.courseId));
	            lessonId++;
	        });

	        obj = JSON.parse(localStorage.getItem('Videos'));
	        obj.forEach (function (video) {
	            Videos.push(new Video(video.id,video.url,video.name,video.lessonId));
	            videoId++;
	        });
	    }
	}

	var controller = {

		init : function () {
			if (!modelCollection.getLocalData()) {
				modelCollection.init();
			}
			else {
				modelCollection.render();
			}
		}
	}

	controller.init();

	return {
			getCourses : function () {
				return Courses;
			},
			getLessons : function () {
				return Lessons;
			},
			getVideos : function () {
				return Videos;
			},
			getCourseIndex : function () {
				return courseId;
			},
			getVideoIndex : function () {
				return videoId;
			},
			getLessonIndex : function () {
				return lessonId;
			},
			createCourseObj : function (name ,lessons,description,imageUrl) {
				var course = new Course(name ,lessons,courseId++,description);
				Courses.push(course);
				return course;
			},
			createLessonObj : function (name,videos,courseId) {
				var lesson = new Lesson(lessonId++,name,videos,courseId);
				Lessons.push(lesson);
				return lesson;
			},
			createVideoObj : function (url,lessonId) {
				var video = new Video(videoId++,url,lessonId);
				Videos.push(video);
				return video;

			}
	}
	
}());

