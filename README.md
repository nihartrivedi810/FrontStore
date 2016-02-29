# FrontStore
Front end training assignment | Sprinklr

FrontStore ReadMe:

Acts as station for making courses out of the videos available on youtube and imparting training on various subjects, where trainees can make notes and add bins of code . It consist of an hierarchy of courses that has multiple lessons which are further constituted by multiple videos. 

The Store is divided into two types of interfaces:

1.Admin interface:

Enables admin to add courses, lessons to courses and videos to lessons  to the resources for the website.

Go to Account -> Settings which redirects to admin.html. 

Here, courses can be added by clicking “Add course” button.
Clicking the course name reveals the lessons in it along with the “Add lesson” button, on clicking which further the lesson can be added in the corresponding course. Same with the videos inside every lesson.


2.User interface:
	
	User can refer to resources available as videos while making notes and saving pens on jsbin, which are stored user-specifically to with the videos and can be retrieved later. Changes in these notes and bins can be made and are reflected later.
	
	
In sprinklr, this can be handy while imparting training to newcomers, while deploying newer technology for development, or while going back to the usage of some previously referred resource.

INSTALLATION:



Behind the scene:

InterFace:
Website had been modelled  by following the model-view-controller architecture for all the three pages : 
Home Page
           
	Model:
	View:
	Controller:

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
	View: render the courses and to add new courses.
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

