import data from './data/country-list.json' assert { type: "json" };
import UIController from './UIController.js';

const Validation = () => {
    const countries = data.countries;
    const EMPTY_ERROR_MESSAGE = `This field must not be left empty`; 

    const inputErrors = [
        {
            name: "email",
            errors: [
                {
                    getErrorMessage: () => "You entered an invalid email!",
                    test: (element) => element.validity.typeMismatch,
                },
             ],
        },
        {
            name: "country",
            errors: [
                {
                    getErrorMessage: () => "Please select a country from the list",
                    test: (element) => !countries.find(country => country.country == element.value),
                }
            ],
        },
        {
            name: "zip",
            errors: [
                {
                    getErrorMessage: () => "Zip is not valid because country field is invalid",
                    test: (element) => !countries.find(country => country.country == UIController.getInputValue("country")),
                },
                {
                    getErrorMessage: () => UIController.getCountryValidationMessage(),
                    test: (element) => !UIController.getZipRegex().test(element.value),
                }
            ]
        },
        {
            name: "password",
            errors: [
                {
                    passRequirements: [],
                    getErrorMessage: function() {
                        const currentPassReqs = this.passRequirements 

                        // empty out passRequirements every test
                        this.passRequirements = [];
                        
                        return currentPassReqs;
                    },
                    test: function(element) {
                        const SPECIAL_CHARACTER_FORMAT = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        let result = false;

                        if(element.value.length <= 8 || element.value.length >= 20) {
                            this.passRequirements.push("Must be 8-20 characters long");
                            result = true;
                        }

                        if(!hasLowerCase(element.value)) {
                            this.passRequirements.push("Must include at least 1 lowercase letter");
                            result = true;
                        }

                        if(!hasUpperCase(element.value)) {
                            this.passRequirements.push("Must include at least 1 uppercase letter");
                            result = true;
                        }

                        if(!Array.from(element.value).some(char => !isNaN(char * 1))) {
                            this.passRequirements.push("Must include at least 1 number");
                            result = true;
                        }

                        if(!SPECIAL_CHARACTER_FORMAT.test(element.value)) {
                            this.passRequirements.push("Must include at least 1 special character");
                            result = true;
                        }

                        return result;
                    }
                }
            ]
        },
        {
            name: "passwordConfirm",
            errors: [
                {
                    getErrorMessage: () => "Please fill out first a valid password above",
                    test: (element) => UIController.hasErrors("password")
                },
                {
                    getErrorMessage: () => "Password do not match",
                    test: (element) => UIController.getInputValue("password") !== element.value
                }
            ]
        }
        
    ]

    const hasLowerCase = (str) => {
        const arrStr = Array.from(str);

        return arrStr.some((char) => {
            if(!isNaN(char * 1)) return false; // skips numbers
            
            return char === char.toLowerCase() && char !== char.toUpperCase();
        })  
    }

    const hasUpperCase = (str) => {
        const arrStr = Array.from(str);

        return arrStr.some((char) => {
            if(!isNaN(char * 1)) return false; // skips numbers
            
            return char === char.toUpperCase() && char !== char.toLowerCase();
        })  
    }

    const isEmpty = (element) => {
        return element.validity.valueMissing;
    }

    const checkErrors = (element, elementName) => {
        if(isEmpty(element)) {
            return EMPTY_ERROR_MESSAGE;
        }

        const input = inputErrors.find(inputError => inputError.name == elementName)
        const error = input.errors.find(item => {
            return item.test(element)
        })

        if(!error) {
            return undefined;
        }

        return error.getErrorMessage();
    }

    return {
        checkErrors
    }
}

export default Validation;