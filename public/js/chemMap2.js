
// Use window.onload for 
window.onload = function() {

	var map = chemistryMap;
	
	// Take in student input
	
	// Create Student Paths for Math, English, Reading, and Major
		studentMap.linearPaths.math = CreatePaths(map.linearPaths.mathPath, studentStart.math);
		studentMap.linearPaths.english = CreatePaths(map.linearPaths.engPath, studentStart.english);
		studentMap.linearPaths.reading = CreatePaths(map.linearPaths.rdgPath, studentStart.reading);

		// Add courses to the master course list
		for( var key in studentMap.linearPaths){
			addtoMasterList(studentMap.linearPaths[key]);
		}

	// function to set the number of semesters and the longest array
	var firstPath = determineMaxPath(studentMap.linearPaths);
	var numSemesters = firstPath.length;

	// Build Tables for each semester
	BuildTables(numSemesters);

	// Build semester arrays
	var SemObj = BuildSemesterArrays(numSemesters);

	// Check pre-reqs and move courses accordingly
	//******* to Be Written ********//////
	console.log(chemistryMap.linearPaths);

	// Place courses from the linear Paths into the Semester Array
	for (var path in studentMap.linearPaths) {
		BuildSemesters(SemObj, studentMap.linearPaths[path]);
	}

	// Build Course list from SemArray
	var courseList = grabCourses(studentMap.linearPaths);

	// Check co-requisites and re-organize
	var coReqArray = FindCoReqs(courseList, chemistryMap.coReqs);
	var preReqArray = FindCoReqs(courseList, chemistryMap.preReqs);
	console.log(preReqArray);
	
	// Add co-reqs to the semesters
	AddCoReqs(coReqArray, SemObj);
	//AddCoReqs(preReqArray, SemObj);

	// parameter is a set of drop downs
	CreateDropDown(chemistryMap.CourseDefinitions);

	// Add Early courses to the semester
		// Find the early courses that are not yet placed

		// Place the list of early courses
			// Find the number of spaces in semester 1, 2, 3, etc.
			// Place the courses and empty the early courses array
			// Add choices in terms of a drop down menu
			// Place choice from the drop down into the semester array

	// Check co-requisites and re-organize

	// Add Mid courses to the semester
		// Find the mid courses that are not yet placed 
		// Place the list of mid courses
			// Find the number of spaces in semester 1, 2, 3, etc.
			// Place the courses in the semester array and empty the mid courses array
			// Add choices in terms of a drop down menu
			// Place choice from the drop down into the semester array


	// Check pre-requisites and re-organize
	// Check co-requisites and re-organize

	// Add Late courses to the semester
		// Find the late courses that are not yet placed 
		// Place the list of late courses
			// Find the number of spaces in semester 1, 2, 3, etc.
			// Place the courses in the semester array and empty the late courses array
			// Add choices in terms of a drop down menu
			// Place choice from the drop down into the semester array

	// Check pre-requisites and re-organize
	// Check co-requisites and re-organize

	// Create dropdown for MAT courses
	// Calculate Credits
	// Display the number of credits

	// Allow students to adjust number of credits
	// Re-organize courses
	
	// Add Semester Data to the tables to display
	DisplaySemesters(SemObj);

	// This returns the semester a particular course belongs to
	var semesterNum = findSemester("CHM152LL", SemObj);
	console.log(semesterNum);

	// Remove courses from the course List


	// Add in Early Classes


		
	// Temporary Text
	var dropdownMAT09X = "<div class='twelve columns'><select class='u-full-width' id='MAT09X'><option value='Option 1'>MAT090</option>"
         + "<option value='Option 2'>MAT091</option>" + "<option value='Option 3'>MAT092</option>" +
      	"</select></div>";

     var dropdownSB = "<div class='twelve columns'><select class='u-full-width' id='MAT09X'><option value='Option 1'>MAT090</option>"
         + "<option value='Option 2'>MAT091</option>" + "<option value='Option 3'>MAT092</option>" +
      	"</select></div>";

   // $("#semester_1").prepend(dropdown);

}
// ************ Methods **************************************************//

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

	console.log(paths);

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
		var list = $("<ul>");
		div.attr('id', semester);
		list.attr('class', "list");

		title.html("Semester " + (i + 1));

		
		// Append row and header to the table
		table.append(header.append(row.append(title)));
		table.append(body.append(div.append(list)));
		table.attr('class', "u-full-width");
		table.attr('class', semester);
		
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

function BuildSemesters(semObj, path) {		

		var i = 0;
		for (var semester in semObj) {
			if(path[i]) {
				semObj[semester].push(path[i]);			
			}

			i++;
		}

	return semObj;	
}

function DisplaySemesters(Semesters) {
	
	var i = 1;
 	for (var semester in Semesters) {

			var semesterId = "semester_" + i;
			var options = {
		  		valueNames: [ 'course' ],
		  		item: '<li><p class="course"></p></li>'
			};

			var values = [];

			for (var j = 0; j < Semesters[semester].length; j++) {
				values.push({ course: Semesters[semester][j] });

			}

			var HackList = new List(semesterId, options, values);
		i++;
	}

}

function grabCourses(paths) {
	var courses = [];
	for (var path in paths) {
		for (var i = 0; i < paths[path].length; i++) {
			courses.push(paths[path][i]);
		}
	}

	return courses;
}

// This function searches the course list and determines if the any of the courses in 
// the current list has a co-requisite

