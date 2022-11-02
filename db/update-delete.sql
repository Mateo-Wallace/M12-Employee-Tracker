USE employee_tracker_db;

-- This sheet creates an example insert user.
-- Allows you to update the first name of said example user.
-- And then deletes said example user.

-- Add new user via INSERT
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Oetam", "Wallace", 4, 3);

--Update user info via UPDATE
UPDATE employee
SET first_name = "Mateo"
WHERE id = 9;

-- Delete user via DELETE
DELETE FROM employee
WHERE id = 9;
