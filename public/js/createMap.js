
	var standardCredits = 3;
	var firstSemester = 1;
	var minCredits = 12;
	var maxCredits = 16;




// Use window.onload for 
window.onload = function() {

	var map = chemistryMap;

	// This function determines the placement of the student based on the placement scores
	var studentStart = setPlacement(map);
	
	// Create Student Paths for Reading, Math, then English
	studentMap.linearPaths.math = CreatePaths(map.linearPaths.mathPath, studentStart.math);
	studentMap.linearPaths.english = CreatePaths(map.linearPaths.engPath, studentStart.english);
	studentMap.linearPaths.reading = CreatePaths(map.linearPaths.rdgPath, studentStart.reading);

		// Add math, english, and reading courses to the master course list
		for( var key in studentMap.linearPaths){
			addtoMasterList(studentMap.linearPaths[key]);
		}

	// function to set the number of semesters and the longest array
	var longPath = determineMaxPath(studentMap.linearPaths);

	if(memberOf("RDG081", studentMap.linearPaths.reading)){
		var numSemesters = longPath.length;
	} 
	else
		numSemesters = longPath.length + 1;


	// Build semester arrays
	var SemObj = studentMap.semesters;
	SemObj = BuildSemesterArrays(numSemesters);

	// Build in the reading path
	BuildSemesters(SemObj, studentMap.linearPaths.reading, firstSemester);

	// if the reading path contains RDG071, make sure the math path starts a semester later
	// Create a function to determine if a course is in an array
	if(memberOf("RDG081", studentMap.linearPaths.reading) && !memberOf("MAT08X", studentMap.linearPaths.math)) {
	 	
	 	// start math during the second semester if they are taking RDG081, but they are not taking MAT08x
	 	BuildSemesters(SemObj, studentMap.linearPaths.math, 2);

	}	
	else
	 	BuildSemesters(SemObj, studentMap.linearPaths.math, firstSemester);

	
	BuildSemesters(SemObj, studentMap.linearPaths.english, 1);

	// Build Course list from linearPaths
	var courseList = grabCourses(SemObj);


	// Place major courses in the student's Map
	studentMap["majorPath"] = chemistryMap.majorCourses;
	
		// determine pre-req for that course
		var preCourses = PreReq(studentMap["majorPath"][0]);
		var start = 0;

		// find which semester the lates prereq. is in
		for(var i = 0; i < preCourses.length; i++) {
			if(findSemester(preCourses[i], SemObj) > start)
				start = findSemester(preCourses[i], SemObj);
		}
		var startMaj = start + 1;

		// add the major courses based on the starting semester once
		// pre-reqs have been met.
		BuildSemesters(SemObj, studentMap.majorPath, startMaj);

	// Update the course list
	courseList = grabCourses(SemObj);

	// Add the required co-reqs to the semester object
	//  Assuming that coReqs are only tied to major courses, reading, math, or english courses
	AddCoReqs(map.coReqs, SemObj);

	// Add recommended co-reqs to the semester object
	//  Assuming that coReqs are only tied to major courses, reading, math, or english courses
	AddCoReqs(map.doubleGreenBars, SemObj);

   	// Put the built semesters in the student map
	studentMap.semesters = SemObj;

	// Count credits.  This updates the student Map with a list of how many are credits
	// are assigned for each semester
	CountCredits(SemObj);

	// Clean -up the Semester object. Take out any undefined courses.
	Clean(SemObj);

	//***** This section of code is determining how the rest of the student map will be completed
	//******
	// Count the remaining credits needed to fulfill program requirements
		var orderedCount = SumArrays(map.orderedCourses);
		var optionsCount = SumNestedObjectKeys(map.courseOptions);

		var numRemainingCourses = orderedCount + optionsCount;
		
		// Determine the number of credit hour spaces for each semester
		var spaces = FindSpots(studentMap.creditHours);
		
		// TODO:  fix this... it just gives a total and does not take into an account 
		// that 3 credits could be split up as 3 separate singlets
		var totalSpaces = SumSpaces(spaces);

		// This returns the semester a particular course belongs to
		var semesterNum = findSemester("CHM152LL", SemObj);

		// Determine the number of semesters needed to add
		var addSem = Math.ceil(((orderedCount + optionsCount) - totalSpaces)/15);

		// Add the correct number of semesters
		if(addSem > 0)
			AddSemesters(addSem, studentMap.semesters);

		// Create a last Courses Object that will fill up with the remaining courses
		var lastCourses = remainingCourses(spaces);
	

		// Integrate lastCourses with the Semester Object
		joinCourses(SemObj, lastCourses);


	// Build Tables for each semester
	BuildTables(Object.keys(SemObj).length);

	// Add Semester Data to the tables to display
	DisplaySemesters(studentMap.semesters);

	// Place early ordered Courses **these courses have no pre-reqs.
	lastCourses = arrayIntoObject(map.orderedCourses.early, lastCourses);
	lastCourses = arrayIntoObject(["test"], lastCourses);

	// var earlyCourses = map.orderedCourses.early;
	var earlyCourses = ["test1", "test2", "test3"];

	for (var i = 0; i < earlyCourses.length; i++) {
		var position = findPosition(SemObj);
		placeCourse(position, earlyCourses[i]);
	}
	
	// Place early dropdowns
		// build the dropdown
		var earlyDropDowns = map.courseOptions.early;

		for(var key in earlyDropDowns){
			var position = findPosition(SemObj);
			
			if(position) 
				// place the dropdown into the webpage
				addDropDown(position, key, earlyDropDowns[key]);
		}

	// Place middle ordered Courses
		// Check pre-reqs.
		console.log
		//lastCourses = arrayIntoObject(map.orderedCourses.middle, lastCourses);
		// Place middle dropdowns 


	// Place late ordered Courses
		//lastCourses = arrayIntoObject(map.orderedCourses.late, lastCourses);
		// Place late dropdowns


	//  this is only working from the student Map
	// TODO: update after dropdown is entered
	DisplayCredits(studentMap);
	


		
	// Temporary Text
	var dropdownMAT09X = "<div class='twelve columns'><select class='u-full-width' id='MAT09X'><option value='Option 1'>MAT090</option>"
         + "<option value='Option 2'>MAT091</option>" + "<option value='Option 3'>MAT092</option>" +
      	"</select></div>";

     var dropdownSB = "<div class='twelve columns'><select class='u-full-width' id='MAT09X'><option value='Option 1'>MAT090</option>"
         + "<option value='Option 2'>MAT091</option>" + "<option value='Option 3'>MAT092</option>" +
      	"</select></div>";

   // $("#semester_1").prepend(dropdown);



} // End of window onload function
// ************ Functions **************************************************//

