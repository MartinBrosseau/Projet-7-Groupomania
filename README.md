# GROUPOMANIA, Martin Brosseau 2022

---

## OpenClassrooms last project, web dev formation

- Build the first version of the Groupomania social network using any Frontend framework (React, Vue, Angular, etc)
- This project is developped with `React`

---

### Installation

---

##### Required

- `Node`
- `Npm`
- `React`
- `MySQL`

Clone or download the repository, then follow the instructions:

##### Database :

---

- Import in database the "base groupo.sql" file

##### Backend :

---

- Open a terminal and navigate to the "backend" folder
- Execute `npm install`
- Execute `nodemon server` to start the backend

* Edit the `.env` backend file for the database informations

##### Frontend :

---

- Open another terminal and navigate to the "frontend" folder
- Execute `npm install`
- Execute `npm start` to start the frontend

##### Features :

---

- Signup and Login pages, with minimal informations to keep it simple (mail and password)
- Users can disconnect
- User session is persistent
- Connection data are securised

---

- The main page list the posts created by the employees

---

- Users can create posts with text and image
- Users can modify or delete their posts
- Users can like, or unlike the posts (Once per post)

---

- There is an admin to moderate the forum : the admin can delete any posts if needed
