exports.chemistryMap = 
{
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


}