// This function takes a students placements scores from local storage and 
// then sets the beginning course based on the map
// The English and reading courses are clearly determined from the placement 
// test scores, but the math course has to be determined from the map
function setPlacement(map) {

	// Determine starting math class
	// Turn comma separated list into an array and see if the length is longer than one
	var mathArray = localStorage.getItem("math").split(',');
	if(mathArray.length > 1) {
		// Determine the math course
		for(var i = 0; i < mathArray.length; i++) {
			for (var j = 0; j < map.linearPaths.mathPath.length; j++) {
				if(mathArray[i] == map.linearPaths.mathPath[j])
					var mathCourse = mathArray[i];
			}
			
		}
	}
	else {
		var mathCourse = mathArray[0];
	}

	var studentStart = {
		math: mathCourse,
		reading: localStorage.getItem("reading"),
		english: localStorage.getItem("english")
	}; // end of student object

	return studentStart;
}


// This method takes in a starting place and shortens the path based on where the student begins
function CreatePaths (pathArray, start) {
	// find the starting course in the path array
	var firstIndex = pathArray.indexOf(start); 

	return pathArray.slice(firstIndex);

}

function addtoMasterList (list) {
	studentMap.courseList.push(list);
}

// Determine the longest path in the map
function determineMaxPath (paths) {
	var longestArray = [];
	var maxLength = 0;

	for (var path in paths) {
		if (paths[path].length > maxLength)
			longestArray = paths[path];
			maxLength = longestArray.length;
	}
	return longestArray;
}

