const employees = `WITH RECURSIVE manager AS (
    SELECT  id, first_name, last_name, role_id, manager_id
    FROM employee
    WHERE manager_id IS NULL
    UNION ALL
    SELECT  e.id, e.first_name, e.last_name, e.role_id, e.manager_id
    FROM employee e, manager m
    WHERE e.manager_id = m.id
)
SELECT  
    employee.id, 
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) as manager_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN manager ON employee.manager_id = manager.id;`;

const roles = `SELECT role.id, role.title, department.name AS department, role.salary
FROM role
JOIN department ON role.department_id = department.id;`;

const departments = `SELECT *
FROM department;`;

const addDeptQuery = `INSERT INTO department (name)
VALUES (?);`;

const addRoleQuery = `INSERT INTO role (title, department_id, salary)
VALUES (?, ?, ?);`;

const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);`;

module.exports = {
    employees, roles, departments, addDeptQuery, addRoleQuery, addEmployeeQuery
};