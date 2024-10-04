# Chatspot: An Web based chat Application 


## [VIEW LIVE DEMO](https://chatspot-prod.onrender.com/)

## 🚧 Technology Stack

- **Server Enviornment** - NodeJS
- **Framework** - ExpressJS
- **Frontend** - ReactJS, HTML, CSS, Javascript, Vite
- **UI/UX** - ChakraUI
- **State management** - Context API
- **Web Socket** - Socket.IO
- **Database** - MongoDB
- **Cloud database service** - MongoDB Atlas
- **Authorizatiion** - JWT
- **Upload image** - Cloudinary
- **Deployment** - Render
- **Package Manager** - Yarn

## ⬇️ Installation

- First, fork this repository 🍴 and follow the given instructions:

```
# clone the repository to your local machine
$ git clone `git clone https://github.com/<YOUR-GITHUB-USERNAME>/chatspot.git`

# navigate to the project's directory and install all the relevant dev-dependencies
$ yarn
$ cd frontend && yarn
$ cd backend && yarn

# create a MongoDB Atlas instance and obtain the MongoDB URI
# choose a random JWT secret
# set NODE_ENV to development
# create a .env file with the following fields according to the knowledge obtained
   NODE_ENV 
   PORT 
   MONGO_URI 
   JWT_SECRET 

# Start application
$ yarn dev

# Make requests on http://localhost:PORT/ from Postman
```

## Workflow

On the home page there's a login/signup.

1. SignUp/ Login
2. Search for Users in the side drawer.
3. Click on the chat and start chatting.
4. When you're typing the other person would see a typing animation.
5. If the other user is not on the chat at the moment you're sending the message, the'll get a notification for the chats.
6. You can also view the profile on users by clicking on the top right corner (eye) of the chat.
7. You can also create group chats.
8. The creater would be the admin of the group chat.
9. The admin can add or remove members from their group chat.
10. The admin can also rename the group chat.



## Project Structure

I structured the application based on MVC Architecture. MVC stands for Model, View and Controller. This application presents a clear demarcation between the Model, View and Controller logics:

1. The `Model` logic is managed by Context API. Chat Provider decides what data the app should contain according to the current state. If the state of this data changes, then the `View` is notified.
2. The `View` logic is handled using `ChakraUI` Elements. It renders elements using `React` and by monitoring the changes in the `Model` logic or the store state.
3. The `Controller` contains the implemtation and logic to all the routes which ultimately updates the model and/or view in response to input from the users of the app.


## 🔨 API Endpoints

`/api/chat`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | :------------------: | :----------:
| POST | /api/chat | Create or fetch One to One Chat | Protected
| GET | /api/chat | Fetch all chats for a user | Protected
| POST | /api/chat/group | Create New Group Chat | Protected
| PUT | /api/chat/rename | Rename Group | Protected
| PUT | /api/chat/groupremove |Remove user from Group | Protected
| PUT | /api/chat/groupadd |Add user to Group / Leave | Protected

`/api/messages`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | :------------------: | :----------:
| GET | /api/message/:chatId | Get all Messages | Protected
| POST | /api/message | Create New Message | Protected

`/api/users`
| REQUEST METHODS | ENDPOINTS | DESCRIPTION |ACCESS
| :-------------- | :-------: | :------------------: | :----------:
| GET | GET /api/users?search= | Get or Search all users | Public
| POST | /api/user | Register new user | Public
| POST | /api/users/login | Auth the user | Public



### [Failed Tasks]

- The background image disappeared upon bringing into production.


### [Pending Tasks]

- Unit Tests
- Admin Panel

### Additional Features to be added later:

- Better UI/UX
- Search within the chats
