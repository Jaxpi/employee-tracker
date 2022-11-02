const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'ZukoSQL88!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
});

// This is the main function to begin the application - it is called at the end of each subsequent function so the user can perform multiple tasks without restarting the terminal
function mainMenu() {
    console.log("\x1b[44m", "Employee Tracker", '\x1b[0m')
    inquirer.prompt(
        [{
            type: "list",
            name: "mainMenu",
            message: "What would you like to do?",
            choices: ["View All Employees", "Add an Employee", "Update an Employee Role", "View All Roles", "Add a Role", "View All Departments", "Add a Department"]
    }])
    .then(function (answers) {        
        switch (answers.mainMenu) {
            case "View All Employees":
                viewAllEmployees();
            break;

            case "Add an Employee":
                addEmployee();
            break;

            case "Update an Employee Role":
                updateEmployee();
            break;

            case "View All Roles":
                viewRoles();
            break;

            case "Add a Role":
                addRole();
            break;

            case "View All Departments":
                viewAllDepartments();
            break;

            case "Add a Department":
                addDepartment();
            break;
        }
    });
}

mainMenu();

// This is the function to view all the employees, it contains all the information about each employee
function viewAllEmployees () {
    db.query('SELECT e_id as ID, first_name as "First Name", last_name as "Last Name", r_id as "Role ID", title as Title, salary as Salary, d_id as "Dept ID", name as Dept FROM employees LEFT JOIN roles ON employees.role_id = roles.r_id LEFT JOIN departments ON roles.department_id = departments.d_id', function (err, results) {
    console.table(results);
    mainMenu();
    });
}

// This is the function to add an employee, the prompts instruct the user to input information that will be used to insert into the table - in the future I would like to make the choices for the list types to be a selection of the options available, but could not find/figure out how to do that yet (for here and the other instances)
async function addEmployee () {
    const roles = await roleOptions();
    const managers = await managerOptions();
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter Employee First Name"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter Employee Last Name"
        },
        {
            name: "role",
            type: "list",
            message: "Select Employee Role",
            choices: roles
        },
        {
            name: "manager",
            type: "list",
            message: "Enter Manager Name",
            choices: managers
        }
    ]) .then(function (employeeInput) {
        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [
            employeeInput.firstName,
            employeeInput.lastName,
            employeeInput.role.split(" - ")[0],
            employeeInput.manager.split(" - ")[0]
        ], function (err, results) {
            console.log(err);
        console.table(employeeInput);
        console.log('\x1b[33m%s\x1b[0m', "New Employee Added") 
        mainMenu();
        })
    });
}

// This is the function to update an employee's role, the inputted information will be used to modify the table data
async function updateEmployee () {
    const roles = await roleOptions();
    inquirer.prompt([
        {
            name: "employeeSelect",
            type: "list",
            message: "Select the Employee to Update",
            choices: ["Aang", "Katara", "Sokka", "Toph", "Appa", "Momo", "Suki", "King", "Chief", "Monk", "Huu", "Master", "Firelord", "Azula", "Tai", "Mai", "Combustion", "Admiral", "Prince", "Uncle"]
        },
        {
            name: "newRole",
            type: "list",
            message: "Select Their New Role",
            choices: roles
        }
    ]) .then(function (employeeUpdate) {
        db.query('UPDATE employees SET role_id = "employeeUpdate.newRole" WHERE first_name = employeeUpdate.employeeSelect',
        function (err, results) {
        console.table(employeeUpdate);
        console.log('\x1b[33m%s\x1b[0m', "Employee Updated") 
        mainMenu();
        })
    });
}

// This is the function to view all current roles
function viewRoles () {
    db.query('SELECT * FROM roles', function (err, results) {
    console.table(results);
    mainMenu();
    });
}

// This is the function to add a new role, it is very similar to the add employee function
function addRole () {
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "Enter New Role Name"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter Role Salary"
        },
        {
            name: "department",
            type: "list",
            message: "Choose Department",
            choices: ["Debuggers - 001", "Support - 002", "Testers - 003", "Complicated - 004"]
        }
    ]) .then(function (roleInput) {
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [
            roleInput.roleName,
            roleInput.salary,
            roleInput.department.split(" - ")[1]
        ], function (err, results) {
            console.log(err);
        console.table(roleInput);
        console.log('\x1b[33m%s\x1b[0m', "New Role Added") 
        mainMenu();
        })
    });
}

// This is the function to view all the current departments
function viewAllDepartments () {
    db.query('SELECT * FROM departments', function (err, results) {
    console.table(results);
    mainMenu();
    });
}

// This is the function to add a department, it works in much the same way as adding an employee/adding a new role
async function addDepartment () {
    const depts = await deptOptions();
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Enter New Department Name"
        }
    ]) .then(function (departmentInput) {
        db.query('INSERT INTO departments (d_name) VALUES (?)',
        [departmentInput.departmentName],
        function (err, results) {
            console.log(err);
            console.table(departmentInput);
            console.log('\x1b[33m%s\x1b[0m', "New Department Added") 
            mainMenu();
        })
    });
}

// These are functions to create prepopulated lists of options for selecting roles and managers to be used above
function roleOptions() {

    return new Promise((resolve, reject) => {
        const roleArray = [];
        db.query('SELECT r_id, title FROM roles', function (err, results) {
            if (err) reject(err)
            for (i=0; i < results.length; i++) {
                roleArray.push(results[i].r_id + " - " + results[i].title);
            }
            resolve(roleArray)
        })
    });
}

function managerOptions() {

    return new Promise((resolve, reject) => {
        const managerArray = [];
        db.query('SELECT e_id, last_name FROM employees WHERE manager_id IS NULL', function (err, results) {
            if (err) reject(err)
            for (i=0; i < results.length; i++) {
                managerArray.push(results[i].e_id + " - " + results[i].last_name);
            }
            resolve(managerArray)
        })
    });
}

function deptOptions() {

    return new Promise((resolve, reject) => {
        const deptArray = [];
        db.query('SELECT * FROM departments', function (err, results) {
            if (err) reject(err)
            for (i=0; i < results.length; i++) {
                deptArray.push(results[i].d_id + " - " + results[i].name);
            }
            resolve(deptArray)
        })
    });
}


//NOTES:

// AS A business owner I WANT to be able to view and manage the departments, roles, and employees in my company SO THAT I can organize and plan my business
// GIVEN a command-line application that accepts user input WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database