function BuildTables (n) {

	for (var i = 0; i < n; i++) {

		var semester = "semester_" + (i + 1);

		var table = $("<table>");
		var header = $("<thead>");
		var row = $("<tr>");
		var title = $("<th>");
		var body = $("<tbody>");

		// create html for list
		var div = $("<div>");
		div.attr('id', semester);
		body.attr('id', semester);

		title.html("Semester " + (i + 1));

		
		// Append row and header to the table
		table.append(header.append(row.append(title)));
		table.append(body);
		table.attr('class', "u-full-width");
		table.attr('class', semester);
		table.attr('class', 'table');
		
		// Append the table to the html page
		$("#tables").append(table);
	}

}

// Build an array that will fill the table based on each semester
function BuildSemesterArrays(n) {
	
	var semesterStructure = {};
	for(var i = 0; i < n; i++) {
		semesterStructure["semester" + (i + 1)] = [];
	}

	return semesterStructure;
}

function BuildSemesters(semObj, path, start) {		

		var i = 0;
		var oldSem = Object.keys(semObj).length;


		// Determine if the new path increases the number of semesters
		var newSem = (start + path.length - 1) - oldSem;
		if(newSem > 0) {
			for (var i = 1; i <= newSem; i++){
				semObj["semester" + (i + oldSem)] = [];
			}
			
		}

		// Starting at semester 1 do everything normal
		if(start == 1) {
			for (var semester in semObj) {

			// If the starting semester is correct
				{
					if(path[i]) {
						semObj[semester].push(path[i]);		
					}
				}
					
				i++;
			} // end of loop

		}

		else {
			var semArray = Object.keys(semObj).map(function(key) 
			{return semObj[key]});

			semArray.splice(0, start - 1);

			for (var j = 0; j < semArray.length; j++) {
				semArray[j].push(path[j]);
			}	
		}
}

function DisplaySemesters(Semesters) {
	
	// Keep record of the semester number
	var j = 1;
 	for (var semester in Semesters) {

		for (var i = 0; i < Semesters[semester].length; i++) {

			var data = Semesters[semester][i];

			var row = $('<tr>');
			var tableData = $('<td>');
			tableData.attr("id", "sem" + j + "course" + (i + 1));
			tableData.append(data);

			$("#semester_" + j).append(row.append(tableData));
		}

		// Increase the semester number
		j++;
		

	}

}

function grabCourses(semObj) {

	var courses = [];
	for (var semester in semObj) {
		for (var i = 0; i < semObj[semester].length; i++) {
			courses.push(semObj[semester][i]);
		}
		
	}
	return courses;
}

// This function searches the course list and determines if the any of the courses in 
// the current list has a co-requisite

function FindCoReqs(list, coreqArray) {

	// search through the first course in the list and determine if it is in
	// the list.  Return and array of pairs of pre-reqs with co-reqs
	var arrayCo = [];
	console.log(list);
	console.log(coreqArray);
	for (var i = 0; i < coreqArray.length; i++) {

		// If the co-req is not in the list, add it to the co-req array
		if(list.indexOf(coreqArray[i][0]) !== -1) {
   			arrayCo.push([coreqArray[i][0], coreqArray[i][1]]);
		}
	}	

	return arrayCo;	
}

	// The first parameter is [[course1, co-req], [course2, co-req], ...]
	// The second semester is the semester object
	// This function will find with semester the first course is in and add the
	// co-requisite
function AddCoReqs(coReqObj, semObj) {

		// Search the semester object for the course
		for (var semester in semObj) {

			// loop through the array
			for (var key in coReqObj) {
				var course = key;
				var coCourse = coReqObj[key];

				// add the course to the semester
				if(semObj[semester].indexOf(course) !== -1) {
   						semObj[semester].push(coCourse);	
				}
			}
			

		}	
}

