function loaded() {
  document.querySelector("#getEstimate").addEventListener("click", getEstimate);
  document.querySelector("button.close").addEventListener("click", function () {
    document.querySelector(".modal").style.display = "none";
  });
}


//pass input data into append estimates function
function getEstimate() {
  const data = getUserData();
  const impactEstimated = covid19ImpactEstimator(data);
  appendEstimates(impactEstimated);
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

const populationValidation = () => {
  if (document.querySelector("#population").value.length === 0) {
    errorMessagePrompt("Enter population size", "populationErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "population");
    return false;

  } else errorMessagePrompt("", "populationErrorMessage", "", "0px");
  inputBoxError("", "population");
  return true;
}

const reportedCasesValidation = () => {
  if (document.querySelector("#reportedCases").value.length === 0) {
    errorMessagePrompt("Enter no of reported cases", "reportedCasesErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "reportedCases");
    return false;

  } else errorMessagePrompt("", "reportedCasesErrorMessage", "", "0px");
  inputBoxError("", "reportedCases");
  return true;
}

const totalHospitalBedsValidation = () => {
  if (document.querySelector("#totalHospitalBeds").value.length === 0) {
    errorMessagePrompt("Enter no of total hospital beds", "totalHospitalBedsErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "totalHospitalBeds");
    return false;

  } else errorMessagePrompt("", "totalHospitalBedsErrorMessage", "", "0px");
  inputBoxError("", "totalHospitalBeds");
  return true;
}

const timeToElapseValidation = () => {
  if (document.querySelector("#timeToElapse").value.length === 0) {
    errorMessagePrompt("Enter Time to Elapse", "timeToElapseErrorMessage", "red", "0px");
    inputBoxError("1px solid red", "timeToElapse");
    return false;

  } else errorMessagePrompt("", "timeToElapseErrorMessage", "", "0px");
  inputBoxError("", "timeToElapse");
  return true;
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
  populationValidation()
  reportedCasesValidation()
  totalHospitalBedsValidation()
  timeToElapseValidation()
  return true;
}
let submitButton = document.querySelector('#getEstimate')

submitButton = (e) => {
  debugger
  if (checkValidation()) {
    document.querySelector('.modal').style.display = 'block'
  } else {
    document.querySelector('.modal').style.display = 'none'
  }
  e.preventDefault();
  return true;
};

document.querySelector("#population").addEventListener('blur', populationValidation);
document.querySelector("#reportedCases").addEventListener('blur', reportedCasesValidation);
document.querySelector("#totalHospitalBeds").addEventListener('blur', totalHospitalBedsValidation);
document.querySelector("#timeToElapse").addEventListener('blur', timeToElapseValidation);
document.querySelector('#form').addEventListener('submit', submitButton);