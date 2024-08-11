import data from './data/country-list.json' assert { type: "json" };
import Validation from "./InputValidation.js";

const UIController = ((document)=> {

    let _cachedDOM = {};
    let _validFields = ["email", "country", "zip", "password", "passwordConfirm"];
    let validation = Validation();
    const countries = data.countries;

    function _cacheDOM() {
        _cachedDOM.inputElements = [
            { name: "email", element: document.querySelector("#email"), isValid: false },
            { name: "country", element: document.querySelector("#country"), isValid: false, countryData: "" },
            { name: "zip", element: document.querySelector("#zip"), isValid: false, regexp: "" },
            { name: "password", element: document.querySelector("#password"), isValid: false },
            { name: "passwordConfirm", element: document.querySelector("#passwordConfirm"), isValid: false }
        ];
        
        _cachedDOM.validationElements = [
            { name: "email", element: document.querySelector("#email-validation"), },
            { name: "country", element: document.querySelector("#country-validation"), },
            { name: "zip", element: document.querySelector("#zip-validation"), },
            { name: "password", element: document.querySelector("#password-validation"), },
            { name: "passwordConfirm", element: document.querySelector("#password-confirm-validation") }
        ]

        _cachedDOM.countryOptionsContainer = document.querySelector("#country-list");
        _cachedDOM.submitBtn = document.querySelector(".submit-btn");
        _cachedDOM.toast = document.querySelector(".toast");
        _cachedDOM.exitToastBtn = document.querySelector(".toast-exit")
    }

    function _bindEvents() {
        _cachedDOM.inputElements.forEach(input => {
            input.element.addEventListener('blur', _validateInput);
        });

        _cachedDOM.submitBtn.addEventListener("click", _submitCredentials);
        _cachedDOM.exitToastBtn.addEventListener("click", _closeToast)
    }

    function _setupCountryOptions() {
        countries.forEach(country => {
            const optionSample = document.createElement("option");
            optionSample.value = country.country;
            optionSample.innerText = country.country;

            _cachedDOM.countryOptionsContainer.appendChild(optionSample);
        })
    }

    function _init() {
        _cacheDOM();
        _bindEvents();
        _setupCountryOptions();
    }

    function _submitCredentials(event) {
        if(!_isAllFieldValid()) {
            _showToast(false);
            return;
        }

        _showToast(true);
    }

    function _closeToast() {
        _showToast(false);
    }

    function _showToast(show) {
        if(show) {
            _cachedDOM.toast.classList.add("show");
        } else if (!show) {
            _cachedDOM.toast.classList.remove("show");
        }
    }

    function _isAllFieldValid() {
        const result = _cachedDOM.inputElements.reduce((isValid, currentElement) => {
            const fieldElement = currentElement.element;
            fieldElement.focus();
            fieldElement.blur();
      
            return (isValid == false) ? isValid : fieldElement.validity.valid;
          }, true)
          
          return result;
    }

    function _validateInput(event) {
        const fieldName = event.target.id;
        const fieldElement = _getInputElement(fieldName);
        const validationElement = _getValidationElement(fieldName);

        _fieldValueSetup(event, fieldElement);

        const error = validation.checkErrors(fieldElement, fieldName)
        if(error) {
            _showValidationError(error, validationElement)
            _setFieldValidState(fieldElement, false)
        } else {
            _showValidationError("", validationElement)
            _setFieldValidState(fieldElement, true)
        }

        _setElementTouched(fieldElement);
    }

    function _setElementTouched(fieldElement) {
        fieldElement.classList.add("touched");
    }

    function _fieldValueSetup(event, fieldElement) {
        const fieldName = event.target.id

        // things to handle for zip
        if(fieldName == "country") {
            const countryValues = countries.find(country => country.country == fieldElement.value);
            if(!countryValues) return;

            const countryInput = _getInputItem("country");
            const zipInput = _getInputItem("zip")
            
            countryInput.countryData = countryValues;
            zipInput.regexp = new RegExp(countryValues.regex)
            
        }
    }

    function _showValidationError(errors, validationElement) {
        validationElement.innerText = "";
        
        if(!errors) {
            validationElement.innerText = "";
            return;
        }

        if(!Array.isArray(errors)) {
            validationElement.innerText = `• ${errors}`;
            return;
        }

        errors.forEach(error => {
            const linebreak = document.createElement("br");
            validationElement.innerText += `• ${error}`;
            validationElement.appendChild(linebreak);
        });
    }

    function _getInputItem(name) {
        return _cachedDOM.inputElements.find(element => element.name === name);
    }

    function _getInputElement(name) {
        return _cachedDOM.inputElements.find(element => element.name === name).element;
    }

    function _getValidationElement(name) {
        return _cachedDOM.validationElements.find(element => element.name === name).element;
    }

    function getInputValue(name) {
        return _cachedDOM.inputElements.find(element => element.name === name).element.value;
    }

    function _setFieldValidState(fieldElement, isValid) {
       if(isValid) {
        fieldElement.setCustomValidity("");
       } else {
        fieldElement.setCustomValidity("Invalid Field");
       }
    }

    function getZipRegex() {
        return _cachedDOM.inputElements.find(element => element.name === "zip").regexp;
    }

    function getCountryValidationMessage() {
        return _cachedDOM.inputElements.find(element => element.name === "country").countryData.validationMessage;
    }

    function hasErrors(fieldName) {
        return !_cachedDOM.inputElements.find(element => element.name == fieldName).element.validity.valid;
    }

    // initialize the module
    _init();

    return {
        getInputValue,
        hasErrors,
        getZipRegex,
        getCountryValidationMessage
    }
})(document);

export default UIController;