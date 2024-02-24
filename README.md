# Leave-Management-System

Introduction: The Leave Management System (LMS) is a comprehensive solution for organizations to handle employee leave requests and manage user accounts efficiently. This document provides a step-by-step guide for setting up the LMS application on your local system.

Pre-requisites: Software requirements: Ensure the following software is installed on your devices.

node and npm.
MySQL.
Database Setup:

Start MySQL
Create the necessary database, tables, and data. The SQL scripts to run are submitted in a different file called leavemanagementsystem.sql
Codebase and Configuration:

Obtain the latest codebase for the LMS project. (Github: https://github.com/gargikulkarni99)
Configure Database connection: Open ‘config.json’ inside ‘LMS’ directory and configure the values: { "DB_HOST": "localhost", "DB_PORT": 3306, "DB_USER": "root", //root user of your SQL db "DB_PASSWORD": "root", //root password of your SQL db "DB_NAME": "leavemanagementsystem" }
*Note: If you are facing issues with creating and connecting to SQL. Please copy the below configuration. We have created an Amazon RDS instance for the same which has db and tables created already * { "DB_HOST": "leavemanagementsystem.c2lxnhnqsqut.us-east-2.rds.amazonaws.com", "DB_PORT": 3306, "DB_USER": "root", "DB_PASSWORD": "root1206", "DB_NAME": "leavemanagementsystem" }

Configure the Backend Server Location: Open ‘../leavemanagement-frontend/src/config.json’ and set the server details. { "serverUrl": "localhost:3001" }
Note: If you are facing an issue with connecting to backend using the above url. Please use the below configuration. A backend has been deployed on AWS EC2 { "serverUrl": "http://ec2-18-222-84-218.us-east-2.compute.amazonaws.com:3001" }

Running the app:

Navigate to …./leave-management-system-backend . Run: npm install
Navigate to …/leave-management-system-frontend . Run: npm install The above 2 commands are used to install node dependencies.
Navigate to ../LMS/leave-management-system-backend Run: npm start
Access the Application: Open your browser and go to http://localhost:3000
Login: Use the admin credentials: Username - admin, Password - admin.

*Note: If you are facing any issues running the application on your local system. Please visit the below link where the application has been deployed on the AWS EC2 instance. *

URL: http://ec2-18-222-84-218.us-east-2.compute.amazonaws.com:3000/

Conclusion: This demonstration guide provides a detailed walkthrough of setting up and running the Leave Management System. Follow each step carefully to ensure a smooth experience. The LMS project aims to streamline leave request processes within an organization, contributing to efficient human resource management.
