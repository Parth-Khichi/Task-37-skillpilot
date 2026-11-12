Real-Time Comment System

A simple real-time comment application built using Node.js, Express.js, JavaScript, and Socket.IO.

Users can add comments, and all connected browser windows receive new comments instantly without refreshing the page.

Features
Add new comments.
Display all comments.
Real-time comment updates.
Automatically update all connected clients.
No page refresh required.
Simple and beginner-friendly code.
Technologies Used
HTML
CSS
JavaScript
Node.js
Express.js
Socket.IO
Project Structure
text
realtime-comments/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── package.json
└── server.js

Installation and Setup
1. Install Node.js

Download Node.js from:

https://nodejs.org/

2. Open the project folder

Open your terminal inside the project folder.

3. Install dependencies
bash
npm install

4. Start the server
bash
npm start

5. Open the application

Visit:

text
http://localhost:3000

How It Works
A user writes a comment.
The browser sends the comment to the Express server.
The server saves the comment in memory.
The server emits a new_comment event using Socket.IO.
All connected browsers receive the event.
The new comment appears instantly.
Real-Time Event

The server sends the following Socket.IO event:

javascript
io.emit("new_comment", newComment);


The client listens for this event:

javascript
socket.on("new_comment", (comment) => {
    displayComment(comment);
});

Testing
Start the server.
Open the application in two browser windows.
Write a comment in the first window.
Click the Add Comment button.
Check the second window.

The new comment should appear automatically in both windows.

Important Note

This project currently stores comments in server memory.

Comments will be removed when the server restarts.

A database such as MongoDB or MySQL can be added later for permanent storage.

Author

Real-Time Comment System Project

License

This project is free to use for learning and educational purposes.