var Courses = dataAPI.getCourses(),
	Lessons = dataAPI.getLessons(),
	Videos = dataAPI.getVideos(),
	courseId = dataAPI.getCourseIndex(),
	lessonId = dataAPI.getLessonIndex(),
	videoId = dataAPI.getVideoIndex(),


	model = {
		init: function(){
			model.topicID = getAllParameters(window.location.href)["topic"];
			model.topics = Courses;
		}
	},

	octopus = {

		init : function () {
			model.init();
			var topicID = model.topicID;
			if(!model.topics||isNaN(topicID)||!model.topics[topicID])
			{
				$(location).attr('href', 'index.html');
			}
			view.init(this.getData,this.getTopic,this.getIdOfLesson,this.getNameOfLesson,this.setLesson);
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
		getIdOfLesson : function (lesson) {
			return lesson.id;
		},
		getNameOfLesson : function (lesson) {
			return lesson.name;
		}
	},

	view = {

		init :function (getData,getTopic,getIdOfLesson,getNameOfLesson,setLesson) {
			
			this.getData = getData;
			this.getTopic = getTopic;
			this.getIdOfLesson = getIdOfLesson;
			this.getNameOfLesson = getNameOfLesson;
			this.setLesson = setLesson;
			that = this;
			var lessons = octopus.getData(),
			topicName = $("#topic-name"),
			dom = $(".container").eq(0), template = "";
			
			topicName.html(octopus.getTopic());
			
			lessons.forEach (function (lesson) {
				template+= '<div class = "cards shadow" id = "card_'+ that.getIdOfLesson(lesson) +'" data-id = "'+ that.getIdOfLesson(lesson) +'" >'+
								'<div class = "cards__container" data-id = "'+ that.getIdOfLesson(lesson) +'" >'+
								'<div class = "cards__container__content" data-id = "'+ that.getIdOfLesson(lesson) +'" >'+
								'<div class = "content-name" id = "content-name_'+ that.getIdOfLesson(lesson) +'" data-id = "'+ that.getIdOfLesson(lesson) +'" >'+ that.getNameOfLesson(lesson) +'</div>'+
								'<div class = "content-info" id = "content-info_'+ that.getIdOfLesson(lesson) +'" data-id = "'+ that.getIdOfLesson(lesson) +'" >'+ that.getNameOfLesson(lesson) +'</div>'+
								'</div>'+
								'<i class="fa fa-play-circle-o fa-lg cards__play play-icon" data-id = "'+ that.getIdOfLesson(lesson) +'" ></i>'+
								'</div>'+
								'</div>';	
			});
			//console.log(template);
			dom.append(template);
			dom.on("click",function(event){
						var attr = event.target.getAttribute("data-id");
						that.setLesson (attr);
					});
		}
	};

octopus.init();