
//Variable declarations for the main screens of our single page app
var landingPageDiv = document.querySelector("#landingPage");
var studentEntryDiv = document.querySelector("#studentEntry");
var professorSignupDiv = document.querySelector("#professorSignup");
var videoPageDiv = document.querySelector("#videoPage");

var studentName = document.querySelector("#studentName");
var professorName = document.querySelector("#professorName");
var callAsStudent= document.querySelector("#callAsStudent");
var requestProfessor = document.querySelector("#requestProfessor");
var requestProfessorForm = document.querySelector("#requestProfessorForm");
var waitingForProfessor = document.querySelector("#waitingForProfessor");
var waitingForProfessorProgress = document.querySelector("#waitingForProfessorProgress");
var professorSignupForm = document.querySelector("#professorSignupForm");
var professorSignupButton = document.querySelector("#professorSignupButton");
var waitingForStudent = document.querySelector("#waitingForStudent");
var professorListing = document.querySelector("#professorListing");
var callProfessor = document.querySelector("#callProfessor");
var callAsProfessor = document.querySelector("#callAsProfessor");



//Join  the application as a student and toggle the div's
callAsStudent.addEventListener('click', function(ev){
	landingPageDiv.style.display = 'none';
	studentEntryDiv.style.display = 'block';
	 professorSignupDiv.style.display = 'none';
	videoPageDiv.style.display = 'none';

	myUserType = "student";
	requestProfessorForm.style.display = 'block';
	waitingForProfessor.style.display = 'none';
	professorListing.style.display = 'none';
	ev.preventDefault();
}, false);
/*First Student enters the application and then professor enters the classroom. After that Student request  the professor to jin the application.
 Student wait for professor to arrive at this point. Signaling code will trigger an update to this view once a professor has arrived */
requestProfessor.addEventListener('click', function(ev){
	requestProfessorForm.style.display = 'none';
	waitingForProfessor.style.display = 'block';
	professorListing.style.display = 'none';

	//The student joins the signaling room in socket.io
	studentUserName = studentName.value || 'no name';
	myName = studentUserName;
	io.emit('signal', {"user_type": "student", "user_name": studentUserName, "user_data": "no data, just a student", "command": "joinroom"});
	console.log("student " + studentUserName + " has joined.");

	ev.preventDefault();
}, false);

//Enter the application as a professor and enter your details.
callAsProfessor.addEventListener('click', function(ev){
	landingPageDiv.style.display = 'none';
	studentEntryDiv.style.display = 'none';
	professorSignupDiv.style.display = 'block';
	videoPageDiv.style.display = 'none';

	myUserType = "professor";
	professorSignupForm.style.display = 'block';
	waitingForStudent.style.display = 'none';
	ev.preventDefault();
}, false);

//Allows the professor to "sign up" by entering their name
professorSignupButton.addEventListener('click', function(ev){

	professorSignupForm.style.display = 'none';
	waitingForStudent.style.display = 'block';
   //The professor joins the signaling room in socket.io
	professorUserName = professorName.value || 'no name';
	myName = professorUserName;
	io.emit('signal', {"user_type": "professor", "user_name": professorUserName,"command": "joinroom"});
	console.log("Dr. " + professorUserName + " has joined.");

	ev.preventDefault();
}, false);

callProfessor.addEventListener('click', function(ev){
	landingPageDiv.style.display = 'none';
	studentEntryDiv.style.display = 'none';
	videoPageDiv.style.display = 'block';

	//Send a signal that the student  is calling
	studentUserName = studentName.value || 'no name';
	io.emit('signal', {"user_type": "student", "user_name": studentUserName, "user_data": "calling Professor", "command": "callprofessor"});
	console.log("student " + studentUserName + " is calling.");

	//Kick off the WebRTC signaling
	//Setup the RTC Peer Connection object
	if (!rtcPeerConn)
	startSignaling1();

	ev.preventDefault();
}, false);


// Change StreamOptions
changeStreamOptions.addEventListener('click',function(ev)
{
mainVideoArea.style.webkitfilter = "grayscale(100%)";
mainVideoArea.style.filter =  "grayscale(100%)";
smallVideoArea.style.webkitfilter = "grayscale(100%)";
smallVideoArea.style.filter =  "grayscale(100%)";
});
