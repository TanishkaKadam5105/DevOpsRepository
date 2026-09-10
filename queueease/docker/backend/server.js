const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let currentToken = 1;
let queue = [];

// View queue
app.get("/queue", (req, res) => {
    res.json({
        currentServing: currentToken,
        waitingTokens: queue
    });
});

// Generate new token
app.post("/token", (req, res) => {
    const newToken = currentToken + queue.length + 1;

    queue.push(newToken);

    res.json({
        message: "Token generated successfully",
        token: newToken
    });
});

// Serve next token
app.post("/serve-next", (req, res) => {

    if (queue.length > 0) {
        currentToken = queue.shift();
    }

    res.json({
        message: "Next token is now being served",
        currentServing: currentToken
    });
});

app.listen(5000, () => {
    console.log("QueueEase Backend running on port 5000");
});