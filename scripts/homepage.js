var Courses = rawData.getCourses(),
	Lessons = rawData.getLessons(),
	Videos = rawData.getVideos(),
	courseId = rawData.getCourseIndex(),
	lessonId = rawData.getLessonIndex(),
	videoId = rawData.getVideoIndex();


$(function(){

	var model = {
		init: function() {
			if (!Courses){
				localStorageSet("topiclists",complete);
			}			
		},
		getAllTopics: function() {
			return Courses;	
		},
		topicClicked: function(topicID){
			$(location).attr('href', 'lessonCards.html?topic='+topicID);
		},
	};


	var octopus = {
		getAllTopics : function() {
			return model.getAllTopics();
		},
		init : function() {
			model.init();
			view.init(this.getAllTopics,this.topicClicked);
		},
		topicClicked : function(topicID) {
			model.topicClicked(topicID);
		},
	};
	var view = {
		init: function(getAllTopics,topicClicked) {
			this.getAllTopics = getAllTopics;
			this.topicClicked = topicClicked;
			this.contentBox=$('.content-box');
            that = this;
			this.contentBox.on('click',function(event){
				var targetNode = event.target.parentNode;
				if(targetNode.tagName==='BUTTON')
				{
					//console.log(parseInt(targetNode.id));
					return that.topicClicked(parseInt(targetNode.id));
				}
			});
			view.render();
		},
		render: function() {
			var topics=that.getAllTopics(),
			topicDiv=topics.reduce(function(accumulator,topic){
				return accumulator + '<div class="content-box__course-box"><div class="content-box__course-box__course-content">'+
                        '<div class="content-face front-box">'+
                            '<img class="course-image" src='+topic.getImage()+'>'+
                        '</div>'+
                        '<div class="content-face back-box">'+
                            '<p class="content-face__text">'+topic["description"]+'</p>'+
                            '<div class="content-face__bottom"> <button class="content-face__button" id='+ topic.id +'> <div> Learn </div><div></div><div> Learn </div></button> </div>'+

                        '</div>'+
                    '</div>'+
                '</div>'
			},"");
			this.contentBox.append(topicDiv);
		}
	};
	octopus.init();
});