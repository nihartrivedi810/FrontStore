var model = {
	init: function(){
		model.topicID = parseInt(model.getParameterByName("topic"));

		model.topics = Courses;
		console.log(model.topicID , model.topics);
	},
	getParameterByName: function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	
}
var octopus = {

	init : function () {
		model.init();
		
		//console.log(model.topicID);
		if(!model.topics||(model.topicID !== model.topicID)||!model.topics[model.topicID])
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

		var data = octopus.getData();
		console.log("data is:", data);

		var topicName = $("#topic-name");
		topicName.html(octopus.getTopic());
		//TODO appropriate data
		for (val of data) {
			
			var template = document.getElementById("template").cloneNode(true),
			dom = document.getElementsByClassName("container")[0],
			contentName,
			contentInfo;

			this.addId(template, val.id);
			dom.insertAdjacentHTML('beforeend' ,template.innerHTML );
			
			contentName = document.getElementById("content-name_"+val.id);
			contentInfo = document.getElementById("content-info_"+val.id);
			
			contentName.innerHTML = val.name;
			contentInfo.innerHTML = val.name;
			this.addHandlers(val.id);
		};
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