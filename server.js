// Third Party Modules
const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Local Modules
const { menuQuestions, addEmpQuest, addDeptQuest, addRoleQuest, updateEmpRoleQuest } = require('./lib/questions')
const { employees, roles, departments, addDeptQuery, addRoleQuery, addEmployeeQuery } = require('./lib/sql-queries')

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

// Creates new Department
function addDepartment() {
    inquirer
        .prompt(addDeptQuest)
        .then((response) => {
            db.query(addDeptQuery, response.name, function (err, results) {
                console.log(`\n New Department added as: ${response.name} \n`);
                init();
            })
        });
};

// Creates new Role
function addRole() {
    var deptArray = [];
    db.query('SELECT name FROM department', (err, results) => {
        for (i = 0; i < results.length; i++) {
            deptArray.push(results[i].name);
        }
        addRolePart2(deptArray);
    });
};

function addRolePart2(deptArray) {
    inquirer
        .prompt(addRoleQuest(deptArray))
        .then((response) => {
            db.query(`SELECT id FROM department WHERE name = ?`, response.deptId, function (err, results) {
                addRolePart3(response, results[0].id)
            })
        })
}

function addRolePart3(response, deptId) {
    db.query(addRoleQuery, [response.title, deptId, +response.salary], function (err, results) {
        console.log(`\n New Role added as: ${response.title} \n`);
        init();
    })
}

// Creates new employee
function addEmployee() {
    var rolesArray = [];
    var managersArray = [];
    db.query('SELECT title FROM role', (err, results) => {
        for (i = 0; i < results.length; i++) {
            rolesArray.push(results[i].title);
        }
        db.query(`select concat(first_name, ' ', last_name) as manager from employee where manager_id is NULL`, (err, results) => {
            for (i = 0; i < results.length; i++) {
                managersArray.push(results[i].manager);
            }
            managersArray.push('null');
            addEmployeePart2(rolesArray, managersArray);
        });
    });
};

function addEmployeePart2(rolesArray, managersArray) {
    inquirer
        .prompt(addEmpQuest(rolesArray, managersArray))
        .then((response) => {
            db.query(`select id from role where title = ?`, response.role, function (err, results) {
                var roleId = results[0].id;
                var managerId = response.manager;
                if (managerId !== 'null') {
                    db.query(`select id from employee where concat(first_name, ' ', last_name)  = ?`, response.manager, function (err, results) {
                        managerId = results[0].id;
                        addEmployeePart3(response, roleId, managerId);
                    })
                } else {
                    managerId = null;
                    addEmployeePart3(response, roleId, managerId);
                }
            })
        })
}

function addEmployeePart3(response, roleId, managerId) {
    db.query(addEmployeeQuery, [response.firstName, response.lastName, roleId, managerId], function (err, results) {
        console.log(`\n New Employee added as: ${response.firstName} \n`);
        init();
    })
}

function updateEmployeeRole() {
    var rolesArray = [];
    var employeesArray = [];
    db.query('SELECT title FROM role', (err, results) => {
        for (i = 0; i < results.length; i++) {
            rolesArray.push(results[i].title);
        }
        db.query(`select concat(first_name, ' ', last_name) as employee from employee`, (err, results) => {
            for (i = 0; i < results.length; i++) {
                employeesArray.push(results[i].employee);
            }
            inquirer
                .prompt(updateEmpRoleQuest(rolesArray, employeesArray))
                .then((response) => {
                    db.query(`select id from role where title = ?`, response.role, function (err, results) {
                        var roleId = results[0].id;
                        console.log(roleId)
                        db.query(`UPDATE employee SET role_id = ? WHERE concat(first_name, ' ', last_name) = ?;`, [roleId, response.name], function (err, results) {
                            console.log(`\n Employee Role Updated \n`);
                            init();
                        })
                    })
                })

        });
    });
}

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
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                default:
                    console.log(`ERROR. response.menu returning:\n ${response.role}`)
            }
        });
};

init()