function CreateDropDown (object) {
	

}

// If the course exists in one of the semesters, then return the semester number.
// Otherwise, return -1.
function findSemester(course, semObj) {
	
	// semester where the course belongs


	// semester number
		var i = 1;

	for (var semester in semObj) {

		// if the semester contains the 
		if(semObj[semester].indexOf(course) !== -1) {
   			return i;			
		}
		i++;
	}

	return -1;
}

// returns true if the array contains the string
function memberOf(string, array) {
	if(array.indexOf(string) !== -1) 
		return true;
	else
		return false;
}

function CountCredits(semesters) {

	var creditHour = {};
	for (var semester in semesters) {
		
		// This is the set of class for the each semester
		var semArray = semesters[semester];

		// This is the set of classes that are NOT 3 credit hours
		var credDefObj = chemistryMap.creditDefinition;
		var numCredits = 0;
		
		// Add the variable number of credits for the non-3-credit hour classes
		// standardCredits = 3;

		for(var i = 0; i < semArray.length; i++) {
			if (semArray[i]) {
				if (semArray[i] in credDefObj)
					numCredits = numCredits + credDefObj[semArray[i]];
				else {
					numCredits = standardCredits + numCredits;
			}				
		}
	}
		studentMap.creditHours["" + semester] = numCredits;
	}
	}

function DisplayCredits(studentMap) {

	var semNum = 1;
	var totalCredits = 0;
	for (var semester in studentMap.creditHours) {

		totalCredits += studentMap.creditHours[semester];
		// semester counter
		var creditHtml = $("<tr>");
		creditHtml.attr("class", "credits");
		creditHtml.append("Credit Hours: " + studentMap.creditHours[semester]);
		$("#semester_" + semNum).append(creditHtml);
		semNum++;
	}

	// var totalHtml = $("<div>");
	// totalHtml.attr("id", "totalCredits");
	// $(totalHtml).html("Total Credit Hours: " + totalCredits);
	// $("#semesters").append(totalHtml);

}

// This functions searches the pre-req list for cross pre-fix courses and
// returns and pre-req courses
// This needs to be updated in case there is more than one pre-req.
function PreReq(course) {
	if(course in chemistryMap.preReqs) {
		preCourses = chemistryMap.preReqs[course];
		return preCourses;
	}
	
}

function Clean(semObj) {
	for (var semester in semObj) {
		for (var i = 0; i < semObj[semester].length; i++) {
			if (!semObj[semester][i]) {
				semObj[semester].splice(i, 1);
			}
		}
	}
}

function FindSpots(semesters) {
	var availability = [];
	for (var semester in semesters) {
		availability.push(Math.floor((maxCredits - semesters[semester])/3));
	}

	for (var i = 0; i < availability.length; i++) {
		availability[i] = availability[i];
	}
	return availability;
}

function SumArrays(object) {
	var sum = 0;
	for (var array in object) {
		sum += object[array].length;
	}

	return sum;
}


function SumNestedObjectKeys(object) {
	var sum = 0;
	for (var time in object) {
		for (var key in object[time]) {
			sum++
		}
	}

	return sum;

}

function SumSpaces(array) {
	var sum = 0;
	for (var i = 0; i < array.length; i++) {
		sum+= array[i];
	}
	return sum;
}


function AddSemesters(number, semesters) {
	var numSemester = 0;

	for (var semester in semesters) {
		numSemester++;
	}
	for (var i = 1; i <= number; i++) {
		semesters["semester" + (i + numSemester)] = [];
	}
}

// spaces is an array that includes the number of courses available in that semester
// This will return an object with the semester number and courses
// newList = {sem1: ["CRE101", "ENG102"], sem2: ["COM225"] }
function remainingCourses(spaces) {
	
	//create semester object to return
	var addSemesters = {};
	for (var i = 0; i < spaces.length; i++) {
		addSemesters["sem" + (i + 1)] = [];
		for(var j = 0; j < spaces[i]; j++) {
			addSemesters["sem" + (i + 1)].push("spot");
		}
	}

	return addSemesters;
}

