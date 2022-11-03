const menuQuestions = [
    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add an Employee', 'Add a Role', 'Add a Department', 'Quit'],
    },
];

const addEmpQuest = [
    {
        name: 'firstName',
        type: 'input',
        message: 'What is the employees FIRST NAME?',
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'What is the employees LAST NAME?',
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the employees ROLE?',
        choices: 'rolesAr',
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Who is the employees MANAGER?',
        choices: 'departmentsAr',
    },
];

module.exports = {
    menuQuestions, addEmpQuest,
};