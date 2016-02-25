var Courses = rawData.getCourses();
var Lessons = rawData.getLessons();
var Videos = rawData.getVideos();
var courseId = rawData.getCourseIndex();
var lessonId = rawData.getLessonIndex();
var videoId = rawData.getVideoIndex();


var model = {
	init: function(){
		model.topicID = this.getAllParameters()["topic"];
		model.topics = Courses;
	},
	getAllParameters: function(){
		var urlArraySplt1 = (window.location.href).split("?"),
			urlArraySplt2 =urlArraySplt1[1].split("&"),
			parameters = {},
			paramVal;
		urlArraySplt2.forEach(function(parameter){
			paramVal = parameter.split("=");
			parameters[paramVal[0]] = decodeURIComponent(paramVal[1]);
		});
		return parameters;
	}
}
var octopus = {

	init : function () {
		model.init();
		var topicID = model.topicID;
		if(!model.topics||isNaN(topicID)||!model.topics[topicID])
		{
			$(location).attr('href', 'homepage.html');
		}
		view.init();
	},

	getData : function (topicID) {
		var lIds =  model.topics[model.topicID].lessons,
			lessons = lIds.map(function(lId){
				if( Lessons && Lessons[parseInt(lId)])
				{
					return Lessons[parseInt(lId)];
				}
			});
		return lessons;
	},

	setLesson : function (attr) {
		$(location).attr('href', 'videotext.html?topic='+model.topicID+'&lesson='+attr);
	},

	getTopic: function(){
		return model.topics[model.topicID].name;
	},
};

view = {

	init :function () {
		var data = octopus.getData(),
		topicName = $("#topic-name"),
		that = this;
		topicName.html(octopus.getTopic());
		data.forEach (function (val) {
			var template = '<div class = "cards shadow" id = "card_'+val.id+'" data-id = "'+ val.id +'" >'+
			'<div class = "cards__container" data-id = "'+ val.id +'" >'+
			'<div class = "cards__container__content" data-id = "'+ val.id +'" >'+
			'<div class = "content-name" id = "content-name_'+val.id+'" data-id = "'+ val.id +'" >'+ val.name +'</div>'+
			'<div class = "content-info" id = "content-info_'+val.id+'" data-id = "'+ val.id +'" >'+ val.name +'</div>'+
			'</div>'+
			'<i class="fa fa-play-circle-o fa-lg cards__play play-icon" data-id = "'+ val.id +'" ></i>'+
			'</div>'+
			'</div>';
			var dom = document.getElementsByClassName("container")[0],
			contentName,
			contentInfo;
			dom.innerHTML += template;
			dom.onclick=function(event){
				var attr = event.target.getAttribute("data-id");
				octopus.setLesson (attr);
			}
		});
	},
};

octopus.init();