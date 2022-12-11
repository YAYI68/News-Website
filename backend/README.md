# Node API for Medium Like Blog
# About
This project is a blog Application Programming Interface  backend developed with node express postgresql and prisma  as the ORM.This include routes for User to create an account, update and delete account,It also have routes for each user and Author to create a post update update and delete a post and also each authenticated user can comment on a post.
# Content

- Installation
- Documentation
- Deployment
- Built-With
  - Reasons for choosing postgresql as database system and using Prisma ORM
- Additions

# Installation 

- Visit the github respository github respository link
- Clone the application programming interface to your Desktop from github.
  
   > navigate to the code button on the repository.

   > copy the link and clone using the command **git clone repository url**
   
   > or using github desktop.
   
   > or download to your local desktop.
- Open the code using any code editor.
- On terminal run 
  
``` 
   $ npm install

```
- Provide the environment variables as specify in the `.env` file

# Documentation

The Project is well documented on Postman. The Publication link is [Blog API Postman link](https://documenter.getpostman.com/view/15034996/2s8YzQX4Hj)

# Deployment

The Project live deployment is [Survey-App deployment link](https://adefisayo-enterscale-test.vercel.app/). Use the documentation to know the routes for easy navigation.

# Built-With

The Api is built with Node.js, Json WebToken, MongoDB database to store information into the database. In addition, Json WEb Token to sign user information to accesss wallet functionality. The Application Environment Variable to implement funtionality while building the project are:

- Environment Variable Names
  - MONGODBURI : to connect to  an instance of mongodb url connection for database
  - JWT_KEY : to authenticate users

### Reasons for mongodb database?
The main reason for this project is to create flexible schemma relation between the user, survey and survey response respectively. The different schemma relationship can offer scalability in a unlimited way. To offer good definition  and relationship of schemma 
# Additions

This service can be intergrated in a survey application and the application can be scaled to include other funtionality

<!-- npx prisma format   to rearrange the relationship between the database schemas -->
<!-- npx prisma studio to set up a temporary database schema with their data on the browser  -->