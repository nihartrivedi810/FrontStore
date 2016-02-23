lessonHTML = [];
lessonHTML[0]= ['1cZtdKNB9jo','xIOeccZZ-5g','pyiQD2wZ07g','JsH_eSZGhyg','EsBmDg_edGQ','k_wmXN5V1_c'];
lessonHTML[1]= ['OpiR_euUy8A','oEz3s8JKjYI','VNr1zneQerw','159EzIheI-A','zNXiqfxzzw8','IFqcr0Z9r3Y','IdMgALgC2rM'];
lessonHTML[2]= ['IiJzbXzOdHQ','o5uTBT0HMK8','VAWcLQ19x9Q','_fukWxTy31M','Xv1gLAJAz-U'];
lessonJS = [];
lessonJS[0]=['U-hpXA8g6kM','Mt7y_c4Q2Rs','fgwXXQfKq34','wBQ5Rp_naGE','Kcd8OkwISoA','StZfE4l8fww','n2jeKqJt0OA','Q3aUwnzBMVk'];
lessonJS[1]=['HlEgVe1EZSY','TXJB8QymWkY','I6GtlbTTK1c','Jfprj0kO7Uk','emzhXIGjfQA','kC9sPPglOWI','I3FJPqdHQRQ','obR8E9nOwQc','4nnjOzkKVw4'];





function Course(_name ,_lessons,_id,_description){
	this.name = _name;
	this.lessons = _lessons || [];
	this.id = _id;
	this.description=_description;
}

Course.prototype.getName = function() {
	// body...
	return this.name;
};
Course.prototype.setName = function (n) {
	// body...
	this.name = n;
};

Course.prototype.getLessonIds = function() {
	// body...
	return this.lessons;
};
Course.prototype.addLesson = function (id) {
	// body...
	id = parseInt(i);
	//Array.isArray(lessons)?(id?lessons.push(parseInt(id)):console.log("id incorrect")):(id?(lessons = [id]):console.log("id incorrect"));
	if(id)
	{
		this.videos.push(id);
	}

};
Course.prototype.getId = function() {
	// body...
	return this.id;
};
Course.prototype.setId = function (id) {
	// body...
	return this.id = id;
};




function Lesson(_id,_name,_videos,_courseId){
	this.name = _name;
	this.videos = _videos || [];
	this.id = _id;
	this.courseId = _courseId;
}

Lesson.prototype.getName = function() {
	return this.name;
}
Lesson.prototype.setName = function() {
	return this.name;
}

Lesson.prototype.getVideoIds = function() {
	return this.videos;
}

Lesson.prototype.addVideo = function (id) {

	id = parseInt(id);
	//if (!Array.isArray(this.videos))
	if (id) {
		this.videos.push(id);
	}
	//Array.isArray(this.videos)?(id?this.videos.push(parseInt(id)):console.log("id incorrect")):(id?(this.videos = [].push(id)):console.log("id incorrect"));
	
}

Lesson.prototype.getCourse = function() {
	return this.courseId;
}

Lesson.prototype.setCourse = function(course) {

	if( course instanceof Course)
		this.courseId = course.id;
	if(parseInt(course))
		this.courseId = course;
	else
	{
		console.log(course);
		console.log("lacks valid course identifier");
	}
}


function Video(_id,_url,_lessonId,_note,_pen){
	console.log("inside constructor video");
	console.log(_url);
	this.url = _url;
	this.id = _id;
	this.lessonId = _lessonId;
	this.note = _note;
	this.pen = _pen;

}

Video.prototype.getUrl = function() {
	return this.url;
}
Video.prototype.setUrl = function(_url) {
	return this.url = _url;
}



Video.prototype.getLesson = function() {
	return this.lessonId;
}

Video.prototype.setLesson = function(_lesson) {

	if(  _lesson instanceof Lesson)
		this.lessonId = _lesson.id;
	if(parseInt(_lesson))
		this.lessonId = _lesson;
	else
	{
		console.log(_lesson);
		console.log("lacks valid course identifier");
	}
}

Video.prototype.getNote = function() {
	return this.note;
}
Video.prototype.setNote = function(_note) {
	return this.note = _note;
}

Video.prototype.getPen = function() {
	return this.pen;
}
Video.prototype.setPen = function(_pen) {
	return this.pen = _pen;
}




var complete=[{"topic":"HTML And CSS", "material":{"Intro to HTML and CSS - Basics":lessonHTML[0],"Intro to HTML and CSS - Intermediate":lessonHTML[1],"Intro to HTML and CSS - Advanced":lessonHTML[2]}, "description":"This Course contains all essential information about HTML And CSS.","img":"HTML5.png"},{"topic":"JavaScript", "material":{"JavaScript Basics":lessonJS[0],"Object Oriented Programing in JavaScript":lessonJS[1]},"description":"This Course contains all essential information about JavaScript.","img":"Javascript.png"}];

Courses = [];
Lessons = [];
Videos  = [];
lessonId = 0 ;
videoId =0 ;
courseId = 0;

if (!localStorage.Courses) {
	
	complete.forEach(function (value){
		
		
		var lessons = [];
		
		console.log(value);
		for (lesson in value.material){
			var lessonName = lesson;
			var videos = [];
			
			value.material[lesson].forEach(function(_value){
					Videos.push(new Video(videoId,_value,lessonId));
					videos.push(videoId++);
			});

			Lessons.push(new Lesson(lessonId,lessonName,videos,courseId));
			lessons.push(lessonId);
			lessonId++;
		}
		Courses.push(new Course(value.topic,lessons,courseId,value.description));
		courseId++;
	});
// console.log("aaa",JSON.stringify(Courses.get(parseInt(1))));
	
	
	localStorage.setItem('Courses',JSON.stringify(Courses));
	localStorage.setItem('Lessons',JSON.stringify(Lessons));
	localStorage.setItem('Videos',JSON.stringify(Videos));			
}
else{


	Courses = JSON.parse(localStorage.getItem('Courses'));
	Lessons = JSON.parse(localStorage.getItem('Lessons'));
	Videos = JSON.parse(localStorage.getItem('Videos'));
	courseId =Courses.length; 
	lessonId = Lessons.length;
	videoId = Videos.length;

}


/*c = 
l = 
v = 



console.log(c);
console.log(l);
console.log(v);*/



