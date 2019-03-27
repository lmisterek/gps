// Listen for click event

$("#testScores").click(function(e) {
  //e.preventDefault();
  // Store all the scores into an object
  var scores = {
  	name: $("#name").val(),
  	email: $("#email").val(),
  	writePlacer: $("#writePlacer").val(),
  	readingComp: $("#readingComp").val(),
  	arith: $("#arith").val(),
  	elemAlg: $("#elemAlg").val(),
  	colMath: $("#colMath").val(),
  	numCredits: $("#numCredits").val()

  }

  //  Determine the english course
  var english = English(scores.writePlacer);
  var mathArray = MathArray(scores.colMath, scores.elemAlg, scores.arith);
  var reading = Reading(scores.readingComp);


  // Interpret the scores to determine which reading, math, and english 
  localStorage.setItem("reading", reading);
  localStorage.setItem("math", mathArray);
  localStorage.setItem("english", english);


});

function English(value) {

  if(value == 2)
      return "ENG081";

  else if(value == 4)
      return "ENG091";

  else if(value == 8)
      return "ENG101";

  else
    return "ENG081";
}

function MathArray(college, elementary, arithmetic) {
  
  var mathArray = ["MAT08X"];
  
  if(arithmetic == 75)
      mathArray = ["MAT09X"];

  if(elementary == 50)
      mathArray = ["MAT09X"];
  
  else if(elementary == 70)
      mathArray = ["MAT112", "MAT12X", "MAT14X"];

  if(college == 32)
    mathArray = ["MAT15X"];
  else if(college == 54)
    mathArray = ["MAT156", "MAT172", "MAT182", "MAT187"];
  else if (college == 60)
    mathArray = ["MAT22X"];

  return mathArray;
}

function Reading (score) {
  if (score == 36)
    return "RDG071";
  else if(score == 37)
    return "RDG081";
  else if(score == 56)
    return "RDG100";
  else if (score == 74)
    return "CRE101";
  else if (score == 92)
    return "CRE101";
}

module.exports = getScores;

