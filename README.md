# Form Validation Project

## Overview

This project is a form validation showcase from [The Odin Project's Assignment](https://www.theodinproject.com/lessons/node-path-javascript-form-validation-with-javascript) as a milestone experience in practicing form validation using javascript's constraint validation ap. The form includes email, country, zip code, password, and password confirmation fields, ensuring that the user provides valid and consistent information.

## Features

- **Field Validation on Blur**: The form checks for errors after the user fills out or exits an input field, highlighting invalid fields and providing error messages.
- **Country-Specific Validation**: The zip code validation is tailored to the selected country, ensuring that only valid zip codes are accepted.
- **Password Requirements**: The password field enforces strict rules, requiring a mix of characters and ensuring that passwords are secure.
- **Simple Toast Notification**: Feedback is provided through a simple toast notifications.

## Project Structure

```plaintext
/
├── index.html            # The main HTML file
├── style.css             # CSS file for styling the form and other elements
├── script.js             # JavaScript file initializing and controlling form behavior
├── src/
│   └── assets/
│       ├── noun-success.svg  # Icon for success toast notification
│       └── noun-exit.svg     # Icon for closing toast notification
├── data/
│   └── country-list.json  # JSON file containing country data for validation
├── InputValidation.js     # Module handling the validation logic for each form field
└── UIController.js        # Module controlling UI behavior and event handling
