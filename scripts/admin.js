var data = JSON.parse(localStorage.topiclists);
console.log(data);
var controller = {
    init: function(){
        
    },
    
    getCourseList: function(){
        var courses = [];
        for(var course in data){
            courses.push(data[course].topic);
        }
        return courses;
    },
    
    getNumberOfSubTopics: function(){
        var count = [];
        for(var course in data){
            count.push(data[course].material.size);
        }
        
        return count;
    },
    
    getSubTopics: function(){
        
        var material = [];
        
        for(var topic in data){
            material.push(data[topic].material);
        }
        
        return material;
    }
};

var view = {
  
    init: function(){
        var courseList = controller.getCourseList(),
            topicList = controller.getSubTopics(),
            numberOfTopics = controller.getNumberOfSubTopics(),
            list = document.createElement("div"),
            addCourseBtn = document.createElement("button"),
            mainContainer = document.getElementById("content-box"),
            courseCardWrapper,
            courseBox,
            courseName,
            courseBtn,
            lessonWrapper,
            addLessonBtn = document.createElement("button"),
            lessonBox,
            lessonName,
            lessonBtn;
        console.log(numberOfTopics);
        list.setAttribute("class","inner-content");
        addCourseBtn.setAttribute("class","course-add");
        addCourseBtn.innerHTML = "Add Course";
        list.appendChild(addCourseBtn);
        var count = 0;
        for(var obj in courseList){
            courseCardWrapper = document.createElement("div");
            courseCardWrapper.setAttribute("class","inner-content__course-card");
            courseBox = document.createElement("div");
            courseBox.setAttribute("class","inner-content__course-card__course");
            courseName = document.createElement("p");
            courseName.setAttribute("class","inner-content__course-card__course--textbox");
            courseBtn = document.createElement("button");
            courseBtn.setAttribute("class","inner-content__course-card__course--button");
            courseBtn.innerHTML = "Edit";
            
            courseName.innerHTML = courseList[obj];
            courseBox.appendChild(courseName);
            courseBox.appendChild(courseBtn);
            courseCardWrapper.appendChild(courseBox);
            lessonWrapper = document.createElement("div");
            lessonWrapper.setAttribute("class","inner-content__course-card__lessons");
            addLessonBtn.setAttribute("class","lesson__add");
            addLessonBtn.innerHTML = "Add Lesson";
            lessonWrapper.appendChild(addLessonBtn);
            for(var topic in topicList[count]){
                console.log(topic.length);
                lessonBox = document.createElement("div");
                lessonBox.setAttribute("class","lesson-name");
                lessonName = document.createElement("p");
                lessonName.setAttribute("class","lesson-name--textbox");
                
                lessonBtn = document.createElement("button");
                lessonBtn.setAttribute("class","lesson-name--button");
                lessonBtn.innerHTML = "Edit";
                lessonBox.appendChild(lessonName);
                lessonBox.appendChild(lessonBtn);
                lessonWrapper.appendChild(lessonBox);
            }
            lessonWrapper.appendChild(courseCardWrapper);
            list.appendChild(courseCardWrapper);
            count++;
        }
        
        mainContainer.appendChild(list);
        
        
    }
};

view.init();