function joinCourses(semObj, otherObj) {
	var semNum = 1;
	for (var key in semObj) {
		
		if(otherObj["sem" + semNum]) {
			for (var j = 0; j < otherObj["sem" + semNum].length; j++) {
			semObj[key].push(otherObj["sem" + semNum][j]);
		}
		semNum++;
	}
			
	}


}

function arrayIntoObject(array, object) {

	var index = 0;

	for (var key in object) {
		if(array.length > 0) {

			// Run through each semester
			for (var i = 0; i < object[key].length; i++) {
				if(object[key][i] == "spot") {
					object[key] = [array[0]];
					array.shift();
				}
						
			}	
		}
		
	}

	return object;
}

// The position is the [semester, course#]
// The key is the type of courses like CS courses
// The array is the list of choices in the dropdown
function addDropDown(position, key, array) {
	
	var html = ' <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id=' + key + '>' +
			'   <option selected>' + key + '</option>';

	// Create options
	for (var i = 0; i < array.length; i++) {
		var option = '<option value=' + array[i] + '>' + array[i] + '</option>';
		html += option;
	}	

	html += '</select>';				

	$("#sem" + position[0] + "course" + position[1]).html(html);
}

function findPosition(semObj) {
	
	var semester = 1;
	
	//  Loop through all of the keys in the semester object 
	for(var key in semObj) {
		
		// loop through each semester array 
		for (var i = 0; i < semObj[key].length; i++)
			if (semObj[key][i] == "spot") {
				return [semester, i + 1];
		}	
	}

	return false;

}

function placeCourse(position, course) {
	$("#sem" + position[0] + "course" + position[1]).html("new html");
}

// ************ Global Variables **************************************************//

var studentMap = {
	linearPaths: {
		math: [],
		reading: [],
		english: [],
	},

	courseList: [],
	creditHours: {},
	totalCredits: 0,
	semesters: {},

}; // end of paths object




