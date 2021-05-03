# Tech-Blog

## Description

build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## User Story

AS A developer who writes about tech  
I WANT a CMS-style blog site  
SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Acceptance Criteria

GIVEN a CMS-style blog site  
- WHEN I visit the site for the first time
- THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
- WHEN I click on the homepage option
- THEN I am taken to the homepage
- WHEN I click on any other links in the navigation
- THEN I am prompted to either sign up or sign in
- WHEN I choose to sign up
- THEN I am prompted to create a username and password
- WHEN I click on the sign-up button
- THEN my user credentials are saved and I am logged into the site
- WHEN I revisit the site at a later time and choose to sign in
- THEN I am prompted to enter my username and password
- WHEN I am signed in to the site
- THEN I see navigation links for the homepage, the dashboard, and the option to log out
- WHEN I click on the homepage option in the navigation
- THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
- WHEN I click on an existing blog post
- THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
- WHEN I enter a comment and click on the submit button while signed in
- THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
- WHEN I click on the dashboard option in the navigation
- THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
- WHEN I click on the button to add a new blog post
- THEN I am prompted to enter both a title and contents for my blog post
- WHEN I click on the button to create a new blog post
- THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
- WHEN I click on one of my existing posts in the dashboard
- THEN I am able to delete or update my post and taken back to an updated dashboard
- WHEN I click on the logout option in the navigation
- THEN I am signed out of the site
- WHEN I am idle on the site for more than a set time
- THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments

## Mock-Up

![](./assets/images/14-mvc-homework-demo-01.gif)

## Github Repository

All files and changes made are located on github at the following location:
https://github.com/htang2021/tech-blog

## Application Deployment On Heroku

This instruction below assumes that a project and repo were already created on github and that they are already linked as appropriate.
(https://github.com/htang2021/tech-blog).

1. From the local CLI at the root of the project repo, do a git clone or git pull
2. Install the appropriate NPM packages dependencies, $ npm install
3. Verify, or create if needed, that .gitignore include node_modules/, .DS_Store, package-lock.json, and .env entries
4. Perform git add, commit, and push as appropriate to baseline the deployment repository
5. Log into a local database via MySQL2 client
6. Once at SQL> interface, create a database 'employee_tracker'
7. From SQL>, type the three commands to insert seed data into the DB:
 - SQL> source db/db.sql
 - SQL> source db/schema.sql
 - SQ>> source db/seeds.sql
8. Verify that all seed data is in place
9. Exit SQL> by typing exit;
10. Issue command 'npm start' to run the application, select 'Quit' to exit out of application.

## Testing
- Able to view table role
- Able to view table department
- Able to view table employee
- Verify that user sensitive information is not visible on GitHub by going to the github location and check to see if .env is visible and if the DB connection username/password or database name is visible
- Verify that a role can be added
- Verify a new department can be added to table department
- Verify that an employee can be added
- Verify the role and manger of an employee can be updated

## Questions
Feel free to reach out to [me](mailto:hungtang@hotmail.com).

README.md - updated by Hung Tang on 5/9/21