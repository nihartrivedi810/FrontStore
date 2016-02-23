var data = JSON.parse(localStorage.topiclists),
	courseForm = document.getElementById("course-form"),
	lessonForm = document.getElementById("lesson-form"),
	videoForm = document.getElementById("video-form"),
    courseList = document.getElementById("inner-content"),

	addAttributes = function(node, value, content, display , index) {
		node.setAttribute("data-id",value);
		node.setAttribute("data-content",content);
		node.setAttribute("data-shown",display);
		node.setAttribute("data-index",index);
		//node.innerHTML = value;
	};

	/*hideAllForms = function () {
		courseForm.setAttribute("style" , "display:none;");
		lessonForm.setAttribute("style" , "display:none;");
		videoForm.setAttribute("style" , "display:none;");
	};*/

var printList = function () {

	var cnt = 0;

	//accumulate all the courses and then append them;
	data.forEach (function(courseElement) {

		var courseCard = document.createElement("div");
        courseCard.setAttribute("class","inner-content__course-card");
		var course = document.createElement("div");
        course.setAttribute("class","inner-content__course-card__course");
        
        
		addAttributes( course, courseElement.topic, "course" , "false" , cnt++);
		
		course.innerHTML = courseElement.topic;
        
        courseCard.appendChild(course);
		courseList.appendChild(courseCard);

	});
};

printList();
/*hideAllForms();*/


var createDomHolder = function (dom, holder) {
	var holderNode = document.createElement("div");
	holderNode.setAttribute("id" , holder);
	return holderNode;
}

var hideDom = function (dom) {
    
    console.log(dom.innerHTML);

	dom.setAttribute("data-shown", "false");
    
    
	dom.innerHTML = dom.getAttribute("data-id");
    //console.log(dom.innerHTML);
}

//TODO convert to 
courseList.onclick = function (event) {
	var dom = event.target;

	console.log (dom);
	
	var contentAttr = dom.getAttribute('data-content');
	if (contentAttr == "course") {

		var displayAttr = dom.getAttribute ("data-shown");
		var lessonWrapper = createDomHolder (dom,"lesson-holder");
        
        
        lessonWrapper.setAttribute("class","inner-content__course-card__lessons");
        
		var idx = parseInt(dom.getAttribute("data-index"));
		var lessons = data[idx].material;

		if (displayAttr == "false") {
			
			dom.setAttribute("data-shown", "true");

			for (var lesson in lessons) {
				
                var lessonElement = document.createElement("div");
                lessonElement.setAttribute("class","lesson-name");
                
                addAttributes(lessonElement , lesson , "lesson" , "false" , lesson);
				lessonElement.setAttribute("data-lesson-idx", dom.getAttribute("data-index"));
                lessonElement.innerHTML = lesson;
                
                lessonWrapper.appendChild(lessonElement);
				
			}
			dom.parentNode.appendChild(lessonWrapper);

		} else {
			hideDom(dom);
		}
	}

	else if (contentAttr == "lesson") {
			var displayAttr = dom.getAttribute ("data-shown"),
				videoWrapper = createDomHolder (dom , "video-holder"),
				idx = parseInt(dom.getAttribute("data-lesson-idx")),
				lessons = data[idx].material;
            console.log(idx);
			videoWrapper.setAttribute("class","lesson-wrapper");
			if (displayAttr == "false") {

				dom.setAttribute("data-shown", "true");

				lessons = lessons[dom.getAttribute("data-index")];
				
				lessons.forEach (function (video)  {
					var videoElement = document.createElement("div");
                    videoElement.setAttribute("class","lesson-wrapper__videos");
                    videoElement.innerHTML= video;
					addAttributes (videoElement , video , "video" , "false" , video);
					videoWrapper.appendChild(videoElement);
				});	
				dom.happendChild(videoWrapper);

			} else {
				hideDom(dom);
			}
	}
};

/*
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
*/