var chemistryMap = {

	title: "CHEMISTRY, No Emphasis, AS, ASU BS Pathway Map",

	// This is the description of the chemistry map
	Pathway_Map_Description: {
		title: "Pathway Map Description",
		description: "The Chemistry Pathway Map contains the 60 to 64 credits needed to satisfy the requirements for the Associate of Science degree.  Additionally, this pathway map satisfies  the majority of requirements for attaining junior standing in the transfer programs listed below.  Because requirements vary by program and institution, students intending to transfer are strongly encouraged to meet with an academic and faculty advisor once they have selected their transfer institution to ensure all requirements for achieving junior standing are satisfied.",
	},

	//  This object includes the Pathway Map Learning Outcomes (PMLOs), The Institutional Student Learning Outcomes (ISLOs),
	//  This object also includes mapping from the PMLOS to the ISLOs
	LearningOutcomes: {
			//  Pathway Map Learning Outcomes (PMLOS)
			Pathway_Map_Learning_Outcomes: [
					"Construct a mathematical description and abstract a mathematical model to draw conclusions concerning physical phenomena.",
					"Using a fundamental understanding of scientific inquiry, solve basic problems within the discipline of chemistry.",
					"Analyze, interpret, and communicate data – and the experimental processes used to generate those data – in formal (e.g. laboratory reports, presentations and models) and informal (e.g. peer discussions, public discourse) discipline specific and cross-disciplinary settings.",
					"Design a procedure that promotes safety and manages risk in a laboratory setting.",
					"Demonstrate professional ethical behavior appropriate to the chemistry discipline that contributes to the benefit of humankind.",
					"Analyze real world problems and synthesize real world solutions applying chemistry theory and principles.",
				],// end of PathwayMapLearning Outcomes for Chemistry

			// Institutional Student Learning Outcoms
			// Mesa Community College:  Four Cs
			Institutional_Student_Learning_Outcomes: {
				Communication: ["Communication", "The purposeful development, expression and reception of a message through oral, written or nonverbal means."],
				Critical_Thinking: ["Critical Thinkin", "The mental process of effectively identifying, determining, gathering, evaluating, and utilizing resources to innovate and/or to accomplish a specific task."],
				Civic_Engagement: ["Civic Engagement", "Encompasses actions to promote the quality of life in a community, through both political and non-political processes."],
				Cultural_and_Global_Engagement: ["Cultural and Global Engagement", "Encompasses the awareness of cultural systems, events, and creations and an ability to apply this cultural and global awareness to human interaction and expression."]
			}, //  end of Institutional Student Learning Outcomes (MCC's four Cs)

			// This is a mapping from the pathway learning outcomes to the institutional outcomes
			// The key in the array will be the PMLO as defined above and the following entries will be 
			// the student learning outcomes.  [one, CT, CO] is mapping the Institutional Learning Outcomes "Communcation"
			// and "Critical Thinking" to PMLO #1
			MapFromPathwayToISLOS: {
				objectDescription: "This is a mapping from the pathway learning outcomes to the institutional outcomes. The key in the array will be the PMLO as defined in chemistryMap.Pathway_Map_Learning_Outcomes and the following entries will be the student learning outcomes (chemistryMap.Institutional_Student_Learning_Outcomes).  [one, CT, CO] is mapping the Institutional Learning Outcomes 'Communcation'and 'Critical Thinking' to PMLO #1",
				one: ["CO", "CT"],
				two: ["CO", "CT"],
				three: ["CO", "CT"],
				four: ["CT"],
				five: ["CO", "CT"],
				six: ["CT", "CE", "CG"],
			}  // end of MapFromPathwayToISLOS:
		},
	// Transfer Degree Options
	Transfer_Institution_Degree_Program_Options: {
		title: "Transfer Institution Degree Program Options",
		introText:  "The Pathway Map for Chemistry satisfies the majority of requirements for attaining junior standing in the following transfer programs:",
		
		// [college, degree1, degree2, ...]
		transferUniversityDegrees: [["Arizona State University", "Chemistry (BS)", "Chemistry (Environmental, BS)"],
									["University of Arizona", "Chemistry (BS)"],
									["Northern Arizona University", "Chemistry (BS, ACS-Emphasis)", "Chemistry (BS, Advanced-Emphasis)"]
									]  
	},

	Job_Types: {
		title: "Job Types",
		description: "The Pathway Map for Chemistry provides much of the foundational coursework required for entry into higher education programs that lead to employment in industry, government, academia and the arts  in the following areas:",
		careers: ["Chemical Technology", "Lab/Industrial Management", "Chemists and Materials Scientists", 
		"Chemical Technicians and Quality Control", "Forensic Science Technicians", "Environmental Scientists and Health Specialists",
		"Chemical Science Law and Policy", "Chemistry Educators and Researchers", "Technical Sales Representative"]
	},

	// Linear Paths
	linearPaths: {
		mathPath: ["MAT08X", "MAT09X", "MAT12X", "MAT15X", "MAT182", "MAT22X", "MAT23X", "MAT24X"],
		engPath: ["ENG081", "ENG091", "ENG101", "ENG102"],
		rdgPath: ["RDG071", "RDG081", "RDG100"]
	},

	majorCourses: ["CHM130", "CHM151", "CHM152", "CHM235", "CHM236"],

	// preRequisites Required "black arrow"
	preReqs: {
		RDG091: "RDG081",
		CRE101: ["RDG100", "ENG101"],
		CHM130: ["MAT09X", "RDG091"],
		CHM151: "MAT15X",
		PHY121: "MAT220",
		PHY131: "MAT23X",
		CHM151: "CHM130",
		CHM152: "CHM151",
		CHM235: "CHM152",
		CHM236: "CHM235"
	},

	// double black arrow - courses must be taken at the same time
	coReqs: {
		CHM130: "CHM130LL",
		CHM151: "CHM151LL", 
		CHM152: "CHM152LL", 
		CHM235: "CHM235LL",
		CHM236: "CHM236LL"
	},

	// coRequisites recommended "green arrows"
	greenArrows: [["ENG102", "CHM151"], ["RDG071", "MAT09X"] ],

	//  equivalent courses
	equivCourses: [["ENG101", "ENG107"], ["ENG102", "ENG108"]],

	// recommended co-requisite "double green bars" Same semester
	// doubleGreenBars: {CHM130: "RDG100"},

	// preferred co-requisites "dashed green arrows" within one semester, same, before or after
	dashedGreenArrows: [["MAT22X", "CHM151"], ["CHM235", "CHM298"], ["CHM236", "CHM298"]],

	// first course followed by replacement courses
	acceleratedOptions: [["MAT187", "MAT15X", "MAT182"]],

	// these are early courses that are not in the major list, reading list, english,
	// or math list
	orderedCourses: {
		early: [],
		middle: ["CRE101"],
		late: ["PHY121", "PHY131"],
	},

	courseOptions: {
		
		// these are early courses that are going to have a drop down associated with them
		early: {
			// This is a list of options for the students to choose from for their path
			csCourses: ["BPC110", "CIS105", "CIS162AB"]
		},

		middle: {
			// This is a list of options for the students to choose from for their path
		
			// COM Recommendations
			comCourses: ["COM100", "COM230", "COM225"],
			sbCourses1: ["ASB100", "COM100", "GCU102", "GCU121", "GCU122"],
			sbCourses2: ["ASB202", "ASB226", "ASB235", "COM230", "COM263", "ECN211", 
						"ECN212", "SOC212", "SOC241", "SSH111"],
			literacyCourses: ["CRE101", "PHI103", "COM225", "ENG111", "ENG215", "IFS201"],
			humCourses1: ["ENG213", "PHI103", "PHI105", "SSH111"]
		},

		late: {
			huCourses2:  ["HIS252", "PHI213", "PHI216", "SSH111"]
		}

	},

	tag: {
		// Oral Communication
		COMM: ["COM100", "COM230", "COM225"],

		// Literacy
		L: ["COM225", "CRE101", "PHI103", "COM225", "ENG111", "ENG215", "IFS201"],

		// Social Behavioral Classes
		SB: ["COM100", "COM230", "SSH111", "ENG213", "ASB100", "COM100", "GCU102", "GCU121", "GCU122",
		"ASB202", "ASB226", "ASB235", "COM230", "COM263", "ECN211", "ECN212", "SOC212", "SOC241", "SSH111"],

		// First-Year Composition
		FYC: ["ENG101", "ENG102"],

		// Math
		MA: ["MAT14X", "MAT15X", "MAT187", "MAT2XX"],

		// Computer Statistics
		CS: ["BPC110", "CIS105", "CIS162AB"],

		// Humanities
		HU:  ["ENG213", "PHI103", "PHI105", "SSH111", "HIS252", "PHI213", "PHI216", "SSH111"],

		// Cultural Awareness
		C: ["ASB202", "COM263", "SOC212", "SOC241"],

		// Global Awareness
		G:  ["ASB100", "GCU102", "GCU121", "GCU122", "COM263", "SSH111"],

		// Historical Awareness
		H: ["ASB202", "ASB226", "ASB235", "HIS252"],

		SQ: ["CHM130", "CHM151", "CHM152", "CHM235", "CHM236", "PHY121", "PHY131"]

	}, // end of tag

	PMLO_Alignment: {
		chem1: ["CIS105", "BPC110", "SOC241", "CHM130", "CHM151", "CHM152", "MAT22X", "MAT15X", "MAT12X",
			"MAT09X", "MAT23X", "MAT24X", "PHY121", "PHY131", "SOC212"], 

		chem2: ["PHI216", "CHM298", "CHM235", "CHM236", "PHI103", "CHM151", "CHM152", "CRE101",
		"ASB226", "COM230"],

		chem3:  ["ENG08X", "ENG09X", "ENG101", "ENG102", "BPC110", "CIS105", "CIS162AB", "ASB100",
		"COM100", "GCU102", "GCU121", "GCU122", "SOC241", "SOC212", "COM263", "COM230", "ASB235",
		"ENG213", "CRE101", "CHM151", "CHM152", "MAT22X", "MAT15X", "COM100", "COM225", "IFS201",
		"ENG215", "MAT23X", "MAT24X", "PHI121", "PHY131", "CHM235", "CHM236", "CHM298"],

		chem4: ["CHM298", "CHM236", "CHM235", "CHM152"],

		chem5: ["GCU122", "GCU121", "ASB100", "SOC241", "COM263", "COM230", "ASB235", "ASB202",
		"ENG102", "ENG101", "CRE101", "SSH111", "PHI105", "PHI103", "CHM151", "MAT22X", "MAT15X",
		"COM230", "PHI203", "CHM235", "CHM236", "CHM298", "PHI213", "PHI216", "SSH111"],

		chem6: ["SSH111", "PHI216", "PHI213", "HIS252", "CHM298", "CHM235", "CHM236", "PHY121",
		"PHY131", "MAT23X", "MAT24X", "PHI103", "PHI105", "MAT15X", "MAT22X", "CHM151", "CHM152", 
		"CRE101", "ASB202", "ASB226", "ASB235", "COM230", "ECN211", "ECN212", "SOC212", "SOC241", "GCU122",
		"GCU121", "GCU102", "ASB100", "ENG101", "ENG102"]
	
	}, // end of PMLO Alignment

	//  These are the main program courses
	BlueCourses: ["CHM130", "CHM151", "CHM152", "CHM235", "CHM236", "CHM298"],

	//  Alignment of Institutional Outcomes to the program courses
	IsloAlignment: {
		CHM130: ["CT"],
		CHM151: ["CT"],
		CHM152: ["CT", "CO"],
		CHM235: ["CT"],
		CHM236: ["CT"],
		CHM298: ["CT", "CO", "CE"]
	}, // end of IsloAlignment

	// Courses ending in X defined
	// CourseDefinitions: {
	// 	MAT08X: [["MAT082", 3], ["MAT081", 4]],
	// 	MAT09X: [["MAT092", 3], ["MAT091", 4], ["MAT090", 5]],
	// 	MAT12X: [["MAT122", 3], ["MAT121", 4], ["MAT120", 5]],
	// 	MAT15X: [["MAT152", 3], ["MAT151", 4], ["MAT150", 5]],
	// 	MAT22X: [["MAT221", 4], ["MAT220", 5]],
	// 	MAT22X: [["MAT231", 4], ["MAT230", 5]],
	// 	MAT24X: [["MAT241", 4], ["MAT240", 5]]
	// },
		CourseDefinitions: {
		MAT08X: [["MAT082", 3], ["MAT081", 4]],
		MAT09X: [["MAT092", 3], ["MAT091", 4], ["MAT090", 5]],
		MAT12X: [["MAT122", 3], ["MAT121", 4], ["MAT120", 5]],
		MAT15X: [["MAT152", 3], ["MAT151", 4], ["MAT150", 5]],
		MAT22X: [["MAT221", 4], ["MAT220", 5]],
		MAT23X: [["MAT231", 4], ["MAT230", 5]],
		MAT24X: [["MAT241", 4], ["MAT240", 5]]
	},

	// non 3 credit hour courses
	creditDefinition: {
		CHM130LL: 1, 
		CHM151LL: 1, 
		CHM152LL: 1,
		CHM235LL: 1,
		CHM236LL: 1,
		PHY121: 4,
		PHY131: 4,
		MAT08X: 4,
		MAT12X: 5,
		MAT15X: 5,
		MAT22X: 5,
		MAT23X: 5,
		MAT24X: 5
	},

	// success courses
	successCourses: ["SuccessCourse", "MAT108"]


}; // end of map
	

