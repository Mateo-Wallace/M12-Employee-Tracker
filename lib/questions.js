const menuQuestions = [
    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add an Employee', 'Add a Role', 'Add a Department', 'Quit'],
    },
];

const example = [
    {
        name: 'example',
        type: 'list',
        message: 'example',
        choices: ['example 1', 'example 23'],
    },
];

module.exports = {
    menuQuestions, example,
};