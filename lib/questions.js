const menuQuestions = [
    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add an Employee', 'Add a Role', 'Add a Department', 'Update Employee Role', 'Quit'],
    },
];

function addEmpQuest(rolesArray, managersArray) {
    return [
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
            choices: rolesArray,
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is the employees MANAGER?',
            choices: managersArray,
        },
    ];
}

const addDeptQuest = [
    {
        name: 'name',
        type: 'input',
        message: 'What is the department NAME?',
    },
];

function addRoleQuest(deptArray) {
    return [
        {
            name: 'title',
            type: 'input',
            message: 'What is the role TITLE?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the role SALARY?',
            validate: (name) => {
                var valid = +name
                // Check if input is 'NaN'. If not, returns true
                return ((valid.toString() !== 'NaN') ? true : 'Not a number. Try again.')
            }
        },
        {
            name: 'deptId',
            type: 'list',
            message: 'What is the roles DEPARTMENT?',
            choices: deptArray
        },
    ];
};

function updateEmpRoleQuest(rolesArray, employeesArray) {
    return [
        {
            name: 'name',
            type: 'list',
            message: 'What is the employees NAME?',
            choices: employeesArray
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is the employees new ROLE?',
            choices: rolesArray
        },
    ];
};

module.exports = {
    menuQuestions, addEmpQuest, addDeptQuest, addRoleQuest, updateEmpRoleQuest
};