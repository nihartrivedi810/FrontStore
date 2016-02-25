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
		console.log(model.topicID , model.topics);
	},
	getAllParameters: function(){
		var urlArraySplt1 = (window.location.href).split("?");
		var urlArraySplt2 =urlArraySplt1[1].split("&");
		var parameters = {};
		var paramVal;
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
		
		//console.log(model.topicID);
		var topicID = model.topicID;
		if(!model.topics||isNaN(topicID)||!model.topics[topicID])
		{
			//console.log("should not go here : ",model.topics , model.topicID, model.topics[model.topicID]);
			$(location).attr('href', 'homepage.html');
		}
		view.init();
		
	},

	getData : function (topicID) {
		
		var lIds =  model.topics[model.topicID].lessons;
		var lessons = lIds.map(function(lId){
			if( Lessons && Lessons[parseInt(lId)])
			{
				return Lessons[parseInt(lId)];
			}
		});

		return lessons;
	},

	setLesson : function (attr) {
		
		//console.log(model.topicID,attr);
		$(location).attr('href', 'index.html?topic='+model.topicID+'&lesson='+attr);
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

		console.log("data is:", data);
		topicName.html(octopus.getTopic());
		//TODO appropriate data

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

			//that.addId(template, val.id);
			dom.innerHTML += template;

			//dom.insertAdjacentHTML('beforeend' ,template.innerHTML );
			
			// contentName = document.getElementById("content-name_"+val.id);
			// contentInfo = document.getElementById("content-info_"+val.id);
			
			// contentName.innerHTML = val.name;
			// contentInfo.innerHTML = val.name;
			that.addHandlers(val.id);
		});
	},

	addId : function (node,id) {

		var attr = node.getAttribute ("id"),
		that = this,
		children = node.children;

		if (attr) {
			node.setAttribute("id" , attr+"_"+id);
		}
		node.setAttribute ("data-id" , id);

		[].forEach.call(children,function (element) {
			that.addId(element,id);
		});
	},

	addHandlers : function (id) {
		var node = document.getElementById("card_"+id);
		
		node.onclick  = function (e) {
			var attr = e.target.getAttribute("data-id");
			octopus.setLesson (attr);
		};
	}

};

octopus.init();