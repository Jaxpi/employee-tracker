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
  console.log(`Server running on port ${PORT}`);
});

function prompt() {
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

prompt();

function viewAllEmployees () {
    db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', function (err, results) {
    console.table(results);
    prompt();
    });
}

function addEmployee () {
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
            choices: ["Peace Keeper", "Moral Compass", "Ideas Guy", "Tough Guy", "Sidekick", "Fighter", "Guider", "Lead Obstacle", "Obstacle Supporter", "Emotional Mess", "Human Xanax"]
        },
        {
            name: "manager",
            type: "list",
            message: "Enter Manager Name",
            choices: ["Aangerson", "Ozai", "Zuko"]
        }
    ]) .then(function (userInput) {
        // const roleOptionChoice = roleOptions().indexOf(userInput.role)
        // const managerOptionChoice = managerOptions().indexOf(userInput.manager)
        // console.log(userInput.firstName)
        // console.log(userInput.lastName)
        // console.log(userInput.role)
        // console.log(userInput.manager)
        db.query('INSERT INTO employees SET ?',
        {
            first_name: userInput.firstName,
            last_name: userInput.lastName,
            role_id: userInput.role,
            manager_id: userInput.manager
        }, function (err, results) {
        console.table(results);
        console.log("New Employee Added") 
        prompt();
        })
    });
}

function updateEmployee () {
    db.query('UPDATE employees SET role_id = "?" WHERE id = ?idvalue;', function (err, results) {
    console.table(results);
    prompt();
    });
}

function viewRoles () {
    db.query('SELECT * FROM roles', function (err, results) {
    console.table(results);
    prompt();
    });
}

function addRole () {
    db.query('INSERT INTO roles (id, title, salary, department_id) VALUES (?, ?, ?, ?),', function (err, results) {
    console.table(results);
    prompt();
    });
}

function viewAllDepartments () {
    db.query('SELECT * FROM departments', function (err, results) {
    console.table(results);
    prompt();
    });
}

function addDepartment () {
    db.query('INSERT INTO departments (id, name) VALUES (?, ?),', function (err, results) {
    console.table(results);
    prompt();
    });
}

// function roleOptions() {
//     const roleArray = [];
//     db.query('SELECT title FROM roles', function (err, results) {
//         if (err) throw err
//         for (i=0; i < results.length; i++) {
//             roleArray.push(results[i]);
//         }
//     })
//     return roleArray;
// }

// function managerOptions() {
//     const managerArray = [];
//     db.query('SELECT last_name FROM employees WHERE manager_id IS NULL', function (err, results) {
//         if (err) throw err
//         for (i=0; i < results.length; i++) {
//             managerArray.push(results[i]);
//         }
//     })
//     return managerArray;
// }

// AS A business owner I WANT to be able to view and manage the departments, roles, and employees in my company SO THAT I can organize and plan my business

// GIVEN a command-line application that accepts user input WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database