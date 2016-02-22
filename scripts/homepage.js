
var HTMLBeginner= ['1cZtdKNB9jo','xIOeccZZ-5g','pyiQD2wZ07g','JsH_eSZGhyg','EsBmDg_edGQ','k_wmXN5V1_c'];
var HTMLIntermediate= ['OpiR_euUy8A','oEz3s8JKjYI','VNr1zneQerw','159EzIheI-A','zNXiqfxzzw8','IFqcr0Z9r3Y','IdMgALgC2rM'];
var HTMLAdvanced= ['IiJzbXzOdHQ','o5uTBT0HMK8','VAWcLQ19x9Q','_fukWxTy31M','Xv1gLAJAz-U'];
var JavascriptBeginner=['U-hpXA8g6kM','Mt7y_c4Q2Rs','fgwXXQfKq34','wBQ5Rp_naGE','Kcd8OkwISoA','StZfE4l8fww','n2jeKqJt0OA','Q3aUwnzBMVk'];
var JavascriptAdvanced=['HlEgVe1EZSY','TXJB8QymWkY','I6GtlbTTK1c','Jfprj0kO7Uk','emzhXIGjfQA','kC9sPPglOWI','I3FJPqdHQRQ','obR8E9nOwQc','4nnjOzkKVw4'];

var complete=[{"topic":"HTML And CSS", "material":{"Intro to HTML and CSS - Basics":HTMLBeginner,"Intro to HTML and CSS - Intermediate":HTMLIntermediate,"Intro to HTML and CSS - Advanced":HTMLAdvanced}, "description":"This Course contains all essential information about HTML And CSS.","img":"HTML5.png"},{"topic":"JavaScript", "material":{"JavaScript Basics":JavascriptBeginner,"Object Oriented Programing in JavaScript":JavascriptAdvanced},"description":"This Course contains all essential information about JavaScript.","img":"Javascript.png"}];

$(function(){

	var model = {
		init: function() {
			if (!localStorageGet("topiclists")){
				localStorageSet("topiclists",complete);
			}			
		},
		getAllTopics: function() {
			//var a=[];
			var topiclists = localStorageGet('topiclists');
			// for(var object in topiclists)
			// {
			// 	a.push(topiclists[object].topic);
			// }

			return topiclists;
		},
		topicClicked: function(topicID)
		{
			localStorageSet('currentTopic',topicID);
			$(location).attr('href', 'lessonCards.html');
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
			view.render();
		},
		render: function() {
			var topics=octopus.getAllTopics();
			for(var i=0;i<topics.length;i++)
			{
				this.contentBox.append('<div class="content-box__course-box"><div class="content-box__course-box__course-content">'+
                        '<div class="content-face front-box">'+
                            '<img class="course-image" src=images/'+topics[i]["img"]+'>'+
                        '</div>'+
                        '<div class="content-face back-box">'+
                            '<p class="content-face__text">'+topics[i]["description"]+'</p>'+
                            '<button class="content-face__button" id='+ i +'>Learn</button>'+
                        '</div>'+
                    '</div>'+
                '</div>');
                $('#'+i).on('click',(function(topicID)
                {
                	return function()
                	{
                		octopus.topicClicked(topicID);	
                	}
                })(i));
			}
		}
	};
	octopus.init();
});