const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


let questions = [
    {
        name: "role",
        message: "What is your role?",
        type: "list",
        choices: ["Employee", "Manager", "Engineer", "Intern"],
        default: "Employee"
    },

    {
        name: "name",
        message: "What is your name?",
        type: "input",
        default: "Jordyn"
    },

    {
        name: "email",
        message: "What is your email address?",
        type: "input",
        default: "jordyn.saltzman@gmail.com"
    },

    {
        name: "officeNumber",
        message: "Enter your office number",
        type: "input",
        default: "(443) 248-4902",
        when: function (responses) {
            return responses.role === "Manager"
        }
    },

    {
        name: "school",
        message: "Where did you attend school?",
        type: "input",
        default: "Towson University",
        when: function (responses) {
            return responses.role === "Intern"
        }
    },

    {
        name: "github",
        message: "What is your Github username?",
        type: "input",
        default: "jordynsaltzman",
        when: function (responses) {
            return responses.role === "Engineer"
        }
    },
    {
        name: "newMember",
        message: "Would you like to add another team member?",
        type: "confirm",
        default: true
    }

];
team = []

function addNewMember (){
    const results = inquirer.prompt(questions)
    .then(function (response){
        console.log(response);
        team.push(response)
        if (response.newMember === true) {
            addNewMember();
        }
        else {
           writeHTML(); 
        }
    })
} 

function writeHTML (){

}

addNewMember()



