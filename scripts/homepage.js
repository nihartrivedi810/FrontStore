
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
		topicClicked: function(topicID)
		{
			$(location).attr('href', 'lessonCards.html?topic='+topicID);
		}

	};


	var octopus = {
		getAllTopics : function() {
			return model.getAllTopics();
		},
		init : function() {
			model.init();
			view.init();
		},
		topicClicked : function(topicID) {
			model.topicClicked(topicID);
		}
	};


	var view = {
		init: function() {
			this.contentBox=$('.content-box');
			this.contentBox.on('click',function(e){
				if(e.target.parentNode.tagName==='BUTTON')
				{
					console.log(parseInt(e.target.parentNode.id));
					return octopus.topicClicked(parseInt(e.target.parentNode.id));
				}
			});
			view.render();
		},
		render: function() {
			var topics=octopus.getAllTopics(),
			topicDiv=topics.reduce(function(accumulator,topic){
				return accumulator + '<div class="content-box__course-box"><div class="content-box__course-box__course-content">'+
                        '<div class="content-face front-box">'+
                            '<img class="course-image" src="images/HTML5.png">'+
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