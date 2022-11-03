// Third Party Modules
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Local Modules
const { menuQuestions, addEmpQuest } = require('./lib/questions')
const { employees, roles, departments } = require('./lib/sql-queries')

// Connects user to existing database named employee_tracker_db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

function addDepartment() {

};

function addRole() {

};

// Creates new employee
function addEmployee() {

    // determines current departments
    var rolesArray = [];
    var departmentsArray = [];
    db.query('SELECT title FROM role', (err, results) => {
        for (i=0; i < results.length; i++) {
            rolesArray.push(results[i].title);
        }
        console.log(rolesArray);
    });

    // asks new employee data questions
    inquirer
        .prompt(addEmpQuest)
        // runs query to database to append new employee
        .then((response) => {
            
        });
};

// Asks menu questions.
function init() {
    inquirer
        .prompt(menuQuestions)
        // Redirects to specific questions based on menu answer
        .then((response) => {
            switch (response.menu) {
                // produces table showing all employees
                case 'View All Employees':
                    db.query(employees, function (err, results) {
                        console.log('\n');
                        console.table(results);
                        init();
                    })
                    break;
                // produces table showing all roles
                case 'View All Roles':
                    db.query(roles, function (err, results) {
                        console.log('\n');
                        console.table(results);
                        init();
                    })
                    break;
                // produces table showing all departments
                case 'View All Departments':
                    db.query(departments, function (err, results) {
                        console.log('\n');
                        console.table(results);
                        init();
                    })
                    break;
                // closes server and brings user back to base CLI
                case 'Quit':
                    process.kill(process.pid, 'SIGINT');
                    break;
                // Asks new employee questions
                case 'Add an Employee':
                    addEmployee();
                    break;
                // asks new role questions
                case 'Add a Role':
                    addRole();
                    break;
                // asks new department questions
                case 'Add a Department':
                    addDepartment();
                    break;
                default:
                    console.log(`ERROR. response.menu returning:\n ${response.role}`)
            }
        });
};

init()