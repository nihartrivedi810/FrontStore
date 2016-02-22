var data = JSON.parse(localStorage.topiclists),
	courseForm = document.getElementById("course-form"),
	lessonForm = document.getElementById("lesson-form"),
	videoForm = document.getElementById("video-form"),

	addAttributes = function(node, value, content, display , index) {
		node.setAttribute("data-id",value);
		node.setAttribute("data-content",content);
		node.setAttribute("data-shown",display);
		node.setAttribute("data-index",index);
		node.innerHTML = value;
	},

	hideAllForms = function () {
		courseForm.setAttribute("style" , "display:none;");
		lessonForm.setAttribute("style" , "display:none;");
		videoForm.setAttribute("style" , "display:none;");
	};

var retrieve = function () {

	var jList = document.getElementById("list");

	var cnt = 0;

	//accumulate all the courses and then append them;
	data.forEach (function(course) {

		var jDiv = document.createElement("div");
		
		addAttributes (jDiv , course.topic, "course" , "false" , cnt++);
		
		jDiv.innerHTML = course.topic;
		jList.appendChild (jDiv);

	});
};

retrieve();
hideAllForms();

var jList = document.getElementById("list");


var boo = function (dom, holder) {
	var holderNode = document.createElement("div"); //
	
	dom.setAttribute("data-shown", "true"); // 
	holderNode.setAttribute("id" , holder); //
	return holderNode;
}

var hideDom = function (dom) {
	dom.setAttribute("data-shown", "false");
	dom.innerHTML = dom.getAttribute("data-id");
}

//TODO convert to 
jList.onclick = function (event) {
	var dom = event.target;

	console.log (event.target.parentNode);
	
	var contentAttr = dom.getAttribute('data-content');
	if (contentAttr == "course") {

		var displayAttr = dom.getAttribute ("data-shown");
		var jDiv = boo (dom,"lesson-holder");
		var idx = parseInt(dom.getAttribute("data-index"));
		var lessons = data[idx].material;

		if (displayAttr == "false") {
			for (var lesson in lessons) {
				var lessonNode = document.createElement("div");
				addAttributes (lessonNode , lesson , "lesson" , "false" , lesson);
				lessonNode.setAttribute("data-lesson-idx" , dom.getAttribute("data-index"));
				jDiv.appendChild(lessonNode);
			}
			dom.appendChild(jDiv);

		} else {
			hideDom(dom);
		}
	}

	else if (contentAttr == "lesson") {
			var displayAttr = dom.getAttribute ("data-shown");
			var jDiv = boo  (dom , "video-holder");
			var idx = parseInt(dom.getAttribute("data-lesson-idx")); 
			var lessons = data[idx].material;

			if (displayAttr == "false") {
				lessons = lessons[dom.getAttribute("data-index")];
				lessons.forEach (function (video)  {
					var videoNode = document.createElement("div");
					addAttributes (videoNode , video , "video" , "false" , video);
					jDiv.appendChild(videoNode);
				});	
				dom.appendChild(jDiv);

			} else {
				hideDom(dom);
			}
	}
};


var addButton = document.getElementById("add-buttons");


//which is better ? write Html or create doms ?
addButton.onclick = function (event) {
	var dom = event.target;
	var attr = dom.getAttribute ("id");

	hideAllForms();

	//refresh the data
	data = JSON.parse(localStorage.topiclists);
	switch (attr) {
		case "course-button":
			courseForm.setAttribute("style" , "display:block;");
			break;

		case "lesson-button":
			lessonForm.setAttribute("style" , "display:block;");
			addCoursesOptions("course-lesson-option");
			break;

		case "video-button":
			videoForm.setAttribute("style" , "display:block;");
			addCoursesOptions("course-video-option");
			updateOptions();
			break;
	}
}

var courseSubmit = document.getElementById("submit-course");

courseSubmit.onclick = function () {
	var courseName = document.getElementById("add-course").value;
	
	if(courseName) {
		console.log ("added " +courseName);
	}
	return false;
}

var lessonSubmit = document.getElementById("submit-lesson");

lessonSubmit.onclick = function () {
	var course = getSelectedOption("course-lesson-option"),
		lesson = getInputValue("add-lesson");
	
	console.log (course + " " + lesson);
	return false;
}

var videoSubmit = document.getElementById("submit-video");

videoSubmit.onclick = function () {
	var course = getSelectedOption("course-video-option"),
		lesson = getSelectedOption("lesson-video-option"),
		video = getInputValue("add-video");

	console.log (course + " " + lesson + " " + video);
	return false;
}

var getSelectedOption = function (id) {
	var dom = document.getElementById(id);
	return dom.options[dom.selectedIndex].text;
};

var getInputValue = function (id) {
	return document.getElementById(id).value;
};

var addCoursesOptions = function (domId) {
	var courseDom = document.getElementById(domId),
		docFrag = document.createDocumentFragment();
		courseDom.innerHTML = "";

		data.forEach (function(course) {
			var jOption = document.createElement("option");
				jOption.setAttribute("value" , course.topic);

			jOption.innerHTML = course.topic;
			docFrag.appendChild(jOption);
		});
		courseDom.appendChild (docFrag);
};

var courseVideo = document.getElementById("course-video-option");

var updateOptions = function () {

	var value = getSelectedOption("course-video-option");
	var lessonDom = document.getElementById("lesson-video-option"),
		docFrag = document.createDocumentFragment();
	lessonDom.innerHTML = "";

	data.forEach (function (course) {
		if (course.topic == value) {
			var lessons = course.material;

			for (var lesson in lessons) {
				var jOption = document.createElement("option");
					
				jOption.setAttribute("value" , lesson);

				jOption.innerHTML = lesson;
				docFrag.appendChild(jOption);
				
			}
			lessonDom.appendChild (docFrag);
		}
	});
};

courseVideo.onchange = updateOptions;
