
const socket = io();

const form = document.getElementById("commentForm");
const input = document.getElementById("commentInput");
const commentsList = document.getElementById("commentsList");

// Display a comment
function displayComment(comment) {

    // Avoid displaying duplicate comments
    if (document.getElementById(comment.id)) {
        return;
    }

    const div = document.createElement("div");
    div.className = "comment";
    div.id = comment.id;

    const text = document.createElement("p");
    text.textContent = comment.text;

    const date = document.createElement("small");
    date.textContent = new Date(
        comment.createdAt
    ).toLocaleString();

    div.appendChild(text);
    div.appendChild(date);

    commentsList.prepend(div);
}

// Receive existing comments
socket.on("comments", (comments) => {

    commentsList.innerHTML = "";

    comments.forEach((comment) => {
        displayComment(comment);
    });

});

// Listen for new comments
socket.on("new_comment", (comment) => {

    displayComment(comment);

});

// Submit a new comment
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
        alert("Please enter a comment");
        return;
    }

    try {

        const response = await fetch("/api/comments", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message);
            return;
        }

        // Clear input
        input.value = "";

    } catch (error) {

        console.error("Error:", error);
        alert("Unable to save comment");

    }

});
