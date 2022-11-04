-- Queries display only certain items as a table

-- View all EMPLOYEES
-- creates manager for employee
WITH RECURSIVE manager AS (
    SELECT  id, first_name, last_name, role_id, manager_id
    FROM employee
    WHERE manager_id IS NULL
    UNION ALL
    SELECT  e.id, e.first_name, e.last_name, e.role_id, e.manager_id
    FROM employee e, manager m
    WHERE e.manager_id = m.id
)
-- actually selects employee while referencing manager
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
LEFT JOIN manager ON employee.manager_id = manager.id;


-- View all DEPARTMENTS
SELECT *
FROM department;


-- View all ROLES
SELECT role.id, role.title, department.name AS department, role.salary
FROM role
JOIN department ON role.department_id = department.id;

-- Select Specific Item
SELECT id FROM department WHERE name = 'Sales'