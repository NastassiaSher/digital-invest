# DigitalInvest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.


To run the project, please follow the instructions:
	clone the project from https://github.com/NastassiaSher/digital-invest.git ;
	run 'npm install';
	after all the packages successfully restored run 'npm run mock' to start the project with mocked-data-service;
	open a web browser at http://localhost:3000/  (port can be changed if it’s in use).

*User will be able to see a list of projects retrieved with mocked-data-service from JSON file. 
*User will be able to invest in a project after sign up/sign in.
*A new user data will be stored in a browser local storage:
	key - email:password encoded with BASE64 format - token;
	value - an object with two properties - name and investments.
*After sign in/sign up current user flag will be also saved in local storage as currUser:token pair.
