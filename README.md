# FrontStore
Front end training assignment | Sprinklr

FrontStore ReadMe:

Acts as a station for categorizing videos available on youtube into separate courses and imparts training on various subjects, where trainees can make notes and add bins of code . It consist of a list of courses wherein each has multiple lessons which are further constituted of multiple videos. 

The Store is divided into two types of interfaces:

1.Admin interface:

Enables admin to add courses, lessons to courses and videos to lessons as the resources for the website.

Go to Account -> Settings which redirects to the admin page. 

Clicking the course name reveals the lessons in it which when clicked display a list of videos. Each level of hierarchy has either an "Add Course", "Add Lesson" or "Add Video" associated to it depending upon the level of hierarchy.


2.User interface:
	
	The homepage displays a list of courses. User can click on any course to obtain a list of lessons of which it is constituted. Each lesson, which when further clicked, redirects to a page containing the first video under it and a note-writer attached to it. The User can save the notes by clicking on the save button. Jsbin can be embedded using the "Embed Bin" button. The User can refer to/edit the notes and code later if he has saved them. "Change View" interchanges the position of note-writer and Jsbin. 
	
	
In sprinklr, this can be handy while imparting training to newcomers, while deploying newer technology for development, or while going back to the usage of some previously referred resource.

INSTALLATION:



Behind the scene:

InterFace:
Website had been modelled by following the model-view-controller architecture for all the three pages : 
Home Page
           
	Model: Puts data into localstorage.
	View: Initiates model and view.
	Controller: renders the course cards on the homepage.

LessonCards Page
	
	Model: parsing the lessoncard URL for the selected course and making the data available for the page.
	View: show the lessons of the selected course and redirect to the videos page.
	Controller: get appropriate data required by the view and setting the URL for next page.

Video Rendering Page
	Model: 
	View:
	Controller:

Admin Page
	
	Model: get data from raw_data.js and saving new data.
	View: render the courses and add new courses.
	Controller: transferring the inputs to model. Storing the data to localStorage.

     B) Server and Back End:

1.Data Storage:
	The data for server side had been stored locally in localStorage.

	2.Classes and Connections:
		1.Courses:
			consist of fields like
			

2.API for writing/reading data:
	Data-Write:
		Once the website is loaded some static data that is stores in server is stored in local Storage 
	
	





Future scope:
There can be an admin-page button that can navigate admin to a page for admin form. For normal users, this button won’t be visible.

      2.   User profiling can be done and notes can pens corresponding to videos can be  stored

