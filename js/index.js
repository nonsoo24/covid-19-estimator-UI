function loaded() {
    document.querySelector("#getEstimate").addEventListener("click", getEstimate);
    document.querySelector("button.close").addEventListener("click", function () {
      document.querySelector(".modal").style.display = "none";
    });
  }

  function getEstimate() {
    const data = getUserData();
    const impactEstimated = covid19ImpactEstimator(data);
    appendEstimates(impactEstimated);
  }

  function getUserData(){
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

  function appendEstimates(data){
    // Append impact cases
    document.querySelector("#currentlyInfected").value = data.impact.currentlyInfected;
    document.querySelector("#infectionsByRequestedTime").value = data.impact.infectionsByRequestedTime;
    document.querySelector("#severeCasesByRequestedTime").value = data.impact.severeCasesByRequestedTime;
    document.querySelector("#hospitalBedsByRequestedTime").value =
      data.impact.hospitalBedsByRequestedTime
    ;
    document.querySelector("#casesForICUByRequestedTime").value = data.impact.casesForICUByRequestedTime;
    document.querySelector("#casesForVentilatorsByRequestedTime").value =
      data.impact.casesForVentilatorsByRequestedTime
    ;
    document.querySelector("#dollarsInFlight").value = data.impact.dollarsInFlight;

    //Append Severe impact cases
    document.querySelector("#severecurrentlyInfected").value = data.severeImpact.currentlyInfected;
    document.querySelector("#severeinfectionsByRequestedTime").value = data.severeImpact.infectionsByRequestedTime;
    document.querySelector("#severesevereCasesByRequestedTime").value = data.severeImpact.severeCasesByRequestedTime;
    document.querySelector("#severehospitalBedsByRequestedTime").value =
      data.severeImpact.hospitalBedsByRequestedTime
    ;
    document.querySelector("#severecasesForICUByRequestedTime").value = data.severeImpact.casesForICUByRequestedTime;
    document.querySelector("#severecasesForVentilatorsByRequestedTime").value =
      data.severeImpact.casesForVentilatorsByRequestedTime
    ;
    document.querySelector("#severedollarsInFlight").value = data.severeImpact.dollarsInFlight;
    document.querySelector(".modal").style.display = "block";
  }