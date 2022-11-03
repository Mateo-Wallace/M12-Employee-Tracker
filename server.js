// Third Party Modules
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Local Modules
const { menuQuestions, example } = require('./lib/questions')
const { employees, roles, departments } = require('./lib/sql-queries')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);









// Asks menu questions.
function init() {
    inquirer
        .prompt(menuQuestions)
        // Redirects to specific questions based on menu answer
        .then((response) => {
            switch (response.menu) {
                case 'View All Employees':
                    db.query(employees, function (err, results) {
                        console.log('\n');
                        console.table(results);
                        init();
                    })
                    break;
                case 'View All Roles':
                    db.query(roles, function (err, results) {
                        console.log('\n');
                        console.table(results);
                        init();
                    })
                    break;
                case 'View All Departments':
                    db.query(departments, function (err, results) {
                        console.log('\n');
                        console.table(results);
                        init();
                    })
                    break;
                case 'Quit':
                    process.kill(process.pid, 'SIGINT');
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                default:
                    console.log(`ERROR. response.menu returning:\n ${response.role}`)
            }
        });
}

init()