function FindCoReqs(list, coreqArray) {

	// search through the first course in the list and determine if it is in
	// the list.  If so, add the co-requisite course to the course list, if it 
	// is not there.
	var arrayCo = [];
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
function AddCoReqs(array, semObj) {
	
		// These are courses in the list that have a co-requisite
		// var course = array[i][0];
		// console.log(course);

		// Search the semester object for the course
		for (var semester in semObj) {

			// loop through the array
			for (var i = 0; i < array.length; i++) {
				var course = array[i][0];
				var coCourse = array[i][1];

				// add the course to the semester
				if(semObj[semester].indexOf(course) !== -1) {
   						semObj[semester].push(coCourse);	
				}
			}
			
		}	
}

function CreateDropDown (object) {
	console.log(object);

}

// If the course exists in one of the semesters, then return the semester number.
// Otherwise, return -1.
function findSemester(course, semObj) {
	
	// semester where the course belongs
	console.log(course);

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

// ************ Global Variables **************************************************//

var studentMap = {
	linearPaths: {
		math: [],
		reading: [],
		english: [],
	},

	courseList: []
}; // end of paths object

var studentStart = {
	math: "MAT09X",
	reading: "RDG100",
	english: "ENG101"
}; // end of student object

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
		mathPath: ["MAT08X", "MAT09X", "MAT12X", "MAT15X", "MAT22X", "MAT23X", "MAT24X"],
		engPath: ["ENG08X", "ENG09X", "ENG101", "ENG102"],
		rdgPath: ["RDG071", "RDG081", "RDG100"]
	},

	majorCourses: ["CHM130", "CHM151", "CHM152", "CHM235", "CHM236"],

	// preRequisites Required "black arrow"
	preReqs: [["RDG100", "CRE101"], ["MAT09X", "CHM130"], ["MAT15X", "CHM151"], ["MAT220", "PHY121"],
				["MAT23X", "PHY131"], ["CHM130", "CHM151"], ["CHM151", "CHM152"], ["CHM152", "CHM235"],
				["CHM235", "CHM236"]],

	// double black arrow - courses must be taken at the same time
	coReqs: [["CHM130", "CHM130LL"], ["CHM151", "CHM151LL"], ["CHM152", "CHM152LL"], ["CHM235", "CHM235LL"], ["CHM236", "CHM236LL"]],

	// coRequisites recommended "green arrows"
	greenArrows: [["ENG102", "CHM151"] ],

	//  equivalent courses
	equivCourses: [["ENG101", "ENG107"], ["ENG102", "ENG108"]],

	// recommended co-requisite "double green bars" Same semester
	doubleGreenBars: [["CHM130", "RDG100"]],

	// preferred co-requisites "dashed green arrows" within one semester, same, before or after
	dashedGreenArrows: [["MAT22X", "CHM151"], ["CHM235", "CHM298"], ["CHM236", "CHM298"]],

	// first course followed by replacement courses
	acceleratedOptions: [["MAT187", "MAT15X", "MAT182"]],

	earlyCourses: {
		earlyMath: ["MAT08X", "MAT09X", "MAT12X"],
		earlyEng: ["ENG08X", "ENG09X", "ENG101"],
		earlyRdg: ["RDG071", "RDG081", "RDG100"],
		earlyChem: ["CHM130"],
		
		// This is a list of options for the students to choose from for their path
		earlyGenEds: {
			csCourses: ["BPC110", "CIS105", "CIS162AB"],
		}
	},

	midCourses: {
		midMath: ["MAT15X", "MAT22X"],
		midEng: ["ENG102"],
		midChem: ["CHM151", "CHM152"],
		midRdg: ["CRE101"],

		// This is a list of options for the students to choose from for their path
		midGenEds: {
			// COM Recommendations
			comCourses: ["COM100", "COM230", "COM225"],
			sbCourses1: ["ASB100", "COM100", "GCU102", "GCU121", "GCU122"],
			sbCourses2: ["ASB202", "ASB226", "ASB235", "COM230", "COM263", "ECN211", 
					"ECN212", "SOC212", "SOC241", "SSH111"],
			literacyCourses: ["CRE101", "PHI103", "COM225", "ENG111", "ENG215", "IFS201"],
			humCourses1: ["ENG213", "PHI103", "PHI105", "SSH111"]
		}
	},// End of midCourses
	
	lateCourses: {
		lateMath: ["MAT23X", "MAT24X"],
		latePhy:  ["PHY121", "PHY131"],
		lateChem: ["CHM235", "CHM236"],

		lateGenEds: {
			huCourses2:  ["HIS252", "PHI213", "PHI216", "SSH111"]

		}

	},	// End of late Courses

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
	CourseDefinitions: {
		MAT08X: [["MAT082", 3], ["MAT081", 4]],
		MAT09X: [["MAT092", 3], ["MAT091", 4], ["MAT090", 5]],
		MAT12X: [["MAT122", 3], ["MAT121", 4], ["MAT120", 5]],
		MAT15X: [["MAT152", 3], ["MAT151", 4], ["MAT150", 5]],
		MAT22X: [["MAT221", 4], ["MAT220", 5]],
		MAT22X: [["MAT231", 4], ["MAT230", 5]],
		MAT24X: [["MAT241", 4], ["MAT240", 5]]
	},

	// non 3 credit hour courses
	creditDefinition: [["CHM130LL", 1], ["CHM151LL", 1], ["CHM152LL", 1], ["CHM235LL", 1],
	["CHM236LL", 1], ["PHY121", 4], ["PHY131", 4]],

	// success courses
	successCourses: ["SuccessCourse", "MAT108"]


}; // end of map
	
	

