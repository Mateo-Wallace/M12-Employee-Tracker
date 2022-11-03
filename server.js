// Third Party Modules
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Local Modules
const { menuQuestions, example } = require('./lib/questions')
const { employees, example2 } = require('./lib/sql-queries')

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
                default:
                    console.log(`ERROR. response.menu returning:\n ${response.role}`)
            }
        });
}

init()