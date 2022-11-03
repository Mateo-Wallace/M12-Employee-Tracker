const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

db.query('SELECT * FROM employee', function (err, results) {
    console.table(results)
})

// Asks menu questions.
// function init() {
//     inquirer
//       .prompt(menuQuestions)
//       // Redirects to specific questions based on menu answer
//       .then((response) => {
//         switch (response.menu) {
//           case 'Example':
//             callExample();
//             break;
//           default:
//             console.log(`ERROR. response.menu returning:\n ${response.role}`)
//         }
//       });
//   }

// init()