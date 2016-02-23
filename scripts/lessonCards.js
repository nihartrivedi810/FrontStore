var model = {
	init: function(){
		model.topicID = model.getParameterByName("topic");
		model.topics = localStorageGet('topiclists');
		//console.log(model.getQueryParams())
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
		if(!localStorageGet('topiclists')||!(/^\d+$/.test(model.topicID))||!model.topics[model.topicID])
		{
			$(location).attr('href', 'homepage.html');
		}
		view.init();
		
	},

	getData : function (topicID) {
		return model.topics[model.topicID].material;
	},

	setLesson : function (attr) {
		localStorageSet('lesson',attr);
		$(location).attr('href', 'index.html');
	},
	getTopic: function(){
		return model.topics[model.topicID]["topic"];
	},
};

view = {

	init :function () {

		var data = octopus.getData();
		var topicName = $("#topic-name");
		topicName.html(octopus.getTopic());
		//TODO appropriate data
		for (val in data) {
			
			var template = document.getElementById("template").cloneNode(true),
			dom = document.getElementsByClassName("container")[0],
			contentName,
			contentInfo;

			this.addId(template, val);
			dom.insertAdjacentHTML('beforeend' ,template.innerHTML );
			
			contentName = document.getElementById("content-name_"+val);
			contentInfo = document.getElementById("content-info_"+val);
			
			contentName.innerHTML = val;
			contentInfo.innerHTML = val;
			this.addHandlers(val);
		};
	},

	addId : function (node,val) {

		var attr = node.getAttribute ("id"),
		that = this,
		children = node.children;

		if (attr) {
			node.setAttribute("id" , attr+"_"+val);
		}
		node.setAttribute ("data-id" , val);

		[].forEach.call(children,function (element) {
			that.addId(element,val);
		});
	},

	addHandlers : function (val) {
		var node = document.getElementById("card_"+val);
		
		node.onclick  = function (e) {
			var attr = e.target.getAttribute("data-id");
			octopus.setLesson (attr);
		};
	}

};

octopus.init();