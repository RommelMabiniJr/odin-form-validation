// import data from './src/data/country-list.json' assert { type: "json" };
// import Validation from './src/InputValidation.js';

// const countryOptionsContainer = document.querySelector("#country-list");
// const countryElement = document.querySelector("#country")
// const zipElement = document.querySelector("#zip");
// const zipValidation = document.querySelector("#zip-validation");

// const countries = data.countries;
// let zipRegexp;
// let zipValidationMessage;


// countries.forEach(country => {
//     const optionSample = document.createElement("option");
//     optionSample.value = country.country;
//     optionSample.innerText = country.country;

//     countryOptionsContainer.appendChild(optionSample);
// })

// countryElement.addEventListener("blur", (e) => {
//     const countryValues = countries.find(country => country.country == countryElement.value);

//     if(countryValues) {
//         zipRegexp = new RegExp(countryValues.regex);
//         zipValidationMessage = countryValues.validationMessage;
//     }
// })


// zipElement.addEventListener("blur", (e) => {
//     const isValid = zip.value.length == 0 || country.value.length == 0 || zipRegexp.test(zipElement.value);
    
//     if(isValid){
//         zipValidation.innerText = "";
//     } else {
//         zipValidation.innerText = zipValidationMessage;
//     }

   
// })


// const email = document.querySelector("#email")
// const country = document.querySelector("#country")
// const btn = document.querySelector("#test-btn")
// const validation = Validation();

// btn.addEventListener("click", () => {
//     const error = validation.checkErrors(zipElement, 'zip');
//     console.log(error)
// })

import UIController from "./src/UIController.js";