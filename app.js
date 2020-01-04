const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const cheerio = require("cheerio")
const open = require("open");

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
let team = [];
let id = 0;

function addNewMember() {
    const results = inquirer.prompt(questions)
        .then(function (response) {
            console.log(response);
            let teamMember;

            id += 1;

            if (response.role === "Employee") {
                teamMember = new Employee(response.name, id, response.email);
            }

            else if (response.role === "Manager") {
                teamMember = new Manager(response.name, id, response.email, response.officeNumber);
            }

            else if (response.role === "Intern") {
                teamMember = new Intern(response.name, id, response.email, response.school);
            }

            else if (response.role === "Engineer") {
                teamMember = new Engineer(response.name, id, response.email, response.github);
            }

            team.push(teamMember);

            if (response.newMember === true) {
                addNewMember();
            }
            else {
                writeHTML();
            }
        })
}

async function writeHTML() {
    let template = await fs.readFileSync("./output/template.html", "utf8", function (err) {
        if (err) {
            console.log(err);
        }
    });

    const $ = cheerio.load(template)
    for (i = 0; i < team.length; i++) {

        let cardDiv = $("<div>").addClass("card w-25 p-2 m-3 border-dark");
        let card = $("<div>").addClass("card-body text-dark");
        
        
        let role = $("<h2>").text(team[i].getRole()).addClass("card-header");
        $(cardDiv).append(role);


        let name = $("<h4>").text(team[i].getName()).addClass("card-title");
        $(card).append(name);
        

        let id = $("<p>").text("ID: " + team[i].getId()).addClass("card-text");
        $(card).append(id);
      

        let email = $("<p>").text(team[i].getEmail()).addClass("card-text");
        $(card).append(email);


        if(role.text() === "Manager"){
            let officeNumber = $("<p>").text("Office Number: " + team[i].getOffice()).addClass("card-text");
            $(card).append(officeNumber);
        }

        if(role.text() === "Intern"){
            let school = $("<p>").text("School: " + team[i].getSchool()).addClass("card-text");
            $(card).append(school);
        }

        if(role.text() === "Engineer"){
            let github = $("<p>").text("Github: " + team[i].getGithub()).addClass("card-text");
            $(card).append(github);
        }

        let icon = $("<i>").addClass("fas " + team[i].getIcon());
        $(role).append(" " + icon);

        
        $(cardDiv).append(card);
        $("#team-members").append(cardDiv);
    }

    fs.writeFile("./output/team.html", $.html(), function (err) {
        if (err) {
            console.log(err);
        }
        console.log("open ./output/team.html");
        open("./output/team.html", { wait: true });
    })

}

addNewMember()



