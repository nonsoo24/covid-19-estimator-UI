function loaded() {
  document.querySelector("#getEstimate").addEventListener("click", getEstimate);
  document.querySelector("button.close").addEventListener("click", function () {
    document.querySelector(".modal").style.display = "none";
  });
}



//Input data
function getUserData() {
  return {
    region: {
      name: "Africa",
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71,
    },
    periodType: document.querySelector("#periodType").value,
    timeToElapse: document.querySelector("#timeToElapse").value,
    reportedCases: document.querySelector("#reportedCases").value,
    population: document.querySelector("#population").value,
    totalHospitalBeds: document.querySelector("#totalHospitalBeds").value
  };
}

function appendEstimates(data) {
  // Append impact cases
  document.querySelector("#currentlyInfected").value = data.impact.currentlyInfected;
  document.querySelector("#infectionsByRequestedTime").value = data.impact.infectionsByRequestedTime;
  document.querySelector("#severeCasesByRequestedTime").value = data.impact.severeCasesByRequestedTime;
  document.querySelector("#hospitalBedsByRequestedTime").value =
    data.impact.hospitalBedsByRequestedTime;
  document.querySelector("#casesForICUByRequestedTime").value = data.impact.casesForICUByRequestedTime;
  document.querySelector("#casesForVentilatorsByRequestedTime").value =
    data.impact.casesForVentilatorsByRequestedTime;
  document.querySelector("#dollarsInFlight").value = data.impact.dollarsInFlight;

  //Append Severe impact cases
  document.querySelector("#severecurrentlyInfected").value = data.severeImpact.currentlyInfected;
  document.querySelector("#severeinfectionsByRequestedTime").value = data.severeImpact.infectionsByRequestedTime;
  document.querySelector("#severesevereCasesByRequestedTime").value = data.severeImpact.severeCasesByRequestedTime;
  document.querySelector("#severehospitalBedsByRequestedTime").value =
    data.severeImpact.hospitalBedsByRequestedTime;
  document.querySelector("#severecasesForICUByRequestedTime").value = data.severeImpact.casesForICUByRequestedTime;
  document.querySelector("#severecasesForVentilatorsByRequestedTime").value =
    data.severeImpact.casesForVentilatorsByRequestedTime;
  document.querySelector("#severedollarsInFlight").value = data.severeImpact.dollarsInFlight;
  document.querySelector(".modal").style.display = "block";
}

// validations
const inputValue = true;
const populationValidation = () => {
  if (document.querySelector("#population").value.length === 0) {
    errorMessagePrompt("Enter population size", "populationErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "population");
    return true;

  } else errorMessagePrompt("", "populationErrorMessage", "", "0px");
  inputBoxError("", "population");
}

const reportedCasesValidation = () => {
  if (document.querySelector("#reportedCases").value.length === 0) {
    errorMessagePrompt("Enter no of reported cases", "reportedCasesErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "reportedCases");
    return true;

  } else errorMessagePrompt("", "reportedCasesErrorMessage", "", "0px");
  inputBoxError("", "reportedCases");
}

const totalHospitalBedsValidation = () => {
  if (document.querySelector("#totalHospitalBeds").value.length === 0) {
    errorMessagePrompt("Enter no of total hospital beds", "totalHospitalBedsErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "totalHospitalBeds");
    return true;

  } else errorMessagePrompt("", "totalHospitalBedsErrorMessage", "", "0px");
  inputBoxError("", "totalHospitalBeds");
}

const timeToElapseValidation = () => {
  if (document.querySelector("#timeToElapse").value.length === 0) {
    errorMessagePrompt("Enter Time to Elapse", "timeToElapseErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "timeToElapse");
    return true;

  } else errorMessagePrompt("", "timeToElapseErrorMessage", "", "0px");
  inputBoxError("", "timeToElapse");
}

// Error message function
const errorMessagePrompt = (message, errorMessage, color, marginTop) => {
  document.getElementById(errorMessage).textContent = message;
  document.getElementById(errorMessage).style.color = color;
  document.getElementById(errorMessage).style.marginTop = marginTop;

}

//Form Input error styling
const inputBoxError = (borderColor, inputId) => {
  document.getElementById(inputId).style.border = borderColor;
};

function checkValidation() {
  debugger
  populationValidation()
  reportedCasesValidation()
  totalHospitalBedsValidation()
  timeToElapseValidation()
  return false;
}
//let submitButton = document.querySelector('#getEstimate')

// submitButton = (e) => {
//   debugger
//   if (checkValidation()) {
//     document.querySelector('.modal').style.display = 'block'
//   } else {
//     document.querySelector('.modal').style.display = 'none'
//   }
//   e.preventDefault();
//   return true;
// };

function emptyInputField(){
  document.querySelector("#reportedCases").value = "";
  document.querySelector("#timeToElapse").value = "";
  document.querySelector("#totalHospitalBeds").value = "";
  document.querySelector("#population").value = "";
}

document.querySelector("#population").addEventListener('blur', populationValidation);
document.querySelector("#reportedCases").addEventListener('blur', reportedCasesValidation);
document.querySelector("#totalHospitalBeds").addEventListener('blur', totalHospitalBedsValidation);
document.querySelector("#timeToElapse").addEventListener('blur', timeToElapseValidation);
//document.querySelector('#form').addEventListener('submit', submitButton);

//pass input data into append estimates function
function getEstimate(e) {
  debugger
  if (validate() == true) {
  const data = getUserData();
  const impactEstimated = covid19ImpactEstimator(data);
  appendEstimates(impactEstimated);
  document.querySelector('.modal').style.display = 'block';
  emptyInputField()
  }
  e.preventDefault();
}

function validate() {
  debugger
  let reportedCases = document.querySelector("#reportedCases");
  let timeElapse =document.querySelector("#timeToElapse")
  let totalHospitalBeds = document.querySelector("#totalHospitalBeds")
  let population = document.querySelector("#population");
  if(population.value == "" ) {
    errorMessagePrompt("Enter population size", "populationErrorMessage", "red", "0px");
     population.focus() ;
     return false;
  }

  if(timeElapse.value == "" ) {
    errorMessagePrompt("Enter Time to Elapse", "timeToElapseErrorMessage", "red", "0px");
     timeElapse.focus() ;
     return false;
  }

  if(reportedCases.value == "" ) {
    errorMessagePrompt("Enter no of reported cases", "reportedCasesErrorMessage", "red", "0px");
     reportedCases.focus() ;
     return false;
  }

  if(totalHospitalBeds.value == "") {
    errorMessagePrompt("Enter no of total hospital beds", "totalHospitalBedsErrorMessage", "red", "0px");
     totalHospitalBeds.focus() ;
     return false;
  }
  return( true );
}