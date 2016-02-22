var octopus = {

	init : function () {
		if(!localStorageGet('topiclists')||!localStorageGet('currentTopic'))
			{
				$(location).attr('href', 'homepage.html');
			}
		view.init();
	},

	getData : function () {
		var topics = localStorageGet('topiclists'),
			idx = parseInt(localStorageGet('currentTopic'));

		return topics[idx].material;
	},

	setLesson : function (attr) {
		localStorageSet('lesson',attr);
		$(location).attr('href', 'index.html');
	}
},

view = {

	init :function () {

		var data = octopus